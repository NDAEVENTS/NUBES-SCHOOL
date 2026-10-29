// Gives access to a student who paid outside the web (transfer, earlier editions) or to a new team member.
// Only someone from the Nubes team can call it.
import { createClient } from 'npm:@supabase/supabase-js@2';

// ---------- Shared with the other functions (keep the copies equal) ----------
// What each level costs. The web shows the same figures (src/app.js, PLANS); change both together.
// Instalments: number of monthly payments and the amount of each one (in euros, VAT included).
export const PLANS: Record<string, { name: string; price: number; installments?: { n: number; each: number } }> = {
  paso0: { name: 'The Wedding Creators · Wedding Planner Bootcamp', price: 47 },
  etapa1: { name: 'The Wedding Creators · Etapa 1', price: 197 },
  online: { name: 'The Wedding Creators · Online', price: 590, installments: { n: 3, each: 197 } },
  completo: { name: 'The Wedding Creators · Completo', price: 1990, installments: { n: 6, each: 332 } },
  signature: { name: 'The Wedding Creators · Signature', price: 3500, installments: { n: 6, each: 584 } },
};
export const RANK: Record<string, number> = { paso0: 0, etapa1: 1, online: 2, completo: 3, signature: 4 };
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

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  const url = Deno.env.get('SUPABASE_URL')!;
  const caller = createClient(url, Deno.env.get('SUPABASE_ANON_KEY')!, { global: { headers: { Authorization: req.headers.get('Authorization') ?? '' } } });
  const { data: isTeam } = await caller.rpc('is_nubes');
  if (!isTeam) return reply({ ok: false, error: 'not allowed' }, 403);

  const { email, name, plan, country, role, redirect } = await req.json();
  const team = role === 'nubes';
  if (!email || !name || (!team && !PLANS[plan])) return reply({ ok: false, error: 'missing data' }, 400);
  const admin = createClient(url, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
  const { data, error } = await admin.auth.admin.inviteUserByEmail(String(email).trim().toLowerCase(), { redirectTo: redirect, data: { name } });
  if (error) {
    const exists = /already|registered|exists/i.test(error.message);
    return reply({ ok: false, error: exists ? 'exists' : error.message }, exists ? 409 : 400);
  }
  const { error: e2 } = await admin.from('members').insert({
    user_id: data.user.id, role: team ? 'nubes' : 'alumna', name, email: data.user.email,
    plan: team ? null : plan, country: country || null,
  });
  if (e2) return reply({ ok: false, error: e2.message }, 400);
  return reply({ ok: true });
});
