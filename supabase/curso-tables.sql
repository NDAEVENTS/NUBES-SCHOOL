-- ---------- Course: stages and modules (Panel → Edición del curso) ----------
-- A module carries its lessons and exercises as JSON: [{k, t, b:[[kind,text]], video?, files?:[{name,path}], draft?}]
-- k is the key progress and submissions point to, so reordering or renaming never loses anyone's work.
create table if not exists public.course_stages(
  n int primary key,
  title text not null,
  opens int not null default 0            -- days after a student starts
);
create table if not exists public.course_modules(
  n int primary key,
  stage int not null references public.course_stages(n),
  position int not null default 0,
  title text not null,
  hours numeric not null default 1,       -- tutorial hours (Completo, Signature)
  tutoria text,
  published boolean not null default true,
  plans text[] not null default '{}',     -- empty = every level ("Aplica a todos"); otherwise only these levels
  lessons jsonb not null default '[]',
  exercises jsonb not null default '[]',
  updated_at timestamptz not null default now(),
  updated_by text
);
alter table public.course_modules add column if not exists plans text[] not null default '{}';
alter table public.course_stages enable row level security;
alter table public.course_modules enable row level security;

-- Stages are only titles and dates; modules: the team sees everything, a student the published
-- modules of the stages her level includes (Etapa 1 = the first stage) that are common or meant for her level
drop policy if exists cs_read on public.course_stages;
create policy cs_read on public.course_stages for select using (public.is_nubes() or public.is_active());
drop policy if exists cs_team on public.course_stages;
create policy cs_team on public.course_stages for all using (public.is_nubes()) with check (public.is_nubes());
drop policy if exists cm_read on public.course_modules;
create policy cm_read on public.course_modules for select using (public.is_nubes() or (public.is_active() and published
  and (public.my_plan()<>'etapa1' or stage=(select min(n) from public.course_stages))
  and (cardinality(plans)=0 or public.my_plan()=any(plans))));
drop policy if exists cm_team on public.course_modules;
create policy cm_team on public.course_modules for all using (public.is_nubes()) with check (public.is_nubes());

-- The syllabus on the public web: titles only, published modules, no lesson text
create or replace function public.course_outline() returns jsonb
language sql stable security definer set search_path=public as $$
  select jsonb_build_object(
    'stages', coalesce((select jsonb_agg(jsonb_build_object('n',n,'title',title,'opens',opens)) from course_stages),'[]'),
    'modules', coalesce((select jsonb_agg(jsonb_build_object('n',m.n,'stage',m.stage,'position',m.position,'title',m.title,'hours',m.hours,'plans',m.plans,
      'lessons',coalesce((select jsonb_agg(l->>'t') from jsonb_array_elements(m.lessons) l where coalesce((l->>'draft')::boolean,false)=false),'[]'),
      'exercises',coalesce((select jsonb_agg(x->>'t') from jsonb_array_elements(m.exercises) x where coalesce((x->>'draft')::boolean,false)=false),'[]')))
      from course_modules m where m.published),'[]'))
$$;
grant execute on function public.course_outline() to anon, authenticated;

-- ---------- Texts of the public web (Panel → Editar landing) ----------
-- One row, id 'web': {section: {field: text}}. Anyone can read it (it is what the web shows); only the team writes.
create table if not exists public.site_content(
  id text primary key,
  data jsonb not null default '{}',
  updated_at timestamptz not null default now(),
  updated_by text
);
alter table public.site_content enable row level security;
drop policy if exists sc_read on public.site_content;
create policy sc_read on public.site_content for select using (true);
drop policy if exists sc_team on public.site_content;
create policy sc_team on public.site_content for all using (public.is_nubes()) with check (public.is_nubes());
grant select on public.site_content to anon;

-- Photos of the web (public: they appear on the page)
insert into storage.buckets(id, name, public) values ('web','web',true) on conflict (id) do nothing;
drop policy if exists web_team on storage.objects;
create policy web_team on storage.objects for all to authenticated using (bucket_id='web' and public.is_nubes()) with check (bucket_id='web' and public.is_nubes());
