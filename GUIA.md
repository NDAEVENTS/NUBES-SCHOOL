# Guía para publicar Nubes de Algodón School

Son 6 bloques. Los marcados con 👉 los haces tú (necesitan tu cuenta). Las claves secretas **nunca** me las pases por el chat: van directamente en Supabase.

---

## 1. Supabase: crear el proyecto 👉

1. [supabase.com/dashboard](https://supabase.com/dashboard) → **New project**. Nombre: **nubes-school**. Región: **Central EU (Frankfurt)**. Genera la contraseña de la base de datos y guárdala en tu gestor (no me la pases).
2. **Project Settings → API** y pásame por el chat:
   - **Project URL** (`https://xxxx.supabase.co`)
   - **anon public key**

   Son públicas por diseño. Nunca me pases la `service_role` key.

## 2. Supabase: base de datos y tu usuario 👉

1. **SQL Editor → New query** → pega todo [`supabase/schema.sql`](supabase/schema.sql) → **Run** (debe decir *Success*).
2. **Authentication → Users → Add user → Create new user**: tu email y contraseña, marca **Auto Confirm User**.
3. **SQL Editor → New query**, cambia el email y **Run**:

   ```sql
   insert into members(user_id, role, name, email)
   select id, 'nubes', 'Ainoa', email from auth.users where lower(email) = 'tu-email-aquí'
   on conflict (user_id) do update set role = 'nubes';
   select name, email, role from members;  -- debe salir tu fila con role nubes
   ```

   Para Pilar, lo mismo con su email (crea antes su usuario en el paso 2.2).

### 2.4 Curso y textos de la web 👉

**SQL Editor → New query** → pega todo [`supabase/curso.sql`](supabase/curso.sql) → **Run**. Abajo debe salir `modulos = 9`.

Crea las tablas del curso y de los textos de la web, y mete el temario del dossier. Desde ese momento todo se edita en el panel: **Curso** (etapas, módulos, lecciones, vídeos, archivos y ejercicios), **Web** (textos, foto y testimonios de la página pública) y **Ver el portal como alumna** (abajo en el menú). Se puede volver a ejecutar sin miedo: nunca pisa lo que hayáis editado.

Si se cambia el dossier: `python3 tools/extract.py tools/temario.txt > src/course.js` y `node tools/curso-sql.mjs` regeneran el archivo (solo sirve para proyectos nuevos o para la demo).

## 3. Stripe 👉

1. En [dashboard.stripe.com](https://dashboard.stripe.com), con la cuenta de la S.L. ya verificada:
   - **Settings → Payment methods**: activa **Apple Pay, Google Pay y PayPal**.
   - **Settings → Business → Customer emails**: activa **Successful payments** y **Invoices** (así llega la factura).
   - **Settings → Branding**: logo y colores de School.
2. **Developers → API keys** → copia la **Secret key** (`sk_live_…`). **No me la pases**: la pegas tú en el paso 4.
3. El webhook lo creamos en el paso 4.4.

## 4. Supabase: funciones de pago e invitaciones 👉

1. **Edge Functions → Deploy a new function → Via Editor**, tres veces, con estos nombres exactos y el contenido de cada archivo:
   - `checkout` → [`supabase/functions/checkout/index.ts`](supabase/functions/checkout/index.ts)
   - `stripe-webhook` → [`supabase/functions/stripe-webhook/index.ts`](supabase/functions/stripe-webhook/index.ts)
   - `invite` → [`supabase/functions/invite/index.ts`](supabase/functions/invite/index.ts)
2. En **stripe-webhook → Settings**, desactiva **Verify JWT** (Stripe no puede enviarlo; la función comprueba la firma de Stripe).
3. **Edge Functions → Secrets → Add new secret**:
   - `STRIPE_SECRET_KEY` = la Secret key de Stripe
   - `SITE_URL` = `https://school.nubesdealgodonevents.com`
4. En Stripe → **Developers → Webhooks → Add endpoint**:
   - URL: `https://xxxx.supabase.co/functions/v1/stripe-webhook` (tu Project URL)
   - Evento: **checkout.session.completed**
   - Guarda, copia el **Signing secret** (`whsec_…`) y añádelo en Supabase como secret `STRIPE_WEBHOOK_SECRET`.

## 5. Emails a las alumnas 👉

Igual que en el portal de Events, con **Resend**:

1. [resend.com](https://resend.com) → **Domains**: si `nubesdealgodonevents.com` ya está verificado (portal de Events), se usa el mismo. Si no, **Add domain** → `nubesdealgodonevents.com` y añade en Webempresa los registros DNS que te da.
2. Resend → **API Keys → Create**.
3. Supabase → **Authentication → Emails → SMTP Settings → Enable custom SMTP**: host `smtp.resend.com`, puerto `465`, usuario `resend`, contraseña = la API key, remitente `hola@nubesdealgodonevents.com`, nombre `Nubes de Algodón School`.
4. **Authentication → Emails → Templates**: pega [`supabase/email-invite.html`](supabase/email-invite.html) en *Invite user* y [`supabase/email-recovery.html`](supabase/email-recovery.html) en *Reset password* (el asunto está en la primera línea de cada archivo).
5. **Authentication → URL Configuration**: Site URL `https://school.nubesdealgodonevents.com`; Redirect URLs `https://school.nubesdealgodonevents.com/**` y `https://nubes-school.pages.dev/**`.

## 6. Cloudflare Pages + Webempresa: publicar la web 👉

La web vive gratis en Cloudflare Pages y se ve en `school.nubesdealgodonevents.com`, un subdominio del dominio de Events que ya está en Webempresa. Ninguna página de Events enlaza aquí.

1. [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages → Create → pestaña Pages → Import an existing Git repository** → **NUBES-SCHOOL** → **Begin setup**.
2. Project name `nubes-school` · Framework preset **None** · Build command `npm run build` · Build output directory `dist` → **Save and Deploy**. No hace falta añadir variables.
3. Cuando termine: **Custom domains → Set up a custom domain** → `school.nubesdealgodonevents.com` → Cloudflare dice que añadas un registro **CNAME**.
4. Webempresa → panel (cPanel) → **Zone Editor** del dominio `nubesdealgodonevents.com` → **+ CNAME**: nombre `school`, destino `nubes-school.pages.dev` (o el que muestre Cloudflare en el paso 3).
5. En Cloudflare pulsa **Check DNS records**. En unos minutos (hasta unas horas) se activa con candado.

---

## Antes de abrir las ventas

- [ ] La gestoría revisa los textos legales (`/legal/...`) y rellenamos razón social, CIF, domicilio y registro.
- [ ] Subir las plantillas desde **Panel → Biblioteca**.
- [ ] Subir la guía gratuita como `public/guia-wedding-planner.pdf`.
- [ ] Foto vuestra para “Quiénes os enseñan” y 3 testimonios de alumnas.
- [ ] Compra de prueba con un cupón del 100 % en Stripe: comprobar el email de bienvenida, el acceso y la venta en **Panel → Ventas**.
- [ ] Quitar el enlace a School de la web de eventos y cambiar el enlace de la bio de Instagram.
