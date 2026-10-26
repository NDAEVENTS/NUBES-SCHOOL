-- Nubes de Algodón School · database
-- Paste the whole file into Supabase > SQL Editor > New query and press Run.
-- Safe to run again: it only creates what is missing and replaces functions and policies.

-- ---------- Tables ----------
-- Who can enter: the Nubes team, or a student with her level and access dates
create table if not exists public.members(
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'alumna' check (role in ('nubes','alumna')),
  name text not null,
  email text,
  plan text check (plan in ('etapa1','online','completo','signature')),
  country text,
  started_at date not null default current_date,
  access_until date default (current_date + interval '12 months'),
  unlocked boolean not null default false,       -- open every stage now instead of one a week
  last_seen timestamptz,
  created_at timestamptz not null default now()
);

-- One row per lesson a student has finished ('3-2' = module 3, lesson 3)
create table if not exists public.progress(
  user_id uuid not null references public.members(user_id) on delete cascade,
  lesson text not null,
  done_at timestamptz not null default now(),
  primary key (user_id, lesson)
);

-- Exercises: the student's answer and files, and the team's feedback
create table if not exists public.submissions(
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.members(user_id) on delete cascade,
  exercise text not null,                         -- '2-e0' = module 2, first exercise
  text text,
  files jsonb not null default '[]',
  status text not null default 'draft' check (status in ('draft','sent','rev')),
  feedback text,
  feedback_by text,
  feedback_at timestamptz,
  updated_at timestamptz not null default now(),
  unique (user_id, exercise)
);

create table if not exists public.tutorials(
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.members(user_id) on delete cascade,
  module int not null,
  hours numeric not null default 1,
  status text not null default 'requested' check (status in ('requested','booked','done','cancelled')),
  note text,                                      -- the student's availability
  starts_at timestamptz,
  link text,
  summary text,
  created_at timestamptz not null default now()
);

-- "Mi negocio": everything the student builds about her own company
create table if not exists public.business(
  user_id uuid primary key references public.members(user_id) on delete cascade,
  data jsonb not null default '{}',
  updated_at timestamptz not null default now()
);

-- Messages from the team that appear on the student's home page
create table if not exists public.notes(
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.members(user_id) on delete cascade,
  body text not null,
  by text,
  created_at timestamptz not null default now()
);

-- Live sessions, workshops and shootings; each student sees the ones for her level
create table if not exists public.events(
  id uuid primary key default gen_random_uuid(),
  kind text not null default 'qa',
  title text not null,
  starts_at timestamptz not null,
  link text,
  place text,
  plans text[] not null default '{online,completo,signature}'
);

-- Templates to download (files in the private "course" bucket)
create table if not exists public.library(
  id uuid primary key default gen_random_uuid(),
  title text not null,
  detail text,
  module int not null default 1,
  path text,
  file text,
  plans text[] not null default '{etapa1,online,completo,signature}'
);

-- Free guide downloads and Signature applications (written only through add_lead)
create table if not exists public.leads(
  id uuid primary key default gen_random_uuid(),
  name text,
  email text not null,
  source text not null default 'guia',
  extra jsonb not null default '{}',
  created_at timestamptz not null default now()
);

-- Every completed payment, written by the Stripe webhook
create table if not exists public.purchases(
  id uuid primary key default gen_random_uuid(),
  stripe_session text unique,
  email text not null,
  name text,
  plan text not null,
  amount numeric not null,
  installments int not null default 1,
  created_at timestamptz not null default now()
);

-- ---------- Helpers ----------
create or replace function public.is_nubes() returns boolean
language sql stable security definer set search_path=public as $$
  select exists(select 1 from members where user_id=auth.uid() and role='nubes')
$$;

-- A student whose year of access is still running
create or replace function public.is_active() returns boolean
language sql stable security definer set search_path=public as $$
  select exists(select 1 from members where user_id=auth.uid() and role='alumna' and (access_until is null or access_until>=current_date))
$$;

create or replace function public.my_plan() returns text
language sql stable security definer set search_path=public as $$
  select plan from members where user_id=auth.uid()
$$;

-- The web's forms call this; nobody outside the team can read the leads
create or replace function public.add_lead(p_name text, p_email text, p_source text, p_extra jsonb default '{}')
returns void language plpgsql security definer set search_path=public as $$
begin
  if p_email is null or position('@' in p_email)=0 or length(p_email)>200 then raise exception 'email'; end if;
  insert into leads(name,email,source,extra) values (left(p_name,120), lower(trim(p_email)), case when p_source in ('guia','signature') then p_source else 'guia' end, coalesce(p_extra,'{}'));
end $$;
grant execute on function public.add_lead(text,text,text,jsonb) to anon, authenticated;

-- ---------- Row level security ----------
alter table public.members enable row level security;
alter table public.progress enable row level security;
alter table public.submissions enable row level security;
alter table public.tutorials enable row level security;
alter table public.business enable row level security;
alter table public.notes enable row level security;
alter table public.events enable row level security;
alter table public.library enable row level security;
alter table public.leads enable row level security;
alter table public.purchases enable row level security;

-- Members: each person reads her own row; only the team changes levels and dates
drop policy if exists m_read on public.members;
create policy m_read on public.members for select using (user_id=auth.uid() or public.is_nubes());
drop policy if exists m_team on public.members;
create policy m_team on public.members for all using (public.is_nubes()) with check (public.is_nubes());

-- Progress, business: the student reads and writes her own; the team reads everything
drop policy if exists p_own on public.progress;
create policy p_own on public.progress for all using (user_id=auth.uid() and public.is_active()) with check (user_id=auth.uid() and public.is_active());
drop policy if exists p_team on public.progress;
create policy p_team on public.progress for select using (public.is_nubes());

drop policy if exists b_own on public.business;
create policy b_own on public.business for all using (user_id=auth.uid() and public.is_active()) with check (user_id=auth.uid() and public.is_active());
drop policy if exists b_team on public.business;
create policy b_team on public.business for select using (public.is_nubes());

-- Submissions: the student writes her answer but can never write the feedback (see trigger below)
drop policy if exists s_own on public.submissions;
create policy s_own on public.submissions for all using (user_id=auth.uid() and public.is_active()) with check (user_id=auth.uid() and public.is_active());
drop policy if exists s_team on public.submissions;
create policy s_team on public.submissions for all using (public.is_nubes()) with check (public.is_nubes());
create or replace function public.guard_submission() returns trigger language plpgsql security definer set search_path=public as $$
begin
  if not public.is_nubes() then
    if tg_op='UPDATE' then new.feedback:=old.feedback; new.feedback_by:=old.feedback_by; new.feedback_at:=old.feedback_at;
      if new.status='rev' and old.status<>'rev' then new.status:=old.status; end if;
    else new.feedback:=null; new.feedback_by:=null; new.feedback_at:=null; if new.status='rev' then new.status:='sent'; end if; end if;
    -- Online and Etapa 1 do not include personal feedback: their answers stay as drafts
    if new.status='sent' and public.my_plan() not in ('completo','signature') then new.status:='draft'; end if;
  end if;
  return new;
end $$;
drop trigger if exists guard_submission on public.submissions;
create trigger guard_submission before insert or update on public.submissions for each row execute function public.guard_submission();

-- Tutorials: the student can only ask (status requested) for her own; the team books and closes them
drop policy if exists t_read on public.tutorials;
create policy t_read on public.tutorials for select using (user_id=auth.uid() or public.is_nubes());
drop policy if exists t_ask on public.tutorials;
create policy t_ask on public.tutorials for insert with check (user_id=auth.uid() and status='requested' and public.is_active() and public.my_plan() in ('completo','signature'));
drop policy if exists t_team on public.tutorials;
create policy t_team on public.tutorials for all using (public.is_nubes()) with check (public.is_nubes());

drop policy if exists n_read on public.notes;
create policy n_read on public.notes for select using (user_id=auth.uid() or public.is_nubes());
drop policy if exists n_team on public.notes;
create policy n_team on public.notes for all using (public.is_nubes()) with check (public.is_nubes());

drop policy if exists e_read on public.events;
create policy e_read on public.events for select using (public.is_nubes() or (public.is_active() and public.my_plan()=any(plans)));
drop policy if exists e_team on public.events;
create policy e_team on public.events for all using (public.is_nubes()) with check (public.is_nubes());

drop policy if exists l_read on public.library;
create policy l_read on public.library for select using (public.is_nubes() or (public.is_active() and public.my_plan()=any(plans)));
drop policy if exists l_team on public.library;
create policy l_team on public.library for all using (public.is_nubes()) with check (public.is_nubes());

drop policy if exists le_team on public.leads;
create policy le_team on public.leads for all using (public.is_nubes()) with check (public.is_nubes());
drop policy if exists pu_team on public.purchases;
create policy pu_team on public.purchases for select using (public.is_nubes());

-- ---------- Files ----------
-- course: templates (team uploads, active students download). entregas: each student's folder is her user id
insert into storage.buckets(id, name, public) values ('course','course',false) on conflict (id) do nothing;
insert into storage.buckets(id, name, public) values ('entregas','entregas',false) on conflict (id) do nothing;
drop policy if exists course_read on storage.objects;
create policy course_read on storage.objects for select to authenticated using (bucket_id='course' and (public.is_nubes() or public.is_active()));
drop policy if exists course_team on storage.objects;
create policy course_team on storage.objects for all to authenticated using (bucket_id='course' and public.is_nubes()) with check (bucket_id='course' and public.is_nubes());
drop policy if exists ent_read on storage.objects;
create policy ent_read on storage.objects for select to authenticated using (bucket_id='entregas' and (public.is_nubes() or (storage.foldername(name))[1]=auth.uid()::text));
drop policy if exists ent_write on storage.objects;
create policy ent_write on storage.objects for insert to authenticated with check (bucket_id='entregas' and public.is_active() and (storage.foldername(name))[1]=auth.uid()::text);
