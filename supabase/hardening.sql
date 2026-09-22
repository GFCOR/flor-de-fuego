-- Flor de Fuego — cierre de escrituras públicas.
-- Correr una vez en Supabase Dashboard > SQL Editor (es idempotente).
--
-- La landing solo LEE la galería. Los permisos de abajo dejaban que cualquiera
-- con la anon key (que es pública: va dentro del JS del sitio) insertara
-- comentarios y subiera fotos sin límite de cantidad, directo contra Supabase.
-- Cloudflare no protege eso: un bot podría llenar la base y el storage gratis.
-- Si más adelante se activan los comentarios, volver a abrirlos detrás de un
-- captcha (Cloudflare Turnstile) y un límite por IP, no con insert público.

drop policy if exists "comentarios_insert_publico" on comentarios;
revoke insert on comentarios from anon, authenticated;

drop policy if exists "comentarios_fotos_insert_publico" on storage.objects;

-- Verificación: ambas consultas deben devolver 0 filas.
select policyname from pg_policies
where policyname in ('comentarios_insert_publico', 'comentarios_fotos_insert_publico');

select grantee, privilege_type from information_schema.role_table_grants
where table_name = 'comentarios' and privilege_type = 'INSERT'
  and grantee in ('anon', 'authenticated');
