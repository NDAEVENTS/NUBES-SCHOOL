// The 7 morning emails of the Wedding Planner Bootcamp (plan 'paso0'). A Supabase cron job calls this every hour:
// day 1 goes out as soon as she has bought, days 2 to 7 from 8:00 (Madrid time) on each day.
// members.p0_sent remembers the last one sent, so calling it twice never sends anything twice.
// Needs the secret RESEND_API_KEY (Edge Functions → Secrets). Verify JWT: off.
import { createClient } from 'npm:@supabase/supabase-js@2';

const FROM = 'Nubes de Algodón School <hola@nubesdealgodonevents.com>';
type Mail = { subject: string; quote: string; intro: string[]; time: string; tasks: string[]; sections: [string, string[]][]; outro: string[] };
// The Wedding Planner Bootcamp texts, in the tone Ainoa approved on 29/10 (school/paso0/bootcamp/emails-bootcamp.json)
const MAILS: Mail[] = [
 {
  "subject": "Bienvenida al Wedding Planner Bootcamp: hoy empieza tu sueño",
  "quote": "Los sueños no se cumplen solos. Se cumplen cuando alguien decide dar el primer paso. Y hoy lo has dado tú.",
  "intro": [
   "Qué ilusión tan grande tenerte aquí. De verdad. Sabemos lo que cuesta decir «quiero algo distinto para mi vida» y, sobre todo, atreverse a hacer algo para conseguirlo. Por eso queremos que sepas una cosa desde el primer minuto: a partir de hoy no estás sola. Estamos contigo.",
   "Esta semana vas a trabajar como trabaja una wedding planner: con método, con herramientas profesionales y con una boda de práctica sobre la mesa, la de Clara y Marc, que te acompañará los siete días.",
   "Y hoy empezamos por el principio: cómo se organiza una boda de principio a fin."
  ],
  "time": "alrededor de una hora",
  "tasks": [
   "Crea tu contraseña desde el email de invitación que te acabamos de enviar y entra en tu portal. Es tu espacio.",
   "Abre la lección 1, «Una boda de principio a fin»: los servicios que puedes ofrecer, la primera reunión, los 12 meses de una boda y el timing del día.",
   "Entra en el grupo de WhatsApp del Bootcamp (tienes el enlace en tu portal) y preséntate: tu nombre, desde dónde escribes y a qué te dedicas hoy. Allí te esperan nuestras notas de voz de bienvenida y otras mujeres que, como tú, han decidido luchar por lo que quieren.",
   "Haz el calendario y el timing de la boda de Clara y Marc.",
   "Descarga la agenda semanal y reserva en ella tus horas del Bootcamp, como una cita contigo misma que no se cancela."
  ],
  "sections": [
   [
    "Tu semana",
    [
     "Día 1 · Una boda de principio a fin",
     "Día 2 · Presupuesto y honorarios",
     "Día 3 · Proveedores: tu equipo de confianza",
     "Día 4 · Diseño: del Pinterest a un concepto",
     "Días 5 y 6 · Tu negocio en 90 días",
     "Día 7 · Tu diagnóstico y tu siguiente paso"
    ]
   ],
   [
    "Tus herramientas, en tu portal → Herramientas",
    [
     "Agenda semanal: organiza tus semanas como una wedding planner.",
     "Calculadora de honorarios: tu honorario mínimo por boda, con tus números.",
     "Base de datos de proveedores: 26 gremios, estados y la checklist antes de recomendar a un proveedor.",
     "Plantilla de mood board: del gusto de una pareja a un concepto, en cinco pasos."
    ]
   ]
  ],
  "outro": [
   "Si te surge cualquier duda, por pequeña que te parezca, responde a este email o escríbenos en el grupo. Te leemos de lunes a viernes, de 10 a 18 h, y te contestamos siempre.",
   "Estamos muy orgullosas de ti por haber llegado hasta aquí."
  ]
 },
 {
  "subject": "Hoy hablamos de dinero (y de lo que vale tu trabajo)",
  "quote": "Valorar tu trabajo no es ambición: es la base para poder dedicarte a lo que amas durante muchos años.",
  "intro": [
   "Buenos días. Ayer recorriste los 12 meses de una boda. Si después de verlo sigues sintiendo ese cosquilleo, es muy buena señal.",
   "Hoy toca la conversación que más respeto da al principio: el dinero. Cómo se reparte el presupuesto de una pareja y cuánto debes cobrar tú. Te prometemos que, cuando termines, lo verás mucho más claro."
  ],
  "time": "alrededor de una hora",
  "tasks": [
   "Abre la lección 2, «Presupuesto y honorarios», ya disponible en tu portal.",
   "Reparte el presupuesto de Clara y Marc según sus prioridades y calcula su precio por invitado.",
   "Descarga la calculadora de honorarios y rellena solo las casillas rosas: tus gastos fijos, lo que quieres ganar y cuántas bodas te ves organizando al año.",
   "Apunta en «Mi negocio» tu honorario mínimo y cuántas bodas necesitas al año."
  ],
  "sections": [],
  "outro": [
   "Usa tus números reales, aunque al principio impongan. Los números no están para frenarte, están para darte tranquilidad. Y si algo no te cuadra, escríbenos. Lo miramos contigo.",
   "Mañana: los proveedores, tu equipo de confianza."
  ]
 },
 {
  "subject": "Tu equipo de confianza",
  "quote": "Nadie organiza una boda sola. Las grandes wedding planners se rodean de un gran equipo.",
  "intro": [
   "Buenos días. La pareja te contrata a ti, pero el día de la boda trabajan diez equipos distintos. Si uno falla, la que falla eres tú.",
   "Por eso hoy te enseñamos cómo elegimos, cuidamos y organizamos a nuestros proveedores. Es una de las partes que más nos gusta de este trabajo."
  ],
  "time": "alrededor de una hora",
  "tasks": [
   "Abre la lección 3, «Proveedores: tu equipo de confianza»: dónde encontrarlos, qué preguntar a cada uno y qué revisar en un contrato.",
   "Descarga la base de datos de proveedores y apunta los cinco primeros de tu zona, de gremios distintos.",
   "Elige un espacio que encaje con Clara y Marc y prepara las preguntas que le harías.",
   "Cuéntanos en el grupo qué espacio has elegido y por qué."
  ],
  "sections": [],
  "outro": [
   "Ya llevas tres días. Mira todo lo que has aprendido en tan poco tiempo.",
   "Mañana viene una de nuestras lecciones favoritas: el diseño."
  ]
 },
 {
  "subject": "Del Pinterest a un concepto",
  "quote": "El diseño de una boda no es decorar: es contar la historia de una pareja.",
  "intro": [
   "Buenos días. Hoy es un día precioso. Casi todas las parejas llegan con un tablero de Pinterest lleno de ideas que no tienen nada que ver entre sí, y tu trabajo es convertirlo en una boda que se parezca a ellos.",
   "Te enseñamos a hacerlo en cinco pasos, como lo hacemos nosotras."
  ],
  "time": "unos 45 minutos",
  "tasks": [
   "Abre la lección 4, «Diseño: del Pinterest a un concepto».",
   "Descarga la plantilla de mood board.",
   "Monta el mood board de Clara y Marc con su concepto, su paleta y sus materiales, y elige sus tres momentos clave.",
   "Si te apetece, compártelo en el grupo. Nos encantará verlo."
  ],
  "sections": [],
  "outro": [
   "No busques la perfección: busca que se entienda la idea. Ese es el secreto de un buen mood board.",
   "Mañana empezamos con tu negocio. Y lo haremos juntas."
  ]
 },
 {
  "subject": "Tus próximos 90 días empiezan hoy",
  "quote": "No hace falta verlo todo claro para empezar. Basta con dar el siguiente paso, y luego el siguiente.",
  "intro": [
   "Buenos días. Ya has trabajado como una wedding planner: el calendario, el presupuesto, los proveedores y el diseño de la boda de Clara y Marc. Ahora toca pensar en ti y en tu negocio.",
   "Queremos que te quedes con esto: no hace falta que dejes tu trabajo mañana. Con cinco a siete horas a la semana puedes tener la base de tu negocio en 90 días. Poco a poco, pero sin parar."
  ],
  "time": "unos 45 minutos",
  "tasks": [
   "Abre la lección 5, «Tu negocio en 90 días»: tu nicho, la parte legal, tu marca, tu portfolio y tu primera reunión.",
   "Escribe tu nicho en una frase: qué bodas, para qué parejas y en qué zona.",
   "Empieza tu plan en «Mi negocio» por la fase 1 (días 1 a 30), con una acción concreta y una fecha en cada punto."
  ],
  "sections": [],
  "outro": [
   "Un consejo de quien ya lo ha vivido: «buscar proveedores» no vale; «llamar a la finca X el martes» sí.",
   "Y si en algún momento te bloqueas, cuéntanoslo en el grupo. Para eso estamos."
  ]
 },
 {
  "subject": "Ponle fecha a tu sueño",
  "quote": "Un sueño con fecha deja de ser un sueño y se convierte en un plan. Y un plan, paso a paso, se cumple.",
  "intro": [
   "Buenos días. Hoy terminas tu plan y te lo llevas contigo.",
   "Piensa que hace solo seis días esto era una idea. Hoy ya has planificado una boda de principio a fin, sabes cuánto vale tu trabajo y tienes un plan con fechas. Eso es mérito tuyo."
  ],
  "time": "unos 45 minutos",
  "tasks": [
   "Completa las fases 2 y 3 de tu plan en «Mi negocio», cada punto con su fecha.",
   "Pon en tu agenda semanal tus horas fijas para el negocio, como una cita contigo misma.",
   "Descarga «Mi plan de 90 días» en PDF desde «Mi negocio» y guárdalo donde lo veas cada semana.",
   "Marca la lección 5 como hecha."
  ],
  "sections": [],
  "outro": [
   "Tómate hoy el tiempo que necesites: este plan es tuyo y es el primer paso de tu negocio.",
   "Mañana se abre tu diagnóstico. Estamos deseando contarte qué camino te encaja."
  ]
 },
 {
  "subject": "Lo has conseguido: tu diagnóstico está listo",
  "quote": "Hace siete días era un deseo. Hoy es un plan. Lo que viene después lo construiremos juntas.",
  "intro": [
   "Buenos días. Has llegado al último día del Bootcamp y queremos empezar dándote las gracias, y diciéndote lo orgullosas que estamos de ti.",
   "En una semana has planificado la boda de Clara y Marc de principio a fin y tienes tu plan de 90 días con fechas. Eso ya es mucho más de lo que hace la mayoría. Tú no te has quedado en el «algún día»."
  ],
  "time": "unos 10 minutos",
  "tasks": [
   "Abre la última lección: repasa todo lo que has aprendido y responde las seis preguntas del diagnóstico. Piensa en cómo estás hoy, no en cómo te gustaría estar.",
   "Lee tu resultado: te diremos qué camino te encaja, Online, Completo o Signature, y por qué.",
   "Si te encaja Completo o Signature, te escribimos en 48 horas para buscar una llamada de 20 minutos con nosotras."
  ],
  "sections": [],
  "outro": [
   "Recuerda que si sigues con el programa en los próximos 30 días, te descontamos los 47 € del Bootcamp.",
   "Decidas lo que decidas, queremos que sepas que esto no termina aquí. Seguimos a tu lado. Nunca vas a estar sola en este camino."
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
    `<p style="font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#8E5A5E;margin:0 0 6px">Wedding Planner Bootcamp · día ${day} de 7</p>`,
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
