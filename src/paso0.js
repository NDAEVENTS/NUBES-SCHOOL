// ---------- Paso 0 (47 €): seven days to see if this is for her ----------
// Four lessons that open on days 1, 3, 5 and 7 after buying, her answers in "Mi negocio" (business.data.p0),
// the tools and the WhatsApp community (library rows for the plan 'paso0') and the final diagnosis.
const P0=[
  {n:1,day:0,days:'Días 1 y 2',t:'La profesión por dentro',b:[
    ['h','Bienvenida'],['p','Bienvenida al Paso 0 de The Wedding Creators. Durante siete días vas a mirar esta profesión por dentro, hacer tus números y diseñar tus tres primeros meses. No hace falta que dejes nada ni que lo tengas claro. Para eso estamos aquí.'],
    ['h','Qué hace de verdad una wedding planner'],['p','Una wedding planner no organiza fiestas bonitas. Gestiona el proyecto más importante de la vida de una pareja, con su dinero, sus emociones y sus familias. En la práctica, su trabajo son cuatro cosas:'],
    ['li','Presupuesto: repartirlo bien y que se respete.'],['li','Proveedores: elegirlos, negociar, revisar contratos y coordinarlos.'],['li','Diseño: convertir el gusto de la pareja en un concepto que se pueda producir.'],['li','Coordinación: el timing, el wedding book y el día de la boda, cuando todo pasa a la vez.'],
    ['p','Puede ofrecer tres servicios: la organización integral (todo, desde cero), el diseño (la parte estética) o la coordinación del día (las últimas semanas y el día B). Muchas empiezan por la coordinación.'],
    ['h','Lo que nadie te cuenta'],['li','Una boda se contrata con 12 a 18 meses de antelación. Tu negocio crece a ese ritmo.'],['li','El día de la boda son 14 horas de pie, y siempre pasa algo. Nadie debe notarlo.'],['li','Eres empresaria: vender, presupuestar, facturar y cuidar tu marca es la mitad del trabajo.'],['li','Las parejas no te contratan por un decorado bonito. Te contratan para dormir tranquilas durante un año entero.']],
    tasks:['Lee la guía de las 7 señales y apunta cuántas reconoces en ti.','Responde en “Mi negocio”: ¿por qué quiero ser wedding planner? ¿Qué tipo de bodas me imagino organizando?','Preséntate en la Comunidad de WhatsApp: tu nombre, desde dónde escribes y a qué te dedicas hoy.'],
    tool:'La agenda semanal. Imprime una y reserva en ella tus horas del Paso 0.',more:['La guía de las 7 señales','/guia-senales.pdf'],sec:'why'},
  {n:2,day:2,days:'Días 3 y 4',t:'Tus números',b:[
    ['h','¿Se puede vivir de esto?'],['p','Sí, pero no el primer año y no cobrando poco. La mayoría de las planners que abandonan no lo hacen por falta de parejas, sino porque sus precios no se sostienen. Una planificación integral se lleva unas 200 horas: si cobras 1.500 €, trabajas a 7,50 € la hora antes de gastos.'],
    ['h','Cómo se cobra en esta profesión'],['li','Tarifa fija por servicio: la más clara para la pareja y la que usamos en Nubes.'],['li','Porcentaje del presupuesto: si lo usas, ponle siempre un mínimo.'],['li','Coordinación del día: menos horas y menos riesgo; la puerta de entrada de muchas planners.'],
    ['h','Tu precio sale de tus números, no de los de la competencia'],['p','Abre la calculadora de honorarios y rellena solo las casillas rosas: tus gastos fijos, lo que quieres ganar y cuántas bodas te ves organizando al año. La calculadora te dice tu honorario mínimo por boda: por debajo de esa cifra, cada boda te cuesta dinero.'],
    ['p','Después mira la pestaña “Escenarios”: verás cómo cambia tu precio si haces 6, 10 o 15 bodas. Más bodas no siempre es mejor: cada una son muchas horas.'],
    ['h','Cómo te pagan: nuestro método 30 / 20 / 20 / 30'],['p','Un 30 % de paga y señal al reservar la fecha, dos pagos intermedios del 20 % y el 30 % final un mes antes de la boda. Así tienes ingresos repartidos todo el año y la boda está pagada antes de empezar.']],
    tasks:['Rellena la calculadora con tus números reales.','Apunta en “Mi negocio” tu honorario mínimo y cuántas bodas necesitas al año.','Comparte en la Comunidad lo que más te ha sorprendido (sin cifras, si no quieres).'],
    tool:'La calculadora de honorarios.',more:['Cuánto gana una wedding planner en España','/guia-numeros.pdf'],sec:'nums'},
  {n:3,day:4,days:'Días 5 y 6',t:'Tu plan de 90 días',b:[
    ['h','No dejes tu trabajo mañana'],['p','Con cinco a siete horas a la semana puedes tener la base de tu negocio en 90 días. El plan va en tres fases. En esta lección no lo lees: lo rellenas con tus nombres, tus fechas y tu zona.'],
    ['h','Fase 1 · Días 1 a 30 · Decide qué planner quieres ser'],['li','Tu nicho: qué bodas, para qué parejas y en qué zona.'],['li','Tus primeros 10 proveedores en la base de datos (la meta son 30).'],['li','Una cita con una gestoría: puedes darte de alta sin dejar tu trabajo.'],
    ['h','Fase 2 · Días 31 a 60 · Que se te vea'],['li','Nombre e identidad sencilla.'],['li','Instagram profesional y una página con tus servicios.'],['li','Tu primer mood board, base de tu futuro shooting.'],['li','Un café con al menos diez proveedores.'],
    ['h','Fase 3 · Días 61 a 90 · Lista para tu primera pareja'],['li','Dossier de servicios con tus precios (los de tu calculadora).'],['li','Contrato y forma de presupuestar.'],['li','Tu primera reunión, ensayada.']],
    tasks:['Rellena tu plan en “Mi negocio”: una fecha y una acción concreta para cada punto.','Usa la base de datos de proveedores: apunta hoy los cinco primeros de tu zona.','Pon en tu agenda semanal tus horas fijas para el negocio, como una cita más.'],
    tool:'La base de datos de proveedores y la plantilla de mood board. Al terminar, descarga “Mi plan de 90 días” en PDF desde “Mi negocio”.',more:['De la oficina a las bodas: el plan de 90 días','/guia-90-dias.pdf'],sec:'plan'},
  {n:4,day:6,days:'Día 7',t:'Tu diagnóstico',b:[['p','Seis preguntas para saber qué camino te encaja. Responde pensando en cómo estás hoy, no en cómo te gustaría estar. Al terminar te contamos tu nivel y cómo descontarte los 47 €.']],tasks:[],diag:true},
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
const P0MENU=[['','Paso 0'],['negocio','Mi negocio'],['herramientas','Herramientas'],['cuenta','Mi cuenta']];
function p0Portal(){
  const pg=page(), L=ui('lesson');
  const body=L?p0Reader(P0.find(x=>x.n===L)):({'':p0Home,negocio:p0Negocio,herramientas:p0Tools,cuenta})[pg]?.()||p0Home();
  return shell(body,P0MENU,pg,0);
}
function p0Home(){
  const me=S.me, d=Math.min(7,daysSince(me.started_at||todayISO())+1), done=P0.filter(p0Done).length, wa=p0Wa(), dg=p0().diag;
  return `<header><span class="eyebrow">Paso 0 · día ${d} de 7</span><h1>Hola, ${esc(me.name.split(' ')[0])}</h1><p>Siete días para mirar la profesión por dentro, hacer tus números y diseñar tus tres primeros meses. Cada mañana te escribimos para recordarte lo que toca.</p></header>
  ${wa?`<div class="next"><div><span class="label">Comunidad de WhatsApp</span><h3>Preséntate y conoce a las demás</h3><p class="hint">Pilar y Ainoa responden de lunes a viernes, de 10 a 18 h.</p></div><a class="btn primary" href="${esc(wa.path)}" target="_blank" rel="noopener">Entrar en la Comunidad</a></div>`:''}
  <div class="sheet pad"><div class="spread"><h3 style="font-size:20px">Tu semana</h3><span class="num">${done} de ${P0.length}</span></div><div class="bar"><i style="width:${Math.round(done/P0.length*100)}%"></i></div>
    <div class="list">${P0.map(L=>{ const open=p0Open(L), ok=p0Done(L);
      return `<div class="li${open?'':' locked'}"><span class="tick${ok?' on':''}">${ok?'✓':L.n}</span><div class="t"><small>${L.days}</small><b style="font-weight:400">${esc(L.t)}</b></div>${open?`<button type="button" class="btn sm${ok?'':' primary'}" data-act="p0lesson" data-arg="${L.n}">${ok?'Repasar':'Empezar'}</button>`:`<span class="hint">Se abre el ${fdate(addDays(me.started_at||todayISO(),L.day),{weekday:'long',day:'numeric'})}</span>`}</div>`; }).join('')}</div></div>
  ${dg?p0Result(dg.level):''}
  <div class="grid2"><a class="sheet pad tile" href="/portal/herramientas" style="text-decoration:none;color:inherit"><span class="label">Tus herramientas</span><h3 style="font-size:20px">Agenda, proveedores, mood board y calculadora</h3><p class="hint">Descárgalas y úsalas durante la semana.</p></a>
  <a class="sheet pad tile" href="/portal/negocio" style="text-decoration:none;color:inherit"><span class="label">Mi negocio</span><h3 style="font-size:20px">Tus respuestas y tu plan de 90 días</h3><p class="hint">Todo lo que escribes en el Paso 0 se guarda aquí.</p></a></div>`;
}
function p0Reader(L){
  if(!L||!p0Open(L)){ ui('lesson',null); return p0Home(); }
  const next=P0.find(x=>x.n===L.n+1);
  return `<div class="row"><button type="button" class="btn sm" data-act="p0close">← Paso 0</button></div>
  <article class="reader"><span class="eyebrow">Paso 0 · ${L.days}</span><h2>${esc(L.t)}</h2>${blocksHTML(L.b)}
  ${L.tasks.length?`<div class="tut"><b>Tu tarea de hoy</b><ol>${L.tasks.map(t=>`<li>${esc(t)}</li>`).join('')}</ol>${L.sec?`<a class="btn sm" href="/portal/negocio#p0-${L.sec}" data-act="p0go" data-arg="${L.sec}">Responder en Mi negocio</a>`:''}</div>`:''}
  ${L.tool?`<p><b>Herramienta de estos días:</b> ${esc(L.tool)} <a href="/portal/herramientas">Ver herramientas</a></p>`:''}
  ${L.more?`<p><b>Para ampliar:</b> <a href="${L.more[1]}" target="_blank" rel="noopener">${esc(L.more[0])}</a></p>`:''}
  ${L.diag?(p0().diag?p0Result(p0().diag.level):p0DiagForm()):''}
  ${L.diag?'':`<div class="pager"><span></span>${S.progress['p0-'+L.n]?`<span class="pill done">Lección completada</span>`:''}<button type="button" class="btn primary" data-act="p0done" data-arg="${L.n}">${S.progress['p0-'+L.n]?(next&&p0Open(next)?'Siguiente →':'Volver al Paso 0'):'Hecha'}</button></div>`}</article>`;
}
function p0DiagForm(){
  return `<form data-form="p0diag" class="sheet pad" style="gap:18px">${P0Q.map((q,i)=>`<fieldset class="field" style="border:0;padding:0;margin:0"><span><b style="font-weight:400">${i+1}. ${esc(q[0])}</b></span>${q.slice(1).map((a,j)=>`<label class="check"><input type="radio" name="q${i}" value="${j}" required> <span>${esc(a)}</span></label>`).join('')}</fieldset>`).join('')}
    <button class="btn primary" type="submit" style="align-self:flex-start">Ver mi resultado</button></form>`;
}
function p0Result(k){ const [t,d]=P0RES[k];
  return `<div class="sheet pad up" id="p0-result"><span class="label">Tu diagnóstico</span><h3 style="font-size:24px">Tu nivel: ${t}</h3><p>${esc(d)}</p>
    ${k==='online'?`<a class="btn primary sm" style="align-self:flex-start" href="/#precios">Ver el programa Online</a>`:`<p class="hint">Ya tenemos tu resultado. Te escribimos en 48 horas para buscar tu llamada de 20 minutos.</p>`}</div>`; }
FORM.p0diag=async f=>{ const ans=P0Q.map((_,i)=>+f['q'+i]), level=p0Level(ans);
  p0().diag={level,ans,at:new Date().toISOString()}; await DB.saveBusiness();
  if(!S.realMe) await DB.addLead(S.me.name,S.me.email,'signature',{plan:level,why:`Diagnóstico del Paso 0: le recomendamos ${P0RES[level][0]}.`});
  render(); document.getElementById('p0-result')?.scrollIntoView({block:'center'}); };
ACT.p0lesson=n=>{ if(page()) history.pushState({},'','/portal'); S.route=location.pathname; ui('lesson',+n); render(); scrollTo(0,0); };
ACT.p0close=()=>{ ui('lesson',null); render(); scrollTo(0,0); };
ACT.p0go=sec=>{ ui('lesson',null); nav('/portal/negocio#p0-'+sec); };
ACT.p0done=async n=>{ n=+n; if(!S.progress['p0-'+n]){ await DB.markLesson('p0-'+n); return render(); }
  const next=P0.find(x=>x.n===n+1); ui('lesson',next&&p0Open(next)?next.n:null); render(); scrollTo(0,0); };
function p0Negocio(){
  const a=p0(), pl=a.plan||{}, field=(k,label,kind)=>`<div class="field"><span>${label}</span>${kind==='area'?`<textarea id="p0-${k}" name="${k}" rows="3">${esc(a[k]||'')}</textarea>`:`<input id="p0-${k}" name="${k}" ${kind==='num'?'type="number" min="0"':''} value="${esc(a[k]??'')}">`}</div>`;
  return `<header><h1>Mi negocio</h1><p>Tus respuestas del Paso 0. Vuelve a ellas cuando lo necesites: son la base de tu negocio.</p></header>
  <form class="sheet pad" data-form="p0biz" id="p0-why"><span class="eyebrow">Días 1 y 2</span><h3 style="font-size:22px">Por qué quieres dedicarte a esto</h3>
    ${field('why','¿Por qué quiero ser wedding planner?','area')}${field('bodas','¿Qué tipo de bodas me imagino organizando?','area')}${field('senales','¿Cuántas de las 7 señales reconozco en mí?','num')}
    <button class="btn primary" type="submit" style="align-self:flex-start">Guardar</button></form>
  <form class="sheet pad" data-form="p0biz" id="p0-nums"><span class="eyebrow">Días 3 y 4</span><h3 style="font-size:22px">Tus números</h3>
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
