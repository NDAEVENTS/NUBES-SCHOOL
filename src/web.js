// ---------- Public web (Spanish, for future students) ----------
// The syllabus on the web: titles only. Visitors get it from course_outline(); the demo has the whole course
const pub=()=>S.pub||{stages:STAGES,mods:COURSE};
const CONTACT='hola@nubesdealgodonevents.com';
// Texts of the web. The team edits them in Panel → Editar landing (table site_content); these are the starting texts.
// In titles, *word* is shown in italics. Prices are not here: they are charged by Stripe (see PLANS and the checkout function).
const WEB_DEFAULT={
  hero:{eyebrow:'The Wedding Creators · programa online',title:'Aprende a organizar bodas *de lujo* con quienes las organizan cada semana.',
    lede:'Un método en 4 etapas para convertirte en wedding planner y montar tu propia empresa, con tutorías en directo, plantillas reales y nuestro acompañamiento hasta que lo consigas.',cta1:'Ver precios y plazas',cta2:'Descarga la guía gratuita'},
  facts:{items:[{num:'10+',text:'años organizando bodas en la Costa Brava, para parejas de todo el mundo'},{num:'{modulos}',text:'módulos y {lecciones} lecciones, de la profesión a tu primera pareja'},{num:'12 h',text:'de tutorías por videollamada con nosotras'},{num:'4',text:'semanas para recorrer el programa, y un año de acceso'}]},
  who:{eyebrow:'¿Es para ti?',title:'Pensado para tres momentos',items:[{t:'Empiezas de cero',d:'Te apasionan las bodas y quieres convertirlo en tu profesión, con una base seria desde el primer día.'},{t:'Vienes de eventos u hostelería',d:'Ya sabes de eventos. Te falta el método de wedding planning y saber vender tus servicios.'},{t:'Ya organizas bodas',d:'Quieres subir de nivel: mejores tarifas, procesos de lujo y bodas destino con parejas internacionales.'}]},
  method:{eyebrow:'El método',intro:'Cada semana se abre una etapa nueva con sus lecciones, ejercicios y plantillas. Al terminar cada módulo tienes tu tutoría para aplicarlo a tu proyecto. Y todo lo que construyes en los ejercicios se va guardando en tu espacio “Mi negocio”.'},
  about:{eyebrow:'Quiénes os enseñan',title:'Ainoa y Pilar, de Nubes de Algodón Events',photo:'',
    text:'Llevamos más de diez años organizando bodas en la Costa Brava, y ahora también en Sicilia, para parejas que llegan de Estados Unidos y de toda Europa. Todo lo que enseñamos lo usamos cada semana: los contratos, las plantillas, la forma de presupuestar y de cuidar a cada pareja.',
    quote:'Desde el primer día te prometemos que no soltaremos tu mano hasta que consigas tu objetivo.'},
  testimonials:{eyebrow:'Lo que dicen nuestras alumnas',title:'Ellas ya lo han hecho',items:[]},
  prices:{eyebrow:'Precios',title:'Elige cómo quieres hacerlo',intro:'El contenido es el mismo en las tres opciones. Cambia cuánto te acompañamos. Puedes pagar con tarjeta, Apple Pay, Google Pay o PayPal, también a plazos.',
    online:['Las 4 etapas y los 9 módulos en tu portal','Todas las plantillas y descargables','Ejercicios guiados y tu espacio “Mi negocio”','1 sesión grupal de dudas al mes, en directo','Certificado al terminar'],
    completo:['Todo lo de Online','12 h de tutorías individuales por videollamada','Feedback personal en cada ejercicio','Seguimiento de tu proyecto en “Mi negocio”'],
    signature:['Todo lo de Completo','Fin de semana de workshops y mentorías en la Costa Brava','Asistencia a un shooting real con nosotras','Módulo extra: bodas destino y clientes internacionales'],
    etapa1:'¿Quieres probar primero? La Etapa 1 está disponible por 197 €, y te los descontamos si después te pasas al programa.',
    forOnline:'Para ti si te apasionan las bodas, tu trabajo ya no te llena y quieres aprender la profesión a tu ritmo, sin dejarlo todo todavía.',
    forCompleto:'Para ti si ya has decidido lanzarte y quieres que alguien con experiencia revise cada paso de tu negocio contigo.',
    forSignature:'Para ti si ya trabajas en bodas o eventos y quieres dar el salto al lujo y a las bodas destino, a nuestro lado.',
    edition:'Próxima edición: febrero de 2027 · 8 plazas',
    upgrade:'Si después quieres subir de nivel, solo pagas la diferencia.'},
  guide:{mode:'auto'},
  faq:{title:'Antes de empezar',items:[
    {q:'¿Necesito experiencia previa?',a:'No. El programa empieza por la base de la profesión y te acompaña hasta montar tu empresa.'},
    {q:'¿Cuánto tiempo tengo acceso?',a:'12 meses desde la compra. Las etapas se abren una por semana y después puedes volver a cualquier lección cuando quieras.'},
    {q:'¿Sirve si vivo fuera de España?',a:'Sí. Es 100 % online y las tutorías son por videollamada. La parte legal explica España; en tu tutoría lo adaptamos a tu país.'},
    {q:'¿Cómo funcionan las tutorías?',a:'En Completo y Signature tienes 12 horas: al terminar cada módulo pides tu tutoría desde el portal y te proponemos día y hora.'},
    {q:'¿Qué diferencia hay entre Online y Completo?',a:'El contenido es el mismo. En Completo trabajas con nosotras: tutorías individuales, feedback personal en cada ejercicio y seguimiento de tu proyecto. En Online avanzas a tu ritmo y resuelves dudas en la sesión grupal mensual.'},
    {q:'¿Puedo pagar a plazos?',a:'Sí: Online en 3 cuotas mensuales de 197 € y Completo en 6 cuotas de 332 €. El acceso es completo desde el primer pago.'},
    {q:'¿Recibo factura?',a:'Sí, al pagar recibes la factura por email.'}]},
};
// Saved texts over the defaults: a section the team never touched keeps its starting text
const W=()=>{ const d=S.web||{}, out={}; for(const k in WEB_DEFAULT) out[k]=Object.assign({},WEB_DEFAULT[k],d[k]||{}); return out; };
const em=t=>esc(t).replace(/\*([^*]+)\*/g,'<em>$1</em>');
// The free guides (PDFs in public/, written in tools/guia*.html). 'auto' shows a different one each month.
const GUIDES=[
  {id:'senales',t:'¿Puedo ser wedding planner? *7 señales* de que esto es para ti',sub:'Para ti si te encantan las bodas, tu trabajo ya no te llena y te preguntas si podrías dedicarte a esto.',pdf:'/guia-senales.pdf'},
  {id:'numeros',t:'Cuánto gana una wedding planner *en España*',sub:'Cómo se cobra, qué te queda de verdad y por qué cobrar poco es el error más caro.',pdf:'/guia-numeros.pdf'},
  {id:'90dias',t:'De la oficina a las bodas: *el plan de 90 días*',sub:'Para empezar tu negocio sin dejar tu trabajo todavía, con unas horas a la semana.',pdf:'/guia-90-dias.pdf'},
  {id:'errores',t:'Los 7 errores que hunden a una wedding planner *en su primer año*',sub:'Y cómo evitarlos desde el principio.',pdf:'/guia-wedding-planner.pdf'},
];
// A link can choose the guide (?guia=numeros) and say where the visit came from (?utm_source=instagram): the ManyChat replies on Instagram use both
const Q=new URLSearchParams(location.search);
const FROM=(()=>{ const f=(Q.get('utm_source')||'').toLowerCase().slice(0,40); try{ if(f) sessionStorage.setItem('from',f); return sessionStorage.getItem('from')||''; }catch{ return f; } })();
const withFrom=x=>FROM?Object.assign({from:FROM},x):x;
function guideNow(){ const m=GUIDES.some(g=>g.id===Q.get('guia'))?Q.get('guia'):W().guide.mode, d=new Date(); return GUIDES.find(g=>g.id===m)||GUIDES[(d.getFullYear()*12+d.getMonth())%GUIDES.length]; }
const fill=t=>esc(t).replace('{modulos}',pub().mods.length).replace('{lecciones}',pub().mods.reduce((a,m)=>a+m.lessons.length,0));
function brand(){ return `<a class="brand" href="/" style="text-decoration:none;color:inherit"><b>Nubes de Algodón</b><span>School</span></a>`; }
function webPage(){
  const w=W();
  return `<div class="wrap">
  <div class="nav">${brand()}
    <nav><a href="/#programa">El programa</a><a href="/#nosotras">Quiénes somos</a><a href="/#precios">Precios</a><a href="/#faq">Preguntas</a><a class="btn sm" href="/portal">Acceso alumnas</a></nav></div>

  <section class="hero">
    <div>
      <span class="eyebrow">${esc(w.hero.eyebrow)}</span>
      <h1>${em(w.hero.title)}</h1>
      <p class="lede">${esc(w.hero.lede)}</p>
      <div class="row cta"><a class="btn primary" href="/#precios">${esc(w.hero.cta1)}</a><a class="btn" href="/#guia">${esc(w.hero.cta2)}</a></div>
    </div>
    <div class="facts">${w.facts.items.map(f=>`<div><b class="num">${fill(f.num)}</b><span>${fill(f.text)}</span></div>`).join('')}</div>
  </section>

  <section class="sec">
    <span class="eyebrow">${esc(w.who.eyebrow)}</span>
    <h2>${em(w.who.title)}</h2>
    <div class="who">${w.who.items.map(i=>`<div><b>${esc(i.t)}</b><span>${esc(i.d)}</span></div>`).join('')}</div>
  </section>

  <section class="sec" id="programa">
    <span class="eyebrow">${esc(w.method.eyebrow)}</span>
    <h2>${pub().stages.length?(['Una etapa','Dos etapas','Tres etapas','Cuatro etapas','Cinco etapas','Seis etapas'][pub().stages.length-1]||pub().stages.length+' etapas')+', una por semana':'Paso a paso, una etapa por semana'}</h2>
    <p class="intro">${esc(w.method.intro)}</p>
    <div class="stages">${pub().stages.map(s=>`<div class="stage"><span class="wk">Etapa ${s.n} · semana ${Math.floor(s.opens/7)+1}</span><h3>${esc(s.t)}</h3><ul>${s.mods.map(n=>`<li>${esc(pub().mods.find(m=>m.n===n)?.t)}</li>`).join('')}</ul></div>`).join('')}</div>
    <div>${pub().mods.map((m,i)=>`<details class="mod"><summary><b>Módulo ${i+1}. ${esc(m.t)}</b>${(m.plans||[]).length?`<span class="pill">Solo ${esc(m.plans.map(k=>PLANS[k]?.t||k).join(' y '))}</span>`:''}<span class="hint">${m.lessons.length} lecciones · tutoría ${m.h} h</span></summary><ul>${m.lessons.map(l=>`<li>${esc(l.t)}</li>`).join('')}${m.exercises.map(x=>`<li>Ejercicio: ${esc(x.t)}</li>`).join('')}</ul></details>`).join('')}</div>
  </section>

  <section class="sec" id="nosotras">
    <div class="about">
      ${w.about.photo?`<img class="portrait" src="${esc(w.about.photo)}" alt="${esc(w.about.title)}">`:`<div class="portrait">Foto de Ainoa y Pilar en una boda real</div>`}
      <div style="display:flex;flex-direction:column;gap:16px">
        <span class="eyebrow">${esc(w.about.eyebrow)}</span>
        <h2>${em(w.about.title)}</h2>
        ${String(w.about.text).split(/\n\s*\n/).map(p=>`<p>${esc(p)}</p>`).join('')}
        ${w.about.quote?`<blockquote>“${esc(w.about.quote)}”</blockquote>`:''}
      </div>
    </div>
  </section>
  ${w.testimonials.items.length?`<section class="sec">
    <span class="eyebrow">${esc(w.testimonials.eyebrow)}</span>
    <h2>${em(w.testimonials.title)}</h2>
    <div class="who">${w.testimonials.items.map(t=>`<div><span>“${esc(t.quote)}”</span><b>${esc(t.name)}</b>${t.detail?`<small class="hint">${esc(t.detail)}</small>`:''}</div>`).join('')}</div>
  </section>`:''}

  <section class="sec" id="precios">
    <span class="eyebrow">${esc(w.prices.eyebrow)}</span>
    <h2>${em(w.prices.title)}</h2>
    <p class="intro">${esc(w.prices.intro)}</p>
    <div class="plans">
      ${planCard('online','o 3 cuotas de 197 €',w.prices.online,false,w.prices.forOnline)}
      ${planCard('completo','o 6 cuotas de 332 €',w.prices.completo,true,w.prices.forCompleto)}
      ${planCard('signature',w.prices.edition,w.prices.signature,false,w.prices.forSignature)}
    </div>
    <p class="hint">${esc(w.prices.etapa1)} <button type="button" class="btn sm" data-act="buy" data-arg="etapa1">Empezar con la Etapa 1</button></p>
    ${w.prices.upgrade?`<p class="hint">${esc(w.prices.upgrade)}</p>`:''}
  </section>

  <section class="sec" id="guia">
    <div class="lead">
      <div><span class="eyebrow">Guía gratuita</span><h2>${em(guideNow().t)}</h2><p class="hint" style="margin-top:8px">${esc(guideNow().sub)}</p></div>
      ${ui('leadDone')?`<div style="display:flex;flex-direction:column;gap:10px"><p class="ok">¡Gracias! Aquí tienes tu guía.</p><a class="btn primary" href="${guideNow().pdf}" target="_blank" rel="noopener">Descargar la guía (PDF)</a></div>`:
      `<form data-form="lead"><div class="field"><span>Tu nombre</span><input id="lname" name="name" required autocomplete="given-name"></div>
        <div class="field"><span>Tu email</span><input id="lmail" name="email" type="email" required autocomplete="email"></div>
        <label class="check"><input id="lok" name="ok" type="checkbox" required> He leído y acepto la <a href="/legal/privacidad">política de privacidad</a> y quiero recibir la guía y emails de Nubes de Algodón School.</label>
        <button class="btn primary" type="submit">Quiero la guía</button></form>`}
    </div>
  </section>

  <section class="sec faq" id="faq">
    <span class="eyebrow">Preguntas frecuentes</span>
    <h2>${em(w.faq.title)}</h2>
    <div>${w.faq.items.map(f=>faq(esc(f.q),esc(f.a))).join('')}</div>
  </section>
  <footer class="pub"><span>Nubes de Algodón School · <span style="user-select:all">${CONTACT}</span></span><span class="row"><a href="/legal/aviso-legal">Aviso legal</a><a href="/legal/privacidad">Privacidad</a><a href="/legal/cookies">Cookies</a><a href="/legal/condiciones">Condiciones de venta</a></span></footer>
  </div>${ui('buy')?buyModal():''}`;
}
// Online is bought straight away; Completo and Signature start with a 20-minute call
const CALL=k=>k==='completo'||k==='signature';
function planCard(k,sub,items,star,who){ const p=PLANS[k];
  return `<div class="sheet plan${star?' star':''}">${star?'<span class="pill prog tag">La más elegida</span>':''}<h3>${p.t}</h3><div class="price num">${eur(p.price)}<br><small>${esc(sub)}</small></div>${who?`<p class="for">${esc(who)}</p>`:''}<ul>${items.map(i=>`<li>${esc(i)}</li>`).join('')}</ul><button type="button" class="btn${star?' primary':''}" data-act="buy" data-arg="${k}">${CALL(k)?'Hablemos 20 minutos':'Inscribirme'}</button></div>`; }
function faq(q,a){ return `<details><summary>${q}</summary><p>${a}</p></details>`; }
const INST={online:[3,197],completo:[6,332]};
function buyModal(){
  const k=ui('buy'), p=PLANS[k], sig=CALL(k);
  return `<div class="overlay"><form class="sheet pad modal" role="dialog" aria-modal="true" aria-labelledby="buyt" data-form="${sig?'apply':'buy'}">
    <span class="label">${sig?'Hablemos 20 minutos':'Inscripción'}</span>
    <h3 id="buyt" style="font-size:24px">The Wedding Creators · ${p.t}</h3>
    ${sig?`<p class="hint">${k==='signature'?`Signature se hace por ediciones: dos al año, en febrero y octubre. ${esc(W().prices.edition)}. `:''}Cuéntanos un poco de ti y te escribimos en 48 horas para buscar un hueco de 20 minutos por videollamada. Así vemos juntas si es el nivel que necesitas.</p>
      <div class="field"><span>Nombre</span><input id="aname" name="name" required></div>
      <div class="field"><span>Email</span><input id="amail" name="email" type="email" required></div>
      <div class="field"><span>Teléfono o WhatsApp (opcional)</span><input id="aphone" name="phone" type="tel" autocomplete="tel"></div>
      <div class="field"><span>País</span><input id="acountry" name="country" required></div>
      <div class="field"><span>¿Por qué quieres ser wedding planner y en qué punto estás?</span><textarea id="awhy" name="why" required></textarea></div>
      <label class="check"><input id="aok" type="checkbox" required> He leído y acepto la <a href="/legal/privacidad">política de privacidad</a>.</label>`:
    `<div class="spread"><span>Total</span><b class="num">${eur2(p.price)}</b></div>
      <div class="field"><span>Tu email (será tu acceso al portal)</span><input id="bmail" name="email" type="email" required autocomplete="email"></div>
      <label class="check"><input id="bdes" type="checkbox" required> Quiero empezar ya: acepto que el acceso al contenido digital comienza al pagar y que, desde ese momento, pierdo el derecho de desistimiento de 14 días.</label>
      <label class="check"><input id="bcond" type="checkbox" required> Acepto las <a href="/legal/condiciones">condiciones de venta</a>.</label>
      ${INST[k]?`<div class="field"><span>Forma de pago</span><select id="binst" name="installments"><option value="">Pago único de ${eur(p.price)}</option><option value="1">${INST[k][0]} cuotas mensuales de ${eur(INST[k][1])}</option></select></div>`:''}
      <p class="hint">${k==='online'?'Si compraste la Etapa 1 en los últimos 60 días, te descontamos lo que pagaste. ':''}Te llevamos a la página de pago seguro de Stripe: tarjeta, Apple Pay, Google Pay o PayPal.</p>`}
    <div class="row"><button type="submit" class="btn primary" ${S.busy?'disabled':''}>${sig?'Pedir la llamada':S.busy?'Abriendo el pago…':'Ir al pago'}</button><button type="button" class="btn" data-act="closeBuy">Cancelar</button></div>
  </form></div>`;
}
function thanksPage(){
  return `<div class="wrap"><div class="nav">${brand()}</div><div class="center"><div class="auth">
    <span class="eyebrow">The Wedding Creators</span><h1>¡Bienvenida a la escuela!</h1>
    <p>Tu pago se ha completado. En unos minutos recibirás un email para crear tu contraseña y entrar en tu portal. La factura llega en otro email de Stripe.</p>
    <p class="hint">Si no lo ves, revisa la carpeta de spam o escríbenos a <span style="user-select:all">${CONTACT}</span>.</p>
    <a class="btn primary" href="/portal" style="align-self:flex-start">Ir a mi portal</a></div></div></div>`;
}
ACT.buy=k=>{ ui('buy',k); render(); };
ACT.closeBuy=()=>{ ui('buy',null); render(); };
FORM.buy=async f=>{ if(CFG.demo){ ui('buy',null); toast('En la versión real, aquí se abre la página de pago de Stripe.'); return; }
  S.busy=true; render(); const url=await DB.checkout(ui('buy'),f.email.trim(),!!f.installments); location.href=url; };
// Call requests are stored as leads with source 'signature' (the only other source the database accepts) and the level in extra.plan
FORM.apply=async f=>{ await DB.addLead(f.name,f.email,'signature',withFrom({plan:ui('buy'),country:f.country,phone:f.phone||'',why:f.why})); ui('buy',null); toast('¡Gracias! Te escribimos en 48 horas para agendar la llamada.'); };
FORM.lead=async f=>{ await DB.addLead(f.name,f.email,'guia',withFrom({guide:guideNow().id})); ui('leadDone',true); render(); };
