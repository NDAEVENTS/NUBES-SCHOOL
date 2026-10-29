// The 7 morning emails of the Paso 0. A Supabase cron job calls this every hour:
// day 1 goes out as soon as she has bought, days 2 to 7 from 8:00 (Madrid time) on each day.
// members.p0_sent remembers the last one sent, so calling it twice never sends anything twice.
// Needs the secret RESEND_API_KEY (Edge Functions → Secrets). Verify JWT: off.
import { createClient } from 'npm:@supabase/supabase-js@2';

const FROM = 'Nubes de Algodón School <hola@nubesdealgodonevents.com>';
type Mail = { subject: string; quote: string; intro: string[]; time: string; tasks: string[]; sections: [string, string[]][]; outro: string[] };
// The texts approved by Ainoa on 29/10 (school/paso0/emails-paso0-version-nueva.json)
const MAILS: Mail[] = [
 {
  "subject": "Bienvenida al Paso 0: hoy empieza tu sueño",
  "quote": "Los sueños no se cumplen solos. Se cumplen cuando alguien decide dar el primer paso. Y hoy lo has dado tú.",
  "intro": [
   "Qué ilusión tan grande tenerte aquí. De verdad. Sabemos lo que cuesta decir «quiero algo distinto para mi vida» y, sobre todo, atreverse a hacer algo para conseguirlo. Por eso queremos que sepas una cosa desde el primer minuto: a partir de hoy no estás sola. Estamos contigo.",
   "Durante los próximos siete días vas a mirar la profesión de wedding planner por dentro, hacer tus números y diseñar tus tres primeros meses. No hace falta que dejes nada ni que lo tengas todo claro. Para eso estamos nosotras, para acompañarte paso a paso.",
   "Cada mañana te escribiremos para contarte qué toca ese día. Solo necesitas entre 30 y 45 minutos al día, y muchas ganas."
  ],
  "time": "unos 40 minutos",
  "tasks": [
   "Crea tu contraseña desde el email de invitación que te acabamos de enviar y entra en tu portal. Es tu espacio.",
   "Abre la lección 1, «La profesión por dentro»: qué hace de verdad una wedding planner y lo que nadie te cuenta.",
   "Entra en nuestra Comunidad privada de WhatsApp (tienes el enlace en tu portal) y preséntate: tu nombre, desde dónde escribes y a qué te dedicas hoy. Allí te esperan nuestras notas de voz de bienvenida, desde Sicilia y desde Barcelona, y otras mujeres que, como tú, han decidido luchar por lo que quieren.",
   "Descarga la agenda semanal e imprímela. Reserva en ella tus horas del Paso 0, como una cita contigo misma que no se cancela."
  ],
  "sections": [
   [
    "Tu semana",
    [
     "Días 1 y 2 · La profesión por dentro",
     "Días 3 y 4 · Tus números",
     "Días 5 y 6 · Tu plan de 90 días",
     "Día 7 · Tu diagnóstico: qué camino te encaja"
    ]
   ],
   [
    "Tus herramientas, en tu portal → Herramientas",
    [
     "Calculadora de honorarios: tu honorario mínimo por boda, con tus números.",
     "Base de datos de proveedores: 26 gremios, estados y la checklist antes de recomendar a un proveedor.",
     "Agenda semanal: organiza tus semanas como una wedding planner.",
     "Plantilla de mood board: del gusto de una pareja a un concepto, en cinco pasos."
    ]
   ]
  ],
  "outro": [
   "Si te surge cualquier duda, por pequeña que te parezca, responde a este email o escríbenos en la Comunidad. Te leemos de lunes a viernes, de 10 a 18 h, y te contestamos siempre.",
   "Estamos muy orgullosas de ti por haber llegado hasta aquí."
  ]
 },
 {
  "subject": "Hoy te miras a ti",
  "quote": "Antes de construir un negocio, hay que escucharse. Tu porqué es la brújula que te guiará cuando el camino se complique.",
  "intro": [
   "Buenos días. Ayer miraste la profesión por dentro, lo bonito y también lo que nadie te cuenta. Si después de leerlo sigues sintiendo ese cosquilleo, es muy buena señal.",
   "Hoy es un día precioso, porque hoy toca mirarte a ti."
  ],
  "time": "unos 30 minutos",
  "tasks": [
   "Lee la guía «¿Puedo ser wedding planner? 7 señales» (portal → Herramientas → Lecturas de apoyo) y apunta cuántas reconoces en ti.",
   "En «Mi negocio», responde a dos preguntas: ¿por qué quiero ser wedding planner? ¿Qué tipo de bodas me imagino organizando?",
   "Cuando lo tengas, marca la lección 1 como hecha."
  ],
  "sections": [],
  "outro": [
   "Escribe sin filtro y con el corazón. Esa respuesta es la que leerás los días difíciles, y te prometemos que te dará fuerza. A nosotras también nos ha pasado, y por eso sabemos que se sale adelante.",
   "Mañana se abre la lección 2: tus números. Te esperamos."
  ]
 },
 {
  "subject": "Sí, se puede vivir de esto",
  "quote": "Valorar tu trabajo no es ambición: es la base para poder dedicarte a lo que amas durante muchos años.",
  "intro": [
   "Buenos días. Hoy respondemos juntas a la pregunta que casi nadie se atreve a hacer en voz alta: ¿se puede vivir de esto?",
   "Sí, se puede. Pero no cobrando poco. Una boda integral se lleva unas 200 horas: si cobras 1.500 €, trabajas a 7,50 € la hora antes de gastos. La mayoría de las planners que lo dejan no es por falta de parejas, sino porque sus precios no se sostienen. Y eso no te va a pasar a ti, porque hoy vas a hacer tus números bien desde el principio."
  ],
  "time": "unos 45 minutos",
  "tasks": [
   "Abre la lección 2, «Tus números», que ya tienes disponible en tu portal.",
   "Descarga la calculadora de honorarios y rellena solo las casillas rosas: tus gastos fijos, lo que quieres ganar y cuántas bodas te ves organizando al año.",
   "Mira la pestaña «Escenarios»: verás cómo cambia tu precio si haces 6, 10 o 15 bodas al año."
  ],
  "sections": [],
  "outro": [
   "Usa tus números reales, aunque al principio impongan. No te asustes: los números no están para frenarte, están para darte tranquilidad. Y si algo no te cuadra, escríbenos. Lo miramos contigo."
  ]
 },
 {
  "subject": "Tu trabajo vale, y mucho",
  "quote": "Cuando sabes lo que vales, dejas de pedir permiso para cobrarlo.",
  "intro": [
   "Buenos días. ¿Ya tienes tu cifra? Es tu honorario mínimo: por debajo de ella, cada boda te cuesta dinero.",
   "Si te ha salido más alta de lo que esperabas, respira. Es buena señal: significa que la has calculado bien y que estás empezando a mirar tu sueño como lo que es, un negocio de verdad."
  ],
  "time": "unos 30 minutos",
  "tasks": [
   "Apunta en «Mi negocio» tu honorario mínimo y cuántas bodas necesitas al año. Lo usarás en tu plan.",
   "Repasa en la lección cómo cobramos nosotras en Nubes: un 30 % de paga y señal al reservar la fecha, dos pagos intermedios del 20 % y el 30 % final un mes antes de la boda.",
   "Cuéntanos en la Comunidad qué es lo que más te ha sorprendido. Sin cifras, si no quieres. Nos encanta leeros.",
   "Marca la lección 2 como hecha."
  ],
  "sections": [],
  "outro": [
   "Ya llevas cuatro días. Mira todo lo que has avanzado en tan poco tiempo. Mañana empezamos con tu plan de 90 días, y lo haremos juntas."
  ]
 },
 {
  "subject": "Tus próximos 90 días empiezan hoy",
  "quote": "No hace falta verlo todo claro para empezar. Basta con dar el siguiente paso, y luego el siguiente.",
  "intro": [
   "Buenos días. Queremos que te quedes con esto: no hace falta que dejes tu trabajo mañana. Con cinco a siete horas a la semana puedes tener la base de tu negocio en 90 días. Poco a poco, pero sin parar.",
   "Hoy empiezas a diseñarlos, con tus nombres, tus fechas y tu zona. No es un plan para leer: es tu plan, para rellenarlo y hacerlo realidad."
  ],
  "time": "unos 45 minutos",
  "tasks": [
   "Abre la lección 3, «Tu plan de 90 días», y lee las tres fases.",
   "Descarga la base de datos de proveedores y apunta los cinco primeros de tu zona.",
   "Empieza tu plan en «Mi negocio» por la fase 1 (días 1 a 30): tu nicho, tus primeros proveedores y la cita con una gestoría."
  ],
  "sections": [],
  "outro": [
   "Un consejo de quien ya lo ha vivido: una acción concreta y una fecha para cada punto. «Buscar proveedores» no vale; «llamar a la finca X el martes» sí.",
   "Y si en algún momento te bloqueas, cuéntanoslo en la Comunidad. Para eso estamos."
  ]
 },
 {
  "subject": "Ponle fecha a tu sueño",
  "quote": "Un sueño con fecha deja de ser un sueño y se convierte en un plan. Y un plan, paso a paso, se cumple.",
  "intro": [
   "Buenos días. Hoy es un día muy especial: hoy terminas tu plan y te lo llevas contigo.",
   "Piensa que hace solo seis días esto era una idea. Hoy ya tiene nombres, números y fechas. Eso es mérito tuyo."
  ],
  "time": "unos 45 minutos",
  "tasks": [
   "Completa las fases 2 y 3 de tu plan en «Mi negocio», cada punto con su fecha.",
   "Pon en tu agenda semanal tus horas fijas para el negocio, como una cita contigo misma.",
   "Si te apetece, abre la plantilla de mood board: será la base de tu primer shooting.",
   "Descarga «Mi plan de 90 días» en PDF desde «Mi negocio» y guárdalo donde lo veas cada semana.",
   "Marca la lección 3 como hecha."
  ],
  "sections": [],
  "outro": [
   "Mañana se abre tu diagnóstico. Estamos deseando contarte qué camino te encaja."
  ]
 },
 {
  "subject": "Lo has conseguido: tu diagnóstico está listo",
  "quote": "Hace siete días era un deseo. Hoy es un plan. Lo que viene después lo construiremos juntas.",
  "intro": [
   "Buenos días. Has llegado al último día y queremos empezar dándote las gracias, y diciéndote lo orgullosas que estamos de ti.",
   "En una semana has mirado la profesión por dentro, has hecho tus números y tienes tu plan de 90 días con fechas. Eso ya es mucho más de lo que hace la mayoría. Tú no te has quedado en el «algún día»."
  ],
  "time": "unos 10 minutos",
  "tasks": [
   "Abre la lección 4 y responde las seis preguntas del diagnóstico. Piensa en cómo estás hoy, no en cómo te gustaría estar.",
   "Lee tu resultado: te diremos qué camino te encaja, Online, Completo o Signature, y por qué.",
   "Si te encaja Completo o Signature, te escribimos en 48 horas para buscar una llamada de 20 minutos con nosotras."
  ],
  "sections": [],
  "outro": [
   "Recuerda que si sigues con el programa en los próximos 30 días, te descontamos los 47 € del Paso 0.",
   "Decidas lo que decidas, queremos que sepas que esto no termina aquí. Seguimos en la Comunidad, a tu lado. Nunca vas a estar sola en este camino."
  ]
 }
];
const esc = (t: string) => t.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));
const F = 'font-family:Helvetica,Arial,sans-serif;', P = F + 'font-size:15px;line-height:1.6;margin:0 0 14px';
const LABEL = F + 'font-size:11px;letter-spacing:.15em;text-transform:uppercase;color:#8E5A5E;margin:22px 0 6px';
function html(name: string, day: number, site: string) {
  const m = MAILS[day - 1], url = site + '/portal';
  return [
    '<div style="font-family:Georgia,serif;max-width:520px;margin:0 auto;padding:32px 24px;color:#22232B;background:#F3F3F5">',
    `<p style="font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#8E5A5E;margin:0 0 6px">Paso 0 · día ${day} de 7</p>`,
    `<h1 style="font-weight:400;font-size:26px;margin:0 0 18px">${esc(m.subject)}</h1>`,
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 20px"><tr><td bgcolor="#F2E8E8" style="background-color:#F2E8E8;border-left:3px solid #8E5A5E;padding:14px 18px;font-family:Georgia,serif;font-size:17px;font-style:italic;line-height:1.5;color:#22232B">«${esc(m.quote)}»</td></tr></table>`,
    `<p style="${P}">Hola, ${esc(name)}:</p>`,
    ...m.intro.map(t => `<p style="${P}">${esc(t)}</p>`),
    `<p style="${LABEL}">Hoy toca · ${esc(m.time)}</p>`,
    `<ol style="${F}font-size:15px;line-height:1.6;margin:0 0 14px;padding-left:22px">${m.tasks.map(t => `<li style="margin:0 0 6px">${esc(t)}</li>`).join('')}</ol>`,
    ...m.sections.map(([h, items]) => `<p style="${LABEL}">${esc(h)}</p><ul style="${F}font-size:14px;line-height:1.6;margin:0 0 14px;padding-left:20px">${items.map(t => `<li>${esc(t)}</li>`).join('')}</ul>`),
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:22px 0 10px"><tr><td bgcolor="#8E5A5E" style="background-color:#8E5A5E;border-radius:999px;padding:13px 24px"><a href="${url}" style="color:#FFFFFF;text-decoration:none;${F}font-size:15px;font-weight:bold;display:inline-block"><font color="#FFFFFF">Entrar en mi portal</font></a></td></tr></table>`,
    `<p style="${F}font-size:13px;color:#6B6D78;line-height:1.6;margin:0 0 18px">Si no ves el botón, pulsa aquí: <a href="${url}" style="color:#8E5A5E;text-decoration:underline">Entrar en mi portal</a></p>`,
    ...m.outro.map(t => `<p style="${P}">${esc(t)}</p>`),
    `<p style="${F}font-size:15px;margin:18px 0 0">Un abrazo muy fuerte,<br>Pilar y Ainoa</p><p style="${F}font-size:12px;color:#6B6D78;margin:4px 0 0">Nubes de Algodón School · The Wedding Creators</p>`,
    '</div>',
  ].join('\n');
}
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
      body: JSON.stringify({ from: FROM, to: m.email, subject: MAILS[due - 1].subject, html: html(String(m.name || '').split(' ')[0], due, site) }),
    });
    if (!r.ok) { console.error(m.email, await r.text()); await admin.from('members').update({ p0_sent: m.p0_sent }).eq('user_id', m.user_id); continue; }
    sent++;
  }
  return new Response(JSON.stringify({ sent }), { headers: { 'Content-Type': 'application/json' } });
});
