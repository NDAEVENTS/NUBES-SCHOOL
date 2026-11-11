-- Avisos con cifras reales en la web (home y /bootcamp).
-- Devuelve solo dos números, sin nombres ni emails: personas distintas que han pedido una guía en los últimos 7 días
-- y personas distintas que han comprado el Bootcamp en los últimos 30 días. La web solo enseña el aviso si pasa de un mínimo.
-- Se ejecuta una vez en Supabase → SQL Editor.
create or replace function public.public_stats() returns json
language sql stable security definer set search_path=public as $$
  select json_build_object(
    'guias7',(select count(distinct email) from leads where source='guia' and created_at>now()-interval '7 days'),
    'bootcamp30',(select count(distinct email) from purchases where plan='paso0' and created_at>now()-interval '30 days'));
$$;
revoke all on function public.public_stats() from public;
grant execute on function public.public_stats() to anon, authenticated;
