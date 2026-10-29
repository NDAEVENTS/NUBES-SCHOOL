// ---------- Wedding Planner Bootcamp (Paso 0, 47 €): five real lessons of the programme in seven days ----------
// Lessons 1 to 5 open on days 1 to 5 after buying, the diagnosis on day 7. Each lesson is shown as slides:
// a cover, one slide per section (long lists split in four), the "En el programa Online" teaser and her task.
// Her answers live in "Mi negocio" (business.data.p0); the tools and the WhatsApp group are library rows for the plan 'paso0'.
const P0=[
  {n:1,img:'/img/ws-071.jpg',day:0,days:'Día 1',t:'Una boda de principio a fin',b:[
    ['h','Bienvenida al Bootcamp'],['p','Qué ilusión tenerte aquí. Esta semana no vas a leer teoría: vas a aprender, con contenido real de The Wedding Creators, cómo trabajamos de verdad una wedding planner. Una lección al día, cada una con su herramienta. Y no lo harás sola: estamos contigo en la Comunidad.'],
    ['h','Qué hace de verdad una wedding planner'],['p','Una wedding planner no organiza fiestas bonitas. Gestiona el proyecto más importante de la vida de una pareja, con su dinero, sus emociones y sus familias. Su trabajo son cuatro cosas: el presupuesto, los proveedores, el diseño y la coordinación. Esta semana vas a probar cada una.'],
    ['h','Los 12 meses de una boda'],['p','Toda boda sigue el mismo camino. Si lo dominas, la pareja duerme tranquila y tú también:'],
    ['li','12 a 10 meses antes · La base: presupuesto, número de invitados, fecha y espacio. Sin espacio no hay boda.'],
    ['li','10 a 8 meses · Los proveedores clave, los que antes se agotan: catering, fotografía, vídeo y música.'],
    ['li','8 a 6 meses · El diseño: concepto, mood board, flores y decoración. Y el vestido.'],
    ['li','6 a 4 meses · Invitaciones, alojamiento y transporte de invitados, y las pruebas de menú.'],
    ['li','4 a 2 meses · Confirmaciones, papelería del día, regalos y los últimos proveedores.'],
    ['li','El último mes · El timing minuto a minuto, el plano de mesas, el wedding book y la reunión final con cada proveedor.'],
    ['li','El gran día · Tú coordinas y nadie nota que algo no ha salido como estaba previsto. Siempre pasa algo.'],
    ['h','Lo que nadie te cuenta'],['li','Una boda se contrata con 12 a 18 meses de antelación: tu negocio crece a ese ritmo.'],['li','El día de la boda son 14 horas de pie.'],['li','Las parejas no te contratan por un decorado bonito. Te contratan para estar tranquilas durante un año entero.'],
    ['h','En el programa Online'],['p','Cada una de estas etapas es un módulo completo, con nuestro checklist de 12 meses, el modelo de timing del día B y la plantilla de wedding book que usamos con nuestras parejas.']],
    tasks:['Preséntate en la Comunidad de WhatsApp: tu nombre, desde dónde escribes y a qué te dedicas hoy.','Descarga la agenda semanal y reserva en ella tus horas del Bootcamp, como una cita contigo misma.','Responde en “Mi negocio”: ¿por qué quiero ser wedding planner? ¿Qué bodas me imagino organizando?'],
    tool:'La agenda semanal.',more:['¿Puedo ser wedding planner? 7 señales','/guia-senales.pdf'],sec:'why'},
  {n:2,img:'/img/ws-043.jpg',day:1,days:'Día 2',t:'Presupuesto y honorarios',b:[
    ['h','El presupuesto de la pareja'],['p','La primera conversación seria con una pareja es el dinero. Tu trabajo es repartirlo bien y que se respete. Un reparto orientativo para una boda en España:'],
    ['li','Espacio y catering: 45 a 50 %'],['li','Fotografía y vídeo: 10 a 12 %'],['li','Flores y decoración: 8 a 10 %'],['li','Vestuario y belleza: 8 a 10 %'],['li','Música: 5 a 7 %'],['li','Papelería, regalos y detalles: 3 a 5 %'],['li','Imprevistos: 5 a 10 %. Nunca lo quites.'],
    ['p','Cuando la pareja quiere algo que no cabe, no dices que no: les enseñas de qué partida sale. Así deciden ellos y tú cuidas el total.'],
    ['h','Tus honorarios'],['p','Una organización integral se lleva unas 200 horas. Si cobras 1.500 €, trabajas a 7,50 € la hora antes de gastos. La mayoría de las planners que lo dejan no es por falta de parejas, sino porque sus precios no se sostienen.'],
    ['p','Tu precio sale de tus números, no de los de la competencia. Abre la calculadora y rellena solo las casillas rosas: tus gastos fijos, lo que quieres ganar y cuántas bodas te ves organizando al año. Te dirá tu honorario mínimo por boda.'],
    ['h','Cómo te pagan: nuestro método 30 / 20 / 20 / 30'],['p','Un 30 % de paga y señal al reservar la fecha, dos pagos intermedios del 20 % y el 30 % final un mes antes de la boda. Ingresos repartidos todo el año y la boda pagada antes de empezar.'],
    ['h','En el programa Online'],['p','Aprenderás a presentar el presupuesto a la pareja, a controlarlo partida a partida durante todo el año y a construir tus tarifas por servicio (integral, diseño y coordinación del día).']],
    tasks:['Rellena la calculadora de honorarios con tus números reales y mira la pestaña “Escenarios”.','Apunta en “Mi negocio” tu honorario mínimo y cuántas bodas necesitas al año.','Cuéntanos en la Comunidad qué es lo que más te ha sorprendido (sin cifras, si no quieres).'],
    tool:'La calculadora de honorarios.',more:['Cuánto gana una wedding planner en España','/guia-numeros.pdf'],sec:'nums'},
  {n:3,img:'/img/ws-082.jpg',day:2,days:'Día 3',t:'Proveedores: tu equipo de confianza',b:[
    ['h','Tu reputación depende de ellos'],['p','La pareja te contrata a ti, pero el día de la boda trabajan diez equipos distintos. Si uno falla, la que falla eres tú. Por eso una wedding planner nunca recomienda a un proveedor que no conoce.'],
    ['h','Cómo elegirlos'],['li','Míralos trabajar: pide ver una boda real, no solo su Instagram.'],['li','Pregunta siempre lo mismo a todos, para poder comparar: qué incluye, horarios, montaje y desmontaje, plan B, seguro y forma de pago.'],['li','Pide el presupuesto por escrito y desglosado.'],['li','Lee el contrato antes que la pareja: cancelaciones, horas extra y qué pasa si llueve.'],
    ['h','Cómo cuidarlos'],['p','Los mejores proveedores eligen con quién trabajan. Paga a tiempo, envía la información completa y con antelación, y agradece después de cada boda. Así, cuando tengas una urgencia, te contestarán a ti la primera.'],
    ['h','Cómo organizarlos'],['p','En tu base de datos apunta cada proveedor con su gremio, su zona, su rango de precio, tu valoración y en qué estado está con vosotras: por contactar, reunión hecha, de confianza. La checklist de la segunda pestaña te dice qué comprobar antes de recomendarlo.'],
    ['h','En el programa Online'],['p','Tendrás nuestra guía de preguntas por gremio, cómo negociar sin perder la relación, cómo revisar un contrato y cómo coordinar a todos los proveedores la semana de la boda.']],
    tasks:['Descarga la base de datos de proveedores.','Apunta los cinco primeros proveedores de tu zona, de gremios distintos.','Elige uno y escribe en la Comunidad qué tres preguntas le harías.'],
    tool:'La base de datos de proveedores.'},
  {n:4,img:'/img/ws-079.jpg',day:3,days:'Día 4',t:'Diseño: del Pinterest a un concepto',b:[
    ['h','La pareja trae 300 fotos'],['p','Casi todas las parejas llegan con un tablero de Pinterest lleno de ideas que no tienen nada que ver entre sí. Tu trabajo es escucharlas y convertir todo eso en un concepto: una idea clara que se pueda producir y presupuestar.'],
    ['h','Del gusto al concepto en cinco pasos'],['li','Escucha: pregúntales cómo se conocieron, qué les emociona y cómo quieren que se sientan sus invitados.'],['li','Filtra: quédate con las 10 imágenes que más se repiten en estilo y color.'],['li','Nombra: resume el concepto en tres palabras (por ejemplo: mediterráneo, luminoso, sereno).'],['li','Elige la paleta: tres colores principales y dos de acento.'],['li','Monta el mood board: espacio, flores, mesa, papelería y vestuario en una sola lámina.'],
    ['p','El mood board es el documento que comparten la pareja, la florista, la papelería y el catering. Si está bien hecho, todos ven la misma boda.'],
    ['h','En el programa Online'],['p','Aprenderás a presentar el concepto a la pareja, a traducirlo en un dossier de diseño para cada proveedor y a preparar tu primer shooting para tu portfolio.']],
    tasks:['Abre la plantilla de mood board.','Elige una pareja imaginaria (o tu propia boda soñada) y monta su mood board siguiendo los cinco pasos.','Si te apetece, compártelo en la Comunidad. Nos encantará verlo.'],
    tool:'La plantilla de mood board.'},
  {n:5,img:'/img/ws-039.jpg',day:4,days:'Días 5 y 6',t:'Tu negocio en 90 días',b:[
    ['h','No dejes tu trabajo mañana'],['p','Ya has probado el oficio: presupuesto, proveedores y diseño. Ahora toca pensar en tu negocio. Con cinco a siete horas a la semana puedes tener la base en 90 días. En esta lección no lees un plan: rellenas el tuyo, con tus nombres, tus fechas y tu zona.'],
    ['h','Fase 1 · Días 1 a 30 · Decide qué planner quieres ser'],['li','Tu nicho: qué bodas, para qué parejas y en qué zona.'],['li','Tus primeros 10 proveedores en la base de datos.'],['li','Una cita con una gestoría: puedes darte de alta sin dejar tu trabajo.'],
    ['h','Fase 2 · Días 31 a 60 · Que se te vea'],['li','Nombre e identidad sencilla.'],['li','Instagram profesional y una página con tus servicios.'],['li','Tu primer mood board, base de tu futuro shooting.'],['li','Un café con al menos diez proveedores.'],
    ['h','Fase 3 · Días 61 a 90 · Lista para tu primera pareja'],['li','Dossier de servicios con tus precios (los de tu calculadora).'],['li','Contrato y forma de presupuestar.'],['li','Tu primera reunión, ensayada.'],
    ['h','En el programa Online'],['p','Cada punto de este plan es un módulo: tu marca, la parte legal, tu web e Instagram, tu dossier, tu contrato y cómo convertir la primera reunión en una pareja que firma.']],
    tasks:['Rellena tu plan en “Mi negocio”: una acción concreta y una fecha para cada punto.','Pon en tu agenda semanal tus horas fijas para el negocio.','Descarga “Mi plan de 90 días” en PDF y guárdalo donde lo veas cada semana.'],
    tool:'La agenda semanal y tu plan en “Mi negocio”.',more:['De la oficina a las bodas: el plan de 90 días','/guia-90-dias.pdf'],sec:'plan'},
  {n:6,img:'/img/ws-020.jpg',day:6,days:'Día 7',t:'Tu diagnóstico y tu siguiente paso',b:[['p','En una semana has aprendido cómo se organiza una boda de principio a fin, cómo se reparte un presupuesto, cómo se eligen los proveedores, cómo se crea un concepto y cómo arrancar tu negocio. Esto es solo una muestra de lo que te espera en The Wedding Creators.'],['p','Responde estas seis preguntas pensando en cómo estás hoy, no en cómo te gustaría estar. Al terminar te contamos qué camino te encaja y cómo descontarte los 47 €.']],tasks:[],diag:true},
];
// The plan, phase by phase: each point gets her action and a date
const P0PLAN=[['Fase 1 · Días 1 a 30 · Decide qué planner quieres ser',['Tu nicho: qué bodas, para qué parejas y en qué zona','Tus primeros 10 proveedores','Cita con una gestoría']],
  ['Fase 2 · Días 31 a 60 · Que se te vea',['Nombre e identidad sencilla','Instagram profesional y página de servicios','Tu primer mood board','Café con diez proveedores']],
  ['Fase 3 · Días 61 a 90 · Lista para tu primera pareja',['Dossier de servicios con tus precios','Contrato y forma de presupuestar','Tu primera reunión, ensayada']]];
const P0Q=[['¿Dónde estás hoy?','Trabajo en otra cosa y quiero aprender la profesión.','He decidido dedicarme a esto y quiero lanzar mi negocio.','Ya trabajo en bodas o eventos.'],
  ['¿Cuánto tiempo puedes dedicarle?','Unas horas a la semana, a mi ritmo.','Una parte fija de mi semana durante 6 meses.','Puedo dedicarme a fondo y viajar.'],
  ['¿Cómo aprendes mejor?','Sola, con buenos materiales.','Con alguien que revise lo que hago.','Al lado de profesionales, en bodas reales.'],
  ['¿Qué te frena más ahora?','No conozco la profesión por dentro.','No sé por dónde empezar mi negocio.','Quiero subir de nivel y no sé cómo.'],
  ['¿Qué bodas te imaginas?','Todavía no lo sé.','Bodas de mi zona, con mi estilo.','Bodas de lujo y de destino, con parejas internacionales.'],
  ['Dentro de un año quieres…','Saber organizar una boda de principio a fin.','Tener mi negocio en marcha y mis primeras parejas.','Trabajar en el segmento de lujo.']];
const P0RES={online:['Online','Estás descubriendo la profesión y quieres aprenderla bien, sin dejarlo todo. Online te da el método completo a tu ritmo y una sesión de dudas al mes. Te descontamos los 47 € si te apuntas en los próximos 30 días.'],
  completo:['Completo','Ya has decidido y quieres hacerlo bien a la primera. En Completo lanzas tu negocio con nosotras revisando cada paso, 12 horas de tutoría y prácticas en una de nuestras bodas. Te descontamos los 47 €.'],
  signature:['Signature','Ya conoces el sector y quieres dar el salto al lujo y al destino. Signature son 8 plazas por edición, con una boda desde cero en nuestro equipo. Te descontamos los 47 €.']};
// Most repeated answer wins; on a tie, the higher level
function p0Level(ans){ const c=[0,0,0]; ans.forEach(a=>c[a]++); const max=Math.max(...c); return ['online','completo','signature'][c.lastIndexOf(max)]; }
const p0=()=>S.biz.p0||(S.biz.p0={});
const p0Open=L=>S.me.unlocked||daysSince(S.me.started_at||todayISO())>=L.day;
const p0Done=L=>!!S.progress['p0-'+L.n]||(L.diag&&!!p0().diag);
const p0Lib=()=>S.library.filter(l=>(l.plans||[]).includes('paso0'));
const p0Wa=()=>p0Lib().find(l=>/whatsapp/i.test(l.path||'')||/whatsapp/i.test(l.title||''));
const P0MENU=[['','Bootcamp'],['negocio','Mi negocio'],['herramientas','Herramientas'],['cuenta','Mi cuenta']];
function p0Portal(){
  const pg=page(), L=ui('lesson');
  const body=L?p0Reader(P0.find(x=>x.n===L)):({'':p0Home,negocio:p0Negocio,herramientas:p0Tools,cuenta})[pg]?.()||p0Home();
  return shell(body,P0MENU,pg,0);
}
function p0Home(){
  const me=S.me, d=Math.min(7,daysSince(me.started_at||todayISO())+1), done=P0.filter(p0Done).length, wa=p0Wa(), dg=p0().diag;
  return `<header><span class="eyebrow">Wedding Planner Bootcamp · día ${d} de 7</span><h1>Hola, ${esc(me.name.split(' ')[0])}</h1><p>Qué ilusión tenerte aquí. Esta semana aprendes con nosotras cómo trabaja de verdad una wedding planner: cinco lecciones del programa, una al día, cada una con su herramienta. Y cada mañana te escribimos para recordarte lo que toca. No estás sola.</p></header>
  ${wa?`<div class="next"><div><span class="label">Comunidad de WhatsApp</span><h3>Preséntate y conoce a las demás</h3><p class="hint">Pilar y Ainoa responden de lunes a viernes, de 10 a 18 h.</p></div><a class="btn primary" href="${esc(wa.path)}" target="_blank" rel="noopener">Entrar en la Comunidad</a></div>`:''}
  <div class="sheet pad"><div class="spread"><h3 style="font-size:20px">Tu semana</h3><span class="num">${done} de ${P0.length}</span></div><div class="bar"><i style="width:${Math.round(done/P0.length*100)}%"></i></div>
    <div class="list">${P0.map(L=>{ const open=p0Open(L), ok=p0Done(L);
      return `<div class="li${open?'':' locked'}"><span class="tick${ok?' on':''}">${ok?'✓':L.n}</span><div class="t"><small>${L.days}</small><b style="font-weight:400">${esc(L.t)}</b></div>${open?`<button type="button" class="btn sm${ok?'':' primary'}" data-act="p0lesson" data-arg="${L.n}">${ok?'Repasar':'Empezar'}</button>`:`<span class="hint">Se abre el ${fdate(addDays(me.started_at||todayISO(),L.day),{weekday:'long',day:'numeric'})}</span>`}</div>`; }).join('')}</div></div>
  ${dg?p0Result(dg.level):''}
  <div class="grid2"><a class="sheet pad tile" href="/portal/herramientas" style="text-decoration:none;color:inherit"><span class="label">Tus herramientas</span><h3 style="font-size:20px">Agenda, proveedores, mood board y calculadora</h3><p class="hint">Descárgalas y úsalas durante la semana.</p></a>
  <a class="sheet pad tile" href="/portal/negocio" style="text-decoration:none;color:inherit"><span class="label">Mi negocio</span><h3 style="font-size:20px">Tus respuestas y tu plan de 90 días</h3><p class="hint">Todo lo que escribes en el Bootcamp se guarda aquí.</p></a></div>`;
}
// A lesson becomes slides, like a deck made in Canva: cover, one slide per section, the teaser and her task
const P0MORE='En el programa Online';
function p0Slides(L){
  const S0=[{k:'cover'}]; let cur=null;
  L.b.forEach(([k,t])=>{ if(k==='h'){ cur={k:t===P0MORE?'more':'sec',h:t,p:[],li:[],post:[]}; S0.push(cur); }
    else { if(!cur){ cur={k:'sec',h:'',p:[],li:[],post:[]}; S0.push(cur); } if(k==='li') cur.li.push(t); else (cur.li.length?cur.post:cur.p).push(t); } });
  // More than four points: split them evenly (7 → 4 + 3), the text after the list goes on the last slide
  const out=[]; S0.forEach(s=>{ const parts=Math.ceil((s.li||[]).length/4); if(s.k!=='sec'||parts<2) return out.push(s);
    const per=Math.ceil(s.li.length/parts);
    for(let i=0;i<parts;i++) out.push({...s,p:i?[]:s.p,post:i===parts-1?s.post:[],li:s.li.slice(i*per,i*per+per),from:i*per,part:[i+1,parts]}); });
  if(!L.diag) out.push({k:'task'});
  return out;
}
// "Título · texto" or a short "Título: texto" becomes a card with its title in bold
function p0Card(t){ let i=t.indexOf(' · '), k=3; if(i<0){ i=t.indexOf(': '); k=2; if(i>38) i=-1; } const b=t.slice(i+k); return i<0?[t]:[t.slice(0,i),b.charAt(0).toUpperCase()+b.slice(1)]; }
const P0FOOT='<span class="sc-foot" aria-hidden="true">Nubes de Algodón School · The Wedding Creators</span>';
function p0Slide(L,s,i,n){
  const sec=n=>String(n).padStart(2,'0');
  if(s.k==='cover') return `<section class="slide cover"><div class="sc-copy"><span class="eyebrow">Wedding Planner Bootcamp · ${esc(L.days)}</span><h2>${esc(L.t)}</h2><p class="sc-sub">${L.diag?'Tu cierre del Bootcamp':`Lección ${L.n} de 5`}</p><p class="sc-sign">Pilar y Ainoa · The Wedding Creators</p></div>${L.img?`<div class="sc-img" style="background-image:url('${L.img}')" role="img" aria-label=""></div>`:''}</section>`;
  if(s.k==='more') return `<section class="slide more"><span class="eyebrow">¿Quieres más?</span><h3>${esc(s.h)}</h3>${s.p.map(t=>`<p>${esc(t)}</p>`).join('')}<a class="btn" href="/#precios">Ver el programa Online</a>${P0FOOT}</section>`;
  if(s.k==='task') return `<section class="slide task"><span class="eyebrow">${esc(L.days)}</span><h3>Tu tarea de hoy</h3><ol class="sc-tasks">${L.tasks.map(t=>`<li>${esc(t)}</li>`).join('')}</ol>
    ${L.tool?`<p class="sc-tool"><b>Tu herramienta:</b> ${esc(L.tool)} <a href="/portal/herramientas">Ver herramientas</a></p>`:''}
    ${L.more?`<p class="sc-tool"><b>Para ampliar:</b> <a href="${L.more[1]}" target="_blank" rel="noopener">${esc(L.more[0])}</a></p>`:''}
    <div class="row">${L.sec?`<a class="btn" href="/portal/negocio#p0-${L.sec}" data-act="p0go" data-arg="${L.sec}">Responder en Mi negocio</a>`:''}
    <button type="button" class="btn primary" data-act="p0done" data-arg="${L.n}">${S.progress['p0-'+L.n]?'Volver al Bootcamp':'Lección hecha'}</button></div>${P0FOOT}</section>`;
  const tone=['', ' rose',' sky'][i%3], big=!s.li.length&&s.p.join(' ').length<260;
  return `<section class="slide sec${tone}${big?' big':''}"><span class="sc-num" aria-hidden="true">${sec(i)}</span><div class="sc-body"><span class="eyebrow sc-rule">${esc(L.t)}${s.part?` · ${s.part[0]}/${s.part[1]}`:''}</span>${s.h?`<h3>${esc(s.h)}</h3>`:''}
    ${s.p.map(t=>`<p>${esc(t)}</p>`).join('')}${s.li.length?`<ol class="sc-cards${s.li.length===1?' one':''}" start="${(s.from||0)+1}">${s.li.map((t,j)=>{ const [a,b]=p0Card(t); return `<li><span class="n">${(s.from||0)+j+1}</span>${b?`<b>${esc(a)}</b><span>${esc(b)}</span>`:`<span>${esc(a)}</span>`}</li>`; }).join('')}</ol>`:''}${(s.post||[]).map(t=>`<p>${esc(t)}</p>`).join('')}</div>${P0FOOT}</section>`;
}
function p0Reader(L){
  if(!L||!p0Open(L)){ ui('lesson',null); return p0Home(); }
  const sl=p0Slides(L), i=Math.min(ui('slide')||0,sl.length-1);
  return `<div class="row"><button type="button" class="btn sm" data-act="p0close">← Bootcamp</button></div>
  <div class="deck" data-deck="${L.n}">${p0Slide(L,sl[i],i,sl.length)}
    <div class="decknav"><button type="button" class="btn sm" data-act="p0slide" data-arg="${i-1}" ${i?'':'disabled'} aria-label="Slide anterior">←</button>
      <div class="dots" role="tablist">${sl.map((_,j)=>`<button type="button" class="dot${j===i?' on':''}" data-act="p0slide" data-arg="${j}" aria-label="Slide ${j+1}"></button>`).join('')}</div>
      <span class="hint num">${i+1} / ${sl.length}</span>
      <button type="button" class="btn sm${i<sl.length-1?' primary':''}" data-act="p0slide" data-arg="${i+1}" ${i<sl.length-1?'':'disabled'} aria-label="Slide siguiente">→</button></div></div>
  ${L.diag?`<div class="reader">${p0().diag?p0Result(p0().diag.level):p0DiagForm()}</div>`:''}`;
}
ACT.p0slide=j=>{ ui('slide',Math.max(0,+j)); render(); };
// Arrow keys and a swipe move through the slides
document.addEventListener('keydown',e=>{ if(!document.querySelector('.deck')||/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
  const d=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0; if(!d) return; const L=P0.find(x=>x.n===ui('lesson')); if(!L) return;
  const j=(ui('slide')||0)+d; if(j<0||j>=p0Slides(L).length) return; ui('slide',j); render(); });
let p0x=null;
document.addEventListener('touchstart',e=>{ p0x=e.target.closest('.slide')?e.touches[0].clientX:null; },{passive:true});
document.addEventListener('touchend',e=>{ if(p0x===null) return; const dx=e.changedTouches[0].clientX-p0x; p0x=null; if(Math.abs(dx)<50) return;
  const L=P0.find(x=>x.n===ui('lesson')); if(!L) return; const j=(ui('slide')||0)+(dx<0?1:-1); if(j<0||j>=p0Slides(L).length) return; ui('slide',j); render(); });
function p0DiagForm(){
  return `<form data-form="p0diag" class="sheet pad" style="gap:18px">${P0Q.map((q,i)=>`<fieldset class="field" style="border:0;padding:0;margin:0"><span><b style="font-weight:400">${i+1}. ${esc(q[0])}</b></span>${q.slice(1).map((a,j)=>`<label class="check"><input type="radio" name="q${i}" value="${j}" required> <span>${esc(a)}</span></label>`).join('')}</fieldset>`).join('')}
    <button class="btn primary" type="submit" style="align-self:flex-start">Ver mi resultado</button></form>`;
}
function p0Result(k){ const [t,d]=P0RES[k];
  return `<div class="sheet pad up" id="p0-result"><span class="label">Tu diagnóstico</span><h3 style="font-size:24px">Tu nivel: ${t}</h3><p>${esc(d)}</p>
    ${k==='online'?`<a class="btn primary sm" style="align-self:flex-start" href="/#precios">Ver el programa Online</a>`:`<p class="hint">Ya tenemos tu resultado. Te escribimos en 48 horas para buscar tu llamada de 20 minutos.</p>`}</div>`; }
FORM.p0diag=async f=>{ const ans=P0Q.map((_,i)=>+f['q'+i]), level=p0Level(ans);
  p0().diag={level,ans,at:new Date().toISOString()}; await DB.saveBusiness();
  if(!S.realMe) await DB.addLead(S.me.name,S.me.email,'signature',{plan:level,why:`Diagnóstico del Bootcamp: le recomendamos ${P0RES[level][0]}.`});
  render(); document.getElementById('p0-result')?.scrollIntoView({block:'center'}); };
ACT.p0lesson=n=>{ if(page()) history.pushState({},'','/portal'); S.route=location.pathname; ui('lesson',+n); ui('slide',0); render(); scrollTo(0,0); };
ACT.p0close=()=>{ ui('lesson',null); render(); scrollTo(0,0); };
ACT.p0go=sec=>{ ui('lesson',null); nav('/portal/negocio#p0-'+sec); };
ACT.p0done=async n=>{ n=+n; const first=!S.progress['p0-'+n]; if(first) await DB.markLesson('p0-'+n);
  ui('lesson',null); render(); scrollTo(0,0); if(first) toast('¡Lección completada! Qué orgullosas estamos de ti'); };
function p0Negocio(){
  const a=p0(), pl=a.plan||{}, field=(k,label,kind)=>`<div class="field"><span>${label}</span>${kind==='area'?`<textarea id="p0-${k}" name="${k}" rows="3">${esc(a[k]||'')}</textarea>`:`<input id="p0-${k}" name="${k}" ${kind==='num'?'type="number" min="0"':''} value="${esc(a[k]??'')}">`}</div>`;
  return `<header><h1>Mi negocio</h1><p>Tus respuestas del Bootcamp. Vuelve a ellas cuando lo necesites: son la base de tu negocio.</p></header>
  <form class="sheet pad" data-form="p0biz" id="p0-why"><span class="eyebrow">Día 1</span><h3 style="font-size:22px">Por qué quieres dedicarte a esto</h3>
    ${field('why','¿Por qué quiero ser wedding planner?','area')}${field('bodas','¿Qué tipo de bodas me imagino organizando?','area')}${field('senales','¿Cuántas de las 7 señales reconozco en mí?','num')}
    <button class="btn primary" type="submit" style="align-self:flex-start">Guardar</button></form>
  <form class="sheet pad" data-form="p0biz" id="p0-nums"><span class="eyebrow">Día 2</span><h3 style="font-size:22px">Tus números</h3>
    <div class="formgrid">${field('fee','Mi honorario mínimo por boda (€)','num')}${field('count','Bodas que necesito al año','num')}</div>
    <button class="btn primary" type="submit" style="align-self:flex-start">Guardar</button></form>
  <form class="sheet pad p0plan" data-form="p0plan" id="p0-plan"><span class="eyebrow">Días 5 y 6</span><h3 style="font-size:22px">Mi plan de 90 días · ${esc(S.me.name)}</h3>
    ${a.fee?`<p class="hint">Mi honorario mínimo: ${eur(+a.fee)} · ${esc(a.count||'')} bodas al año</p>`:''}
    ${P0PLAN.map(([ph,items],i)=>`<div><h4 style="font-size:18px;margin:10px 0 6px">${esc(ph)}</h4>${items.map((it,j)=>{ const k=`${i}-${j}`, v=pl[k]||{};
      return `<div class="formgrid p0row" style="grid-template-columns:minmax(0,2fr) minmax(0,1fr);align-items:end"><div class="field"><span>${esc(it)}</span><input id="p0p-${k}" name="a${k}" value="${esc(v.a||'')}" placeholder="Qué vas a hacer"></div><div class="field"><span>Fecha</span><input id="p0d-${k}" name="d${k}" type="date" value="${esc(v.d||'')}"></div></div>`; }).join('')}</div>`).join('')}
    <div class="row noprint"><button class="btn primary" type="submit">Guardar mi plan</button><button class="btn" type="button" data-act="p0print">Descargar en PDF</button></div></form>`;
}
FORM.p0biz=async f=>{ Object.assign(p0(),f); await DB.saveBusiness(); toast('Guardado'); };
FORM.p0plan=async f=>{ const pl={}; P0PLAN.forEach(([,items],i)=>items.forEach((_,j)=>{ const k=`${i}-${j}`; pl[k]={a:(f['a'+k]||'').trim(),d:f['d'+k]||''}; })); p0().plan=pl; await DB.saveBusiness(); render(); toast('Plan guardado'); };
// The browser's print window saves it as a PDF; the print styles leave only the plan
ACT.p0print=()=>{ document.body.classList.add('print-plan'); setTimeout(()=>{ print(); document.body.classList.remove('print-plan'); },50); };
function p0Tools(){
  const items=p0Lib().filter(l=>l!==p0Wa());
  return `<header><h1>Herramientas</h1><p>Tus primeras herramientas de trabajo. Descárgalas y úsalas durante la semana: son tuyas.</p></header>
  <div class="sheet pad">${items.length?`<div class="list">${items.map(l=>`<div class="li"><div class="t"><b style="font-weight:400">${esc(l.title)}</b>${l.detail?`<small>${esc(l.detail)}</small>`:''}</div><button type="button" class="btn sm" data-act="openFile" data-arg="course|${esc(l.path||'')}">${/^https?:/.test(l.path||'')?'Abrir':'Descargar'}</button></div>`).join('')}</div>`:`<p class="empty">Estamos subiendo tus herramientas. Vuelve en un rato.</p>`}</div>
  <div class="sheet pad"><span class="label">Lecturas de apoyo</span><div class="list">${[['¿Puedo ser wedding planner? 7 señales','/guia-senales.pdf'],['Cuánto gana una wedding planner en España','/guia-numeros.pdf'],['De la oficina a las bodas: el plan de 90 días','/guia-90-dias.pdf']].map(([t,u])=>`<div class="li"><div class="t"><b style="font-weight:400">${t}</b><small>Guía en PDF</small></div><a class="btn sm" href="${u}" target="_blank" rel="noopener">Abrir</a></div>`).join('')}</div></div>`;
}
