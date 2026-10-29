-- Paso 0 (47 €): a new level for the 7-day trial. Safe to run more than once.
-- 1) Students can have the plan 'paso0'
alter table public.members drop constraint if exists members_plan_check;
alter table public.members add constraint members_plan_check check (plan in ('paso0','etapa1','online','completo','signature'));
-- 2) Which of the 7 daily emails each Paso 0 student has already received (the paso0-emails function writes it)
alter table public.members add column if not exists p0_sent smallint not null default 0;

-- 3) Laura, a pretend Paso 0 student on her third day, to see the portal from inside:
--    Panel → Alumnas → Laura Pérez (ejemplo) → "Ver su portal". She cannot sign in (no password).
insert into auth.users (instance_id, id, aud, role, email, raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
values ('00000000-0000-0000-0000-000000000000','e0000000-0000-4000-a000-000000000005','authenticated','authenticated','laura.ejemplo@example.com','{"provider":"email","providers":["email"]}','{"name":"Laura Pérez"}',now(),now())
on conflict (id) do nothing;
insert into public.members (user_id, role, name, email, plan, country, started_at, access_until, unlocked, last_seen, created_at)
values ('e0000000-0000-4000-a000-000000000005','alumna','Laura Pérez (ejemplo)','laura.ejemplo@example.com','paso0','España',current_date-2,current_date+363,false,now(),now()-interval '2 days')
on conflict (user_id) do nothing;
insert into public.progress (user_id, lesson, done_at) values ('e0000000-0000-4000-a000-000000000005','p0-1',now()-interval '1 day')
on conflict do nothing;
insert into public.business (user_id, data, updated_at) values ('e0000000-0000-4000-a000-000000000005',
  '{"p0":{"why":"Llevo diez años en una oficina y siempre acabo organizando las celebraciones de mi familia. Quiero que esto sea mi trabajo.","bodas":"Bodas íntimas en masías del Empordà, con mucho detalle.","senales":"6"}}', now())
on conflict (user_id) do nothing;
-- To remove her: delete from auth.users where id='e0000000-0000-4000-a000-000000000005';
