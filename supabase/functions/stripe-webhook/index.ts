// Stripe calls this when a payment completes. It records the sale, gives the student her access
// (an email to create her password, or a level upgrade if she already studies with us)
// and, for instalments, stops the monthly charge after the last one.
// Stripe signs each call; anything without a valid signature is rejected.
import { createClient } from 'npm:@supabase/supabase-js@2';

// ---------- Shared with the other functions (keep the copies equal) ----------
// What each level costs. The web shows the same figures (src/app.js, PLANS); change both together.
// Instalments: number of monthly payments and the amount of each one (in euros, VAT included).
export const PLANS: Record<string, { name: string; price: number; installments?: { n: number; each: number } }> = {
  etapa1: { name: 'The Wedding Creators · Etapa 1', price: 197 },
  online: { name: 'The Wedding Creators · Online', price: 590, installments: { n: 3, each: 197 } },
  completo: { name: 'The Wedding Creators · Completo', price: 1990, installments: { n: 6, each: 332 } },
  signature: { name: 'The Wedding Creators · Signature', price: 3500, installments: { n: 6, each: 584 } },
};
export const RANK: Record<string, number> = { etapa1: 1, online: 2, completo: 3, signature: 4 };
export const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};
export const reply = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } });

// Stripe's API takes form-encoded bodies with bracketed keys: line_items[0][price_data][currency]=eur
function flat(obj: unknown, prefix = '', out: [string, string][] = []) {
  if (obj === undefined || obj === null) return out;
  if (typeof obj !== 'object') { out.push([prefix, String(obj)]); return out; }
  for (const [k, v] of Object.entries(obj as Record<string, unknown>)) flat(v, prefix ? `${prefix}[${k}]` : k, out);
  return out;
}
export async function stripe(path: string, body?: Record<string, unknown>, method = body ? 'POST' : 'GET') {
  const r = await fetch('https://api.stripe.com/v1/' + path, {
    method,
    headers: { Authorization: 'Bearer ' + Deno.env.get('STRIPE_SECRET_KEY'), 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body ? new URLSearchParams(flat(body)).toString() : undefined,
  });
  const j = await r.json();
  if (!r.ok) throw new Error(j?.error?.message || 'stripe ' + r.status);
  return j;
}
// ---------- This function ----------

async function verify(raw: string, header: string | null) {
  const secret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!;
  const parts = Object.fromEntries((header || '').split(',').map(p => p.split('=') as [string, string]));
  if (!parts.t || !parts.v1 || Math.abs(Date.now() / 1000 - +parts.t) > 300) return false;
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${parts.t}.${raw}`));
  const hex = [...new Uint8Array(sig)].map(b => b.toString(16).padStart(2, '0')).join('');
  return hex === parts.v1;
}
const addMonths = (d: Date, n: number) => { const x = new Date(d); x.setUTCMonth(x.getUTCMonth() + n); return x; };

Deno.serve(async (req) => {
  const raw = await req.text();
  if (!(await verify(raw, req.headers.get('stripe-signature')))) return new Response('bad signature', { status: 400 });
  const ev = JSON.parse(raw);
  if (ev.type !== 'checkout.session.completed') return new Response('ignored');
  const s = ev.data.object;
  const plan = s.metadata?.plan, n = +(s.metadata?.installments || 1);
  if (!PLANS[plan]) return new Response('no plan');
  const email = String(s.customer_details?.email || s.customer_email || '').toLowerCase();
  const name = s.customer_details?.name || email.split('@')[0];
  const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

  // The same payment can arrive twice: the session id makes it count once
  const { error: dup } = await admin.from('purchases').insert({ stripe_session: s.id, email, name, plan, amount: n > 1 ? PLANS[plan].installments!.each * n : (s.amount_total ?? PLANS[plan].price * 100) / 100, installments: n });
  if (dup) { if (/duplicate|unique/i.test(dup.message)) return new Response('already done'); throw dup; }

  // Instalments: the subscription ends by itself after the last monthly payment
  if (s.mode === 'subscription' && s.subscription && n > 1) {
    const sub = await stripe('subscriptions/' + s.subscription);
    const end = addMonths(new Date(sub.billing_cycle_anchor * 1000), n - 1);
    await stripe('subscriptions/' + s.subscription, { cancel_at: Math.floor(end.getTime() / 1000) + 3600 });
  }

  const site = Deno.env.get('SITE_URL') || 'https://school.nubesdealgodonevents.com';
  const today = new Date().toISOString().slice(0, 10);
  const year = addMonths(new Date(), 12).toISOString().slice(0, 10);
  const { data: existing } = await admin.from('members').select('*').eq('email', email).maybeSingle();
  if (existing) {
    // Already a student: move her up a level (never down) and give her a full year from today
    const patch: Record<string, unknown> = { access_until: year };
    if ((RANK[plan] || 0) > (RANK[existing.plan] || 0)) patch.plan = plan;
    await admin.from('members').update(patch).eq('user_id', existing.user_id);
    return new Response('upgraded');
  }
  let userId: string | undefined;
  const inv = await admin.auth.admin.inviteUserByEmail(email, { redirectTo: site + '/acceso', data: { name } });
  if (inv.error) {
    // An account without a student row (rare): find it and send a password link instead
    const { data } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
    userId = data.users.find(u => u.email?.toLowerCase() === email)?.id;
    if (!userId) throw inv.error;
    await admin.auth.resetPasswordForEmail(email, { redirectTo: site + '/acceso' });
  } else userId = inv.data.user.id;
  const { error } = await admin.from('members').insert({ user_id: userId, role: 'alumna', name, email, plan, started_at: today, access_until: year });
  if (error) throw error;
  return new Response('ok');
});
