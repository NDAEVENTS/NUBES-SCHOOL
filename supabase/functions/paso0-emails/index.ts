// The 7 morning emails of the Paso 0. A Supabase cron job calls this every hour:
// day 1 goes out as soon as she has bought, days 2 to 7 from 8:00 (Madrid time) on each day.
// members.p0_sent remembers the last one sent, so calling it twice never sends anything twice.
// Needs the secret RESEND_API_KEY (Edge Functions → Secrets). Verify JWT: off.
import { createClient } from 'npm:@supabase/supabase-js@2';

const FROM = 'Nubes de Algodón School <hola@nubesdealgodonevents.com>';
const MAILS: [string, string][] = [
  ['Bienvenida al Paso 0: empezamos hoy', 'Te damos la bienvenida. Hoy y mañana miramos la profesión por dentro. Tienes tus 4 herramientas en el portal y el enlace a nuestra Comunidad de WhatsApp: entra y preséntate. Si todavía no has creado tu contraseña, busca el email de bienvenida que te acabamos de enviar.'],
  ['¿Cuántas señales has reconocido?', 'Termina la lección 1 y cuéntanos en “Mi negocio” por qué quieres dedicarte a esto. Es la respuesta a la que volverás los días difíciles.'],
  ['Hoy hacemos números', 'La pregunta que casi nadie responde: ¿se puede vivir de esto? Abre la calculadora y descúbrelo con tus números.'],
  ['Tu honorario mínimo', '¿Ya tienes tu cifra? Por debajo de ella, cada boda te cuesta dinero. Apúntala en “Mi negocio”: la usarás en tu plan.'],
  ['Tus próximos 90 días', 'Hoy diseñas tus tres primeros meses, con fechas y nombres. Empieza por tus cinco primeros proveedores.'],
  ['Ponle fecha a tu plan', 'Un plan sin fechas es un deseo. Termina el tuyo y descárgalo en PDF.'],
  ['Tu diagnóstico está listo', 'Seis preguntas para saber qué camino te encaja. Al terminar te contamos tu nivel y cómo descontarte los 47 €.'],
];
const esc = (t: string) => t.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));
const html = (name: string, day: number, body: string, site: string) => `<div style="font-family:Georgia,serif;max-width:520px;margin:0 auto;padding:32px 24px;color:#22232B;background:#F3F3F5">
  <p style="font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#8E5A5E;margin:0 0 6px">Paso 0 · día ${day} de 7</p>
  <h1 style="font-weight:400;font-size:26px;margin:0 0 18px">${esc(MAILS[day - 1][0])}</h1>
  <p style="font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6">Hola ${esc(name)},</p>
  <p style="font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6">${esc(body)}</p>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:26px 0 10px"><tr><td bgcolor="#F2E8E8" style="background-color:#F2E8E8;border:1px solid #8E5A5E;border-radius:999px;padding:13px 24px"><a href="${site}/portal" style="color:#8E5A5E;text-decoration:none;font-family:Helvetica,Arial,sans-serif;font-size:15px;font-weight:bold;display:inline-block"><font color="#8E5A5E">Entrar en mi portal</font></a></td></tr></table>
  <p style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#6B6D78;line-height:1.6;margin:0 0 18px">Si no ves el botón, pulsa aquí: <a href="${site}/portal" style="color:#8E5A5E;text-decoration:underline">Entrar en mi portal</a></p>
  <p style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#6B6D78">Pilar y Ainoa</p>
</div>`;
const madrid = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid', ...o }).format(new Date());

Deno.serve(async () => {
  const key = Deno.env.get('RESEND_API_KEY');
  if (!key) return new Response('missing RESEND_API_KEY', { status: 500 });
  const site = Deno.env.get('SITE_URL') || 'https://school.nubesdealgodonevents.com';
  const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
  const today = madrid({ year: 'numeric', month: '2-digit', day: '2-digit' }), hour = +madrid({ hour: '2-digit', hour12: false });
  const since = new Date(Date.parse(today) - 10 * 864e5).toISOString().slice(0, 10);
  const { data, error } = await admin.from('members').select('user_id,name,email,started_at,p0_sent').eq('plan', 'paso0').eq('role', 'alumna').lt('p0_sent', 7).gte('started_at', since);
  if (error) throw error;
  let sent = 0;
  for (const m of data || []) {
    const due = Math.min(7, Math.round((Date.parse(today) - Date.parse(m.started_at)) / 864e5) + 1);
    if (due <= m.p0_sent || (due > 1 && hour < 8)) continue;
    // Claim the email first: if two calls overlap, only one of them gets the row back
    const { data: claimed } = await admin.from('members').update({ p0_sent: due }).eq('user_id', m.user_id).lt('p0_sent', due).select('user_id');
    if (!claimed?.length) continue;
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST', headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: FROM, to: m.email, subject: MAILS[due - 1][0], html: html(String(m.name || '').split(' ')[0], due, MAILS[due - 1][1], site) }),
    });
    if (!r.ok) { console.error(m.email, await r.text()); await admin.from('members').update({ p0_sent: m.p0_sent }).eq('user_id', m.user_id); continue; }
    sent++;
  }
  return new Response(JSON.stringify({ sent }), { headers: { 'Content-Type': 'application/json' } });
});
