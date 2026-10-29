-- Paso 0 (47 €): a new level for the 7-day trial. Safe to run more than once.
-- 1) Students can have the plan 'paso0'
alter table public.members drop constraint if exists members_plan_check;
alter table public.members add constraint members_plan_check check (plan in ('paso0','etapa1','online','completo','signature'));
-- 2) Which of the 7 daily emails each Paso 0 student has already received (the paso0-emails function writes it)
alter table public.members add column if not exists p0_sent smallint not null default 0;
