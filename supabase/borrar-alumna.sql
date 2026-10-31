-- Delete a student from Panel → Alumnas → (her page) → Eliminar alumna. Safe to run more than once.
-- Removes her sign-in, so she can no longer enter the portal, and with it (on delete cascade) her access,
-- progress, exercises, tutorials, notes and "Mi negocio". Her payments (purchases) and leads stay, for the accounts.
-- Only the team can call it, and only on a student: a team member (role 'nubes') can never be deleted from here.
create or replace function public.delete_alumna(p_user uuid)
returns void language plpgsql security definer set search_path=public, auth as $$
begin
  if not public.is_nubes() then raise exception 'not allowed'; end if;
  if not exists(select 1 from public.members where user_id=p_user and role='alumna') then raise exception 'not a student'; end if;
  delete from auth.users where id=p_user;
end $$;
revoke all on function public.delete_alumna(uuid) from public, anon;
grant execute on function public.delete_alumna(uuid) to authenticated;
select 'delete_alumna lista' as ok;
