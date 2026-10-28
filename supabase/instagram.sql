-- Instagram de School: los números de cada semana y de cada publicación, que el equipo apunta en Panel → Instagram.
-- Solo lo ven y lo editan Pilar y Ainoa. Se puede volver a ejecutar sin miedo: nunca borra lo apuntado.
create table if not exists public.ig_stats(
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('week','post')),   -- week: la semana que empieza ese lunes · post: una publicación
  day date not null,
  data jsonb not null default '{}',
  updated_at timestamptz not null default now(),
  updated_by text
);
create unique index if not exists ig_stats_week on public.ig_stats(day) where kind='week';
alter table public.ig_stats enable row level security;
drop policy if exists ig_team on public.ig_stats;
create policy ig_team on public.ig_stats for all using (public.is_nubes()) with check (public.is_nubes());
select count(*) as filas_instagram from public.ig_stats;
