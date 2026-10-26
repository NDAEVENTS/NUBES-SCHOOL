# Nubes de Algodón School

Web de venta y portal de alumnas del programa **The Wedding Creators**.

- **Web pública** (`/`): programa, precios, guía gratuita, FAQ y textos legales (`/legal/...`).
- **Portal de la alumna** (`/portal`): su formación por etapas (una por semana), ejercicios con feedback, tutorías, agenda, biblioteca de plantillas y “Mi negocio”.
- **Panel Nubes** (`/panel`): entregas por revisar, tutorías, alumnas, agenda, biblioteca, leads y ventas.

## Cómo está hecho

Igual que el portal de Nubes Events: JavaScript sin framework, unido por `build.mjs` en este orden: `course, app, sync, web, legal, portal, panel`.

- **Alojamiento:** Cloudflare Pages (`npm run build`, salida `dist`).
- **Datos, acceso y archivos:** Supabase (región UE). Todo está en `supabase/schema.sql`; los permisos los pone la base de datos, no las pantallas.
- **Pagos:** Stripe Checkout. `supabase/functions/checkout` abre el pago; `supabase/functions/stripe-webhook` registra la venta y da acceso a la alumna.
- **Lecciones:** `src/course.js` se genera desde el dossier con `python3 tools/extract.py tools/temario.txt > src/course.js`.

Sin variables de Supabase (o con `npm run demo`) se construye la **demo**: mismas pantallas, datos de ejemplo, no se guarda nada.

Puesta en marcha paso a paso: [GUIA.md](GUIA.md).

## Pruebas

`npm test` construye la demo y recorre los flujos principales con Playwright (web, compra, guía, portal, panel y ancho de móvil).
