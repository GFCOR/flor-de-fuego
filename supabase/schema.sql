-- Flor de Fuego — galería + comentarios dinámicos.
-- Correr una sola vez en Supabase Dashboard > SQL Editor.

create table if not exists galeria (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  alt text not null default 'Foto de clientes y del local en Flor de Fuego Cafe de Especialidad',
  created_at timestamptz not null default now()
);

create table if not exists comentarios (
  id uuid primary key default gen_random_uuid(),
  nombre text not null check (char_length(nombre) between 1 and 80),
  mensaje text not null check (char_length(mensaje) between 1 and 500),
  aprobado boolean not null default false,
  created_at timestamptz not null default now()
);

alter table galeria enable row level security;
alter table comentarios enable row level security;

-- Lectura pública: cualquiera puede ver las fotos de la galería.
create policy "galeria_select_public" on galeria
  for select using (true);

-- Lectura pública: solo comentarios ya aprobados.
create policy "comentarios_select_aprobados" on comentarios
  for select using (aprobado = true);

-- Sin insert público: ver supabase/hardening.sql (spam/abuso con la anon key).

-- Nota: no hay policies de insert/update/delete para "galeria" ni de
-- update/delete para "comentarios" -> por defecto RLS deniega todo lo
-- demás. Vos administrás fotos y aprobás comentarios desde el Table
-- Editor del dashboard (ahí entrás con tu usuario, no con la anon key).

-- Con "Automatically expose new tables" desactivado en el proyecto,
-- Postgres no le da privilegios a los roles de la Data API por defecto.
-- RLS filtra filas, pero antes de eso hace falta el GRANT a nivel de tabla.
grant select on galeria to anon, authenticated;
grant select on comentarios to anon, authenticated;

-- Bucket de Storage para las fotos de la galería.
insert into storage.buckets (id, name, public)
values ('galeria', 'galeria', true)
on conflict (id) do nothing;

create policy "galeria_storage_lectura_publica" on storage.objects
  for select using (bucket_id = 'galeria');

-- Panel de moderación (/?moderar): tu usuario logueado (Supabase Auth)
-- puede ver todos los comentarios (no solo los aprobados) y aprobar/borrar.
-- Restringido a tu email exacto, así una cuenta cualquiera no alcanza.
create policy "comentarios_admin_select_todos" on comentarios
  for select using (auth.jwt() ->> 'email' = 'gianfranco2017.0@gmail.com');

create policy "comentarios_admin_update" on comentarios
  for update using (auth.jwt() ->> 'email' = 'gianfranco2017.0@gmail.com')
  with check (auth.jwt() ->> 'email' = 'gianfranco2017.0@gmail.com');

create policy "comentarios_admin_delete" on comentarios
  for delete using (auth.jwt() ->> 'email' = 'gianfranco2017.0@gmail.com');

grant update, delete on comentarios to authenticated;

-- Foto opcional adjunta a un comentario público.
alter table comentarios add column if not exists foto_url text;

-- Bucket separado del de "galeria" (ese es solo tuyo, curado a mano).
-- Límite de tamaño y tipo de archivo. La subida pública está cerrada
-- (ver supabase/hardening.sql) hasta que haya captcha + límite por IP.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('comentarios-fotos', 'comentarios-fotos', true, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;

create policy "comentarios_fotos_lectura_publica" on storage.objects
  for select using (bucket_id = 'comentarios-fotos');
