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
   select id, 'nubes', 'Ainoa', email from auth.users where email = 'TU-EMAIL-AQUÍ';
   ```

   Para Pilar, lo mismo con su email (crea antes su usuario en el paso 2.2).

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
   - `SITE_URL` = `https://nubesdealgodonschool.com`
4. En Stripe → **Developers → Webhooks → Add endpoint**:
   - URL: `https://xxxx.supabase.co/functions/v1/stripe-webhook` (tu Project URL)
   - Evento: **checkout.session.completed**
   - Guarda, copia el **Signing secret** (`whsec_…`) y añádelo en Supabase como secret `STRIPE_WEBHOOK_SECRET`.

## 5. Emails a las alumnas 👉

Igual que en el portal de Events, con **Resend**:

1. [resend.com](https://resend.com) → **Domains → Add domain** → `nubesdealgodonschool.com`. Añade los registros DNS que te da donde tengas el dominio (pásame una captura si quieres y te digo qué poner).
2. Resend → **API Keys → Create**.
3. Supabase → **Authentication → Emails → SMTP Settings → Enable custom SMTP**: host `smtp.resend.com`, puerto `465`, usuario `resend`, contraseña = la API key, remitente `hola@nubesdealgodonschool.com`, nombre `Nubes de Algodón School`.
4. **Authentication → Emails → Templates**: pega [`supabase/email-invite.html`](supabase/email-invite.html) en *Invite user* y [`supabase/email-recovery.html`](supabase/email-recovery.html) en *Reset password* (el asunto está en la primera línea de cada archivo).
5. **Authentication → URL Configuration**: Site URL `https://nubesdealgodonschool.com`; Redirect URLs `https://nubesdealgodonschool.com/**` y `https://nubes-school.*.workers.dev/**`.

## 6. Cloudflare: publicar la web 👉

1. [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages → Create → Import a repository** → **NDAEVENTS/NUBES-SCHOOL**.
2. Nombre del proyecto: `nubes-school` (en minúsculas). El resto se queda como viene: el archivo `wrangler.jsonc` del repositorio ya dice cómo construir y publicar la web. No hace falta añadir variables.
3. **Deploy** → en un par de minutos está en `https://nubes-school.<tu-cuenta>.workers.dev`.
4. **Settings → Domains & Routes → Add → Custom domain** → `nubesdealgodonschool.com` (y `www.nubesdealgodonschool.com`). Si el dominio no está en Cloudflare, te dice qué registro añadir donde lo tengas.

---

## Antes de abrir las ventas

- [ ] La gestoría revisa los textos legales (`/legal/...`) y rellenamos razón social, CIF, domicilio y registro.
- [ ] Subir las plantillas desde **Panel → Biblioteca**.
- [ ] Subir la guía gratuita como `public/guia-wedding-planner.pdf`.
- [ ] Foto vuestra para “Quiénes os enseñan” y 3 testimonios de alumnas.
- [ ] Compra de prueba con un cupón del 100 % en Stripe: comprobar el email de bienvenida, el acceso y la venta en **Panel → Ventas**.
- [ ] Quitar el enlace a School de la web de eventos y cambiar el enlace de la bio de Instagram.
