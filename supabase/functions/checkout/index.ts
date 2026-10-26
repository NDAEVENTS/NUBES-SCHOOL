// Opens a Stripe Checkout page for one level of the programme, paid at once or in monthly instalments.
// Public: anyone on the web can call it. The amount always comes from PLANS below, never from the browser.
// Someone who bought Etapa 1 in the last 60 days gets its 197 € off Online or Completo.
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

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  try {
    const { plan, email, installments } = await req.json();
    const P = PLANS[plan];
    const mail = String(email || '').trim().toLowerCase();
    if (!P || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(mail)) return reply({ error: 'missing data' }, 400);
    const site = Deno.env.get('SITE_URL') || 'https://nubesdealgodonschool.com';
    const split = installments && P.installments ? P.installments : null;

    let discounts: unknown[] | undefined;
    if (plan === 'online' || plan === 'completo') {
      const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
      const since = new Date(Date.now() - 60 * 864e5).toISOString();
      const { data } = await admin.from('purchases').select('id').eq('email', mail).eq('plan', 'etapa1').gte('created_at', since).limit(1);
      if (data?.length) {
        const c = await stripe('coupons', { amount_off: PLANS.etapa1.price * 100, currency: 'eur', duration: 'once', name: 'Etapa 1 ya pagada', max_redemptions: 1 });
        discounts = [{ coupon: c.id }];
      }
    }
    const meta = { plan, installments: split ? split.n : 1 };
    const body: Record<string, unknown> = {
      mode: split ? 'subscription' : 'payment',
      customer_email: mail,
      locale: 'es',
      line_items: [{
        quantity: 1,
        price_data: {
          currency: 'eur',
          unit_amount: (split ? split.each : P.price) * 100,
          tax_behavior: 'inclusive',
          product_data: { name: P.name + (split ? ` · ${split.n} cuotas mensuales` : '') },
          ...(split ? { recurring: { interval: 'month' } } : {}),
        },
      }],
      metadata: meta,
      success_url: site + '/gracias?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: site + '/#precios',
      custom_text: { submit: { message: 'Al pagar, el acceso al contenido digital empieza de inmediato y renuncias al derecho de desistimiento de 14 días.' } },
    };
    if (discounts) body.discounts = discounts; else body.allow_promotion_codes = true;
    if (split) body.subscription_data = { metadata: meta };
    else body.invoice_creation = { enabled: true };
    const s = await stripe('checkout/sessions', body);
    return reply({ url: s.url });
  } catch (e) {
    console.error(e);
    return reply({ error: String(e?.message || e) }, 500);
  }
});
