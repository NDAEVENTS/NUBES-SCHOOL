-- Nubes de Algodón School · Alumnas de ejemplo
-- Four pretend students, one per level, so the panel and the portal look like a real edition:
--   Sofía (Etapa 1) · Valentina (Online, parada hace 12 días) · Lucía (Completo, con entrega y tutoría pendientes) · Carmen (Signature)
-- Paste all of it in Supabase → SQL Editor → Run, after curso.sql. Running it twice changes nothing. They cannot sign in (no password): open them from
-- Panel → Alumnas → their profile → "Ver su portal". To remove them, run the block at the end ("Borrar las alumnas de ejemplo").

-- Their accounts (no password, so nobody can enter with them)
insert into auth.users (instance_id, id, aud, role, email, raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
values
  ('00000000-0000-0000-0000-000000000000','e0000000-0000-4000-a000-000000000001','authenticated','authenticated','sofia.ejemplo@example.com','{"provider":"email","providers":["email"]}','{"name":"Sofía Navarro"}',now(),now()),
  ('00000000-0000-0000-0000-000000000000','e0000000-0000-4000-a000-000000000002','authenticated','authenticated','valentina.ejemplo@example.com','{"provider":"email","providers":["email"]}','{"name":"Valentina Gómez"}',now(),now()),
  ('00000000-0000-0000-0000-000000000000','e0000000-0000-4000-a000-000000000003','authenticated','authenticated','lucia.ejemplo@example.com','{"provider":"email","providers":["email"]}','{"name":"Lucía Martín"}',now(),now()),
  ('00000000-0000-0000-0000-000000000000','e0000000-0000-4000-a000-000000000004','authenticated','authenticated','carmen.ejemplo@example.com','{"provider":"email","providers":["email"]}','{"name":"Carmen Ruiz"}',now(),now())
on conflict (id) do nothing;

insert into public.members (user_id, role, name, email, plan, country, started_at, access_until, unlocked, last_seen, created_at) values
  ('e0000000-0000-4000-a000-000000000001','alumna','Sofía Navarro (ejemplo)','sofia.ejemplo@example.com','etapa1','España',current_date-5,current_date+360,false,now()-interval '1 day',now()-interval '5 days'),
  ('e0000000-0000-4000-a000-000000000002','alumna','Valentina Gómez (ejemplo)','valentina.ejemplo@example.com','online','Colombia',current_date-33,current_date+332,false,now()-interval '12 days',now()-interval '33 days'),
  ('e0000000-0000-4000-a000-000000000003','alumna','Lucía Martín (ejemplo)','lucia.ejemplo@example.com','completo','España',current_date-16,current_date+349,false,now(),now()-interval '16 days'),
  ('e0000000-0000-4000-a000-000000000004','alumna','Carmen Ruiz (ejemplo)','carmen.ejemplo@example.com','signature','México',current_date-40,current_date+325,true,now()-interval '2 days',now()-interval '40 days')
on conflict (user_id) do nothing;

-- Lessons each one has finished. Lesson keys are "module-index"; the counts follow the dossier (6,10,5,6,6,3,5,9,7)
insert into public.progress (user_id, lesson, done_at)
select u, m||'-'||i, now() - (d||' days')::interval
from (values
  -- Sofía: 4 lessons of module 1
  ('e0000000-0000-4000-a000-000000000001'::uuid,1,4,3),
  -- Valentina: modules 1 to 4 and half of module 5, then she stopped 12 days ago
  ('e0000000-0000-4000-a000-000000000002',1,6,30),('e0000000-0000-4000-a000-000000000002',2,10,26),('e0000000-0000-4000-a000-000000000002',3,5,20),('e0000000-0000-4000-a000-000000000002',4,6,15),('e0000000-0000-4000-a000-000000000002',5,3,12),
  -- Lucía: modules 1 to 3 and 2 lessons of module 4
  ('e0000000-0000-4000-a000-000000000003',1,6,14),('e0000000-0000-4000-a000-000000000003',2,10,10),('e0000000-0000-4000-a000-000000000003',3,5,3),('e0000000-0000-4000-a000-000000000003',4,2,0),
  -- Carmen: modules 1 to 7 and most of 8
  ('e0000000-0000-4000-a000-000000000004',1,6,38),('e0000000-0000-4000-a000-000000000004',2,10,34),('e0000000-0000-4000-a000-000000000004',3,5,28),('e0000000-0000-4000-a000-000000000004',4,6,22),
  ('e0000000-0000-4000-a000-000000000004',5,6,16),('e0000000-0000-4000-a000-000000000004',6,3,12),('e0000000-0000-4000-a000-000000000004',7,5,8),('e0000000-0000-4000-a000-000000000004',8,6,2)
) as t(u,m,n,d), generate_series(0,n-1) as i
on conflict do nothing;

-- Exercises. The safety rule that stops students writing feedback is paused while we load the team's comments
alter table public.submissions disable trigger guard_submission;
insert into public.submissions (user_id, exercise, text, status, feedback, feedback_by, feedback_at, updated_at) values
  -- Valentina (Online: her answers stay in "Mi negocio", no personal feedback)
  ('e0000000-0000-4000-a000-000000000002','2-e0','Andrés y Camila, 31 y 33 años, de Bogotá. Quieren casarse en una hacienda en Villa de Leyva con 90 invitados, estilo colonial y romántico, y un presupuesto de unos 40.000 USD.','draft',null,null,null,now()-interval '25 days'),
  ('e0000000-0000-4000-a000-000000000002','2-e1','Opciones: Hacienda & Co, Valentina Gómez Bodas, Lirio Blanco, Casa Andina Weddings. Me quedo con Lirio Blanco (el dominio .co está libre).','draft',null,null,null,now()-interval '24 days'),
  ('e0000000-0000-4000-a000-000000000002','3-e0','Shooting en una hacienda con una florista local y una pareja de amigos como modelos. Paleta en blancos y verde oliva.','draft',null,null,null,now()-interval '19 days'),
  -- Lucía (Completo): two reviewed, one waiting for you in "Hoy"
  ('e0000000-0000-4000-a000-000000000003','2-e0','Valeria y Marc, 34 y 36 años, arquitectos de Barcelona. Boda civil en una masía del Empordà, 120 invitados, estilo mediterráneo y elegante. Valoran el diseño y la tranquilidad: quieren delegarlo todo.','rev','Muy bien definida la pareja, Lucía. Afina el rango de presupuesto: con este estilo y en el Empordà, piensa en bodas a partir de 45.000 €. Eso cambia tus honorarios en el módulo 6.','Ainoa',now()-interval '8 days',now()-interval '9 days'),
  ('e0000000-0000-4000-a000-000000000003','2-e1','Mis cuatro favoritos: Atelier Olivo, Mar de Lino, Casa Brisa y Lucía Martín Weddings. Elijo Atelier Olivo: es fácil de recordar y el dominio .com está libre.','rev','“Atelier Olivo” funciona muy bien: suena elegante y no te ata a una zona. Registra ya el dominio y el usuario de Instagram.','Pilar',now()-interval '7 days',now()-interval '8 days'),
  ('e0000000-0000-4000-a000-000000000003','2-e2','Fortalezas: 8 años en hostelería de lujo, inglés y francés, contactos en fincas de Girona. Debilidades: sin portfolio de bodas propias, poca presencia en redes. Oportunidades: parejas internacionales en la Costa Brava. Amenazas: muchas planners low cost en la zona.','sent',null,null,null,now()-interval '1 day'),
  -- Carmen (Signature)
  ('e0000000-0000-4000-a000-000000000004','2-e0','Sarah y James, 35 y 38 años, de Texas. Boda destino en San Miguel de Allende con 80 invitados durante un fin de semana: welcome dinner, boda y brunch.','rev','Perfecta para bodas destino, Carmen. Trabaja el fin de semana completo como un solo producto: es lo que más valoran las parejas americanas.','Ainoa',now()-interval '30 days',now()-interval '32 days'),
  ('e0000000-0000-4000-a000-000000000004','2-e1','Me quedo con “Casa Jacaranda Weddings”.','rev','Precioso y muy de México. Comprueba que nadie lo tenga registrado como marca antes de invertir en logo.','Pilar',now()-interval '29 days',now()-interval '31 days'),
  ('e0000000-0000-4000-a000-000000000004','2-e2','DAFO completo adjunto en mi documento.','rev','Buen análisis. Tu gran fortaleza es el inglés nativo: ponlo en la portada de tu web.','Ainoa',now()-interval '27 days',now()-interval '28 days'),
  ('e0000000-0000-4000-a000-000000000004','3-e0','Shooting “Jacaranda en flor” en una casona de San Miguel con fotógrafa y florista locales.','rev','Las fotos son de portfolio. Úsalas para tu primera campaña.','Pilar',now()-interval '20 days',now()-interval '22 days'),
  ('e0000000-0000-4000-a000-000000000004','4-e0','Guion de la primera reunión por videollamada con parejas de Estados Unidos, en inglés.','rev','Muy bien. Añade al final el siguiente paso con fecha: que la pareja salga de la llamada sabiendo qué pasa y cuándo.','Ainoa',now()-interval '14 days',now()-interval '15 days'),
  ('e0000000-0000-4000-a000-000000000004','5-e0','Mood board en tonos terracota, jacaranda y lino.','rev','Coherente con tu marca. Prepara dos versiones más para enseñar en la primera reunión.','Pilar',now()-interval '10 days',now()-interval '11 days')
on conflict (user_id, exercise) do nothing;
alter table public.submissions enable trigger guard_submission;

-- Tutorials (Completo and Signature)
insert into public.tutorials (user_id, module, hours, status, note, starts_at, link, summary, created_at)
select user_id::uuid, module, hours, status, note, starts_at, link, summary, created_at from (values
  ('e0000000-0000-4000-a000-000000000003',1,1,'done',null,now()-interval '13 days',null,'Por qué quiere ser wedding planner y su objetivo a un año: 6 bodas propias en 2027.',now()-interval '14 days'),
  ('e0000000-0000-4000-a000-000000000003',2,2,'done',null,now()-interval '6 days',null,'Nicho: bodas de lujo para parejas internacionales en el Empordà. Tarea: terminar el DAFO.',now()-interval '9 days'),
  ('e0000000-0000-4000-a000-000000000003',3,1,'requested','Martes o jueves por la tarde, hora de Madrid',null,null,null,now()-interval '1 day'),
  ('e0000000-0000-4000-a000-000000000004',1,1,'done',null,now()-interval '37 days',null,'Punto de partida y objetivo: lanzar Casa Jacaranda en enero.',now()-interval '38 days'),
  ('e0000000-0000-4000-a000-000000000004',2,2,'done',null,now()-interval '30 days',null,'Marca, nicho de bodas destino y estructura legal en México.',now()-interval '31 days'),
  ('e0000000-0000-4000-a000-000000000004',4,2,'done',null,now()-interval '14 days',null,'Cómo captar parejas americanas: web en inglés y proveedores aliados.',now()-interval '15 days'),
  ('e0000000-0000-4000-a000-000000000004',5,2,'done',null,now()-interval '9 days',null,'Su catálogo de servicios en tres paquetes.',now()-interval '10 days'),
  ('e0000000-0000-4000-a000-000000000004',8,1,'booked',null,date_trunc('hour',now())+interval '3 days 17 hours','https://meet.google.com/',null,now()-interval '2 days')
) as v(user_id, module, hours, status, note, starts_at, link, summary, created_at)
where not exists (select 1 from public.tutorials where user_id::text like 'e0000000-%');

-- "Mi negocio"
insert into public.business (user_id, data) values
  ('e0000000-0000-4000-a000-000000000002','{"ideal":"Parejas colombianas de 30 a 40 años que se casan en haciendas de Boyacá.","name":"Lirio Blanco","domain":"liriobanco.co","goal":"Mis primeras 3 bodas en 2027.","calc":{"m":300,"a":800,"s":1800,"b":10},"vendors":[{"cat":"Hacienda","name":"Hacienda El Roble (ejemplo)","st":"Visitada"}],"couples":[]}'),
  ('e0000000-0000-4000-a000-000000000003','{"ideal":"Pareja de 30 a 40 años, boda de lujo en el Empordà, 120 invitados.","name":"Atelier Olivo Bodas","domain":"atelierolivo.com","goal":"6 bodas propias en 2027 y dejar mi trabajo en el hotel.","services":"","calc":{"m":400,"a":1000,"s":2500,"b":12},"vendors":[{"cat":"Catering","name":"Mas Ejemplo Catering","st":"Contactado"},{"cat":"Fotografía","name":"Estudio Ejemplo","st":"Reunión hecha"},{"cat":"Flores","name":"Flores del Empordà (ejemplo)","st":"Pendiente"}],"couples":[]}'),
  ('e0000000-0000-4000-a000-000000000004','{"ideal":"Parejas de Estados Unidos de 32 a 42 años, boda destino de fin de semana en San Miguel de Allende.","name":"Casa Jacaranda Weddings","domain":"casajacaranda.mx","goal":"10 bodas destino en 2027.","services":"Organización integral del fin de semana, diseño y coordinación del día B.","calc":{"m":600,"a":1500,"s":3500,"b":10},"vendors":[{"cat":"Venue","name":"Casona Ejemplo","st":"Colaboración cerrada"},{"cat":"Fotografía","name":"Luz de Allende (ejemplo)","st":"Colaboración cerrada"}],"couples":[{"name":"Sarah & James (ejemplo)","date":"Octubre 2027","st":"Propuesta enviada"}]}')
on conflict (user_id) do nothing;

-- Messages from the team on their home page
insert into public.notes (user_id, body, by, created_at)
select user_id::uuid, body, by, created_at from (values
  ('e0000000-0000-4000-a000-000000000001','¡Bienvenida, Sofía! Disfruta de la Etapa 1. Si te quedas con ganas de más, te descontamos los 197 € al pasarte al programa.','Pilar',now()-interval '4 days'),
  ('e0000000-0000-4000-a000-000000000002','Valentina, ¡te echamos de menos! Te quedan 3 lecciones del módulo 5. Trae tus dudas a la próxima sesión grupal.','Ainoa',now()-interval '2 days'),
  ('e0000000-0000-4000-a000-000000000003','¡Qué bien quedó tu cliente ideal, Lucía! Revisa los comentarios y lo vemos en la tutoría.','Ainoa',now()-interval '7 days'),
  ('e0000000-0000-4000-a000-000000000004','Carmen, te esperamos en el fin de semana de workshops. Te enviamos la información del alojamiento esta semana.','Pilar',now()-interval '3 days')
) as v(user_id, body, by, created_at)
where not exists (select 1 from public.notes where user_id::text like 'e0000000-%');

-- What they paid (Panel → Ventas)
insert into public.purchases (stripe_session, email, name, plan, amount, installments, created_at) values
  ('ejemplo_sofia','sofia.ejemplo@example.com','Sofía Navarro (ejemplo)','etapa1',197,1,now()-interval '5 days'),
  ('ejemplo_valentina','valentina.ejemplo@example.com','Valentina Gómez (ejemplo)','online',590,3,now()-interval '33 days'),
  ('ejemplo_lucia','lucia.ejemplo@example.com','Lucía Martín (ejemplo)','completo',1990,1,now()-interval '16 days'),
  ('ejemplo_carmen','carmen.ejemplo@example.com','Carmen Ruiz (ejemplo)','signature',3500,6,now()-interval '40 days')
on conflict (stripe_session) do nothing;

select name, plan from public.members where email like '%.ejemplo@example.com' order by created_at;  -- deben salir las 4

-- ---------- Borrar las alumnas de ejemplo ----------
-- Cuando ya no las queráis, ejecuta solo estas tres líneas (borra también su progreso, entregas, tutorías y "Mi negocio"):
-- delete from public.purchases where stripe_session like 'ejemplo_%';
-- delete from public.members where email like '%.ejemplo@example.com';
-- delete from auth.users where email like '%.ejemplo@example.com';
