-- Origin of each sale (Panel → Ventas → Origen). Safe to run more than once.
-- The web sends where the visit came from (utm_source: instagram, ig_bio, meta_a, meta_b, facebook…) to the checkout,
-- Stripe keeps it with the payment and the stripe-webhook function writes it here. 'enlace' = payment link made in the panel.
alter table public.purchases add column if not exists source text;
select 'origen de compras listo' as ok;
