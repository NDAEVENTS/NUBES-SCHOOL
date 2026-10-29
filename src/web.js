// ---------- Public web (Spanish, for future students) ----------
// The syllabus on the web: titles only. Visitors get it from course_outline(); the demo has the whole course
const pub=()=>S.pub||{stages:STAGES,mods:COURSE};
const CONTACT='hola@nubesdealgodonevents.com';
// Texts of the web. The team edits them in Panel → Editar landing (table site_content); these are the starting texts.
// In titles, *word* is shown in italics. Prices are not here: they are charged by Stripe (see PLANS and the checkout function).
const WEB_DEFAULT={
  hero:{eyebrow:'The Wedding Creators · escuela de wedding planners',title:'¿Y si tu próximo trabajo fuera *organizar bodas*?',
    lede:'Aprende el oficio de wedding planner paso a paso, sin dejar tu trabajo todavía, con quienes organizan bodas de lujo cada semana en la Costa Brava.',cta1:'Empieza por el Paso 0',cta2:'Descarga la guía gratuita',photo:'/img/ws-039.jpg',alt:'Pilar y Ainoa delante del cartel de The Wedding Creators'},
  facts:{items:[{num:'+100',text:'bodas organizadas para parejas de todo el mundo'},{num:'+10',text:'países de origen de nuestras parejas: Estados Unidos, Reino Unido, Irlanda, Holanda, Francia, Italia, Singapur y Dubái, entre otros'},{num:'+20',text:'alumnas formadas con The Wedding Creators'}]},
  who:{eyebrow:'¿Te suena?',title:'Si te reconoces aquí, *esto es para ti*',items:[{t:'Tu trabajo ya no te llena',d:'Tienes un sueldo fijo, pero sientes que podrías dedicarte a algo que de verdad te ilusione.'},{t:'Siempre acabas organizándolo todo',d:'Los cumpleaños, la despedida, la boda de tu hermana. Te encantan las bodas y guardas cada idea que ves.'},{t:'Pero no sabes por dónde empezar',d:'Te preguntas si se puede vivir de esto, si necesitas contactos o un título y de dónde sacarías el tiempo.'}],
    after:'Nosotras también empezamos así. Por eso hemos creado The Wedding Creators.'},
  about:{eyebrow:'Quiénes os enseñan',title:'Pilar y Ainoa, de Nubes de Algodón Events',photo:'/img/nosotras-10-anos.jpg',
    text:'Las dos teníamos un trabajo fijo y lo dejamos para dedicarnos a las bodas. Hoy, con más de diez años de experiencia, organizamos bodas de lujo en la Costa Brava, Barcelona y Sicilia para parejas que llegan de todo el mundo.\n\nEn The Wedding Creators te enseñamos lo que usamos cada semana: cómo presupuestar, cómo elegir proveedores, cómo cuidar a cada pareja y cómo montar tu propia empresa.',
    quote:'Desde el primer día te prometemos que no soltaremos tu mano hasta que consigas tu objetivo.'},
  paso0:{eyebrow:'Paso 0 · empieza aquí',title:'Siete días para saber si *esto es para ti*',
    intro:'Antes de decidir nada, pruébalo. Cada día te llega una lección corta: cómo es la profesión por dentro, cuánto se gana de verdad y tu plan para los tres primeros meses. Al final sabrás qué camino te encaja.',
    days:['Días 1 y 2 · La profesión por dentro','Días 3 y 4 · Tus números','Días 5 y 6 · Tu plan de 90 días','Día 7 · Tu diagnóstico y tu siguiente paso'],
    kitTitle:'Y te llevas tus primeras herramientas de trabajo',
    items:[{t:'Agenda semanal',d:'Para organizar tus semanas como una wedding planner.'},{t:'Base de datos de proveedores',d:'Con todos los gremios del sector, lista para rellenar.'},{t:'Plantilla de mood board',d:'Para convertir el gusto de una pareja en un concepto.'},{t:'Calculadora de honorarios',d:'Descúbrelo con tus números: tú también puedes ser una de ellas.'}],
    price:'47 €',priceNote:'Si después sigues con el programa, te lo descontamos.',cta:'Avísame cuando abra',
    soon:'Abrimos las primeras plazas muy pronto. Déjanos tu email y serás de las primeras en saberlo.'},
  program:{eyebrow:'El programa',title:'The Wedding Creators, *en cuatro etapas*',
    intro:'Primero aprendes el oficio y después montas tu negocio. Cada módulo es corto y termina en una herramienta que te quedas para trabajar: tu mood board, tu base de proveedores, tus tarifas o tu dossier.',
    items:[{t:'El oficio',d:'Cómo se organiza una boda de principio a fin: presupuesto, proveedores, diseño, invitados y el gran día.'},{t:'Tu negocio',d:'Tu cliente ideal, tu marca, la parte legal y cuánto cobrar por tu trabajo.'},{t:'Visibilidad',d:'Tu web, tu Instagram, tu red de proveedores y tu primer shooting.'},{t:'Clientas y experiencia',d:'De la primera reunión a la firma, y cómo cuidar a cada pareja para que te recomiende.'}]},
  testimonials:{eyebrow:'Lo que dicen nuestras alumnas',title:'Ellas ya lo han hecho',items:[]},
  prices:{eyebrow:'Precios',title:'Elige *cómo quieres hacerlo*',intro:'Tres caminos distintos, según hasta dónde quieras llegar y cuánto quieras que te acompañemos. Puedes pagar con tarjeta, Apple Pay, Google Pay o PayPal, también a plazos.',
    tOnline:'Aprende el oficio a tu ritmo',tCompleto:'Lanza tu negocio acompañada',tSignature:'Lujo y bodas destino, con Nubes',
    online:['Las cuatro etapas del programa en tu portal','Plantillas y herramientas visuales para tu negocio','Una sesión grupal de dudas al mes, en directo','Certificado The Wedding Creators'],
    completo:['Todo lo de Online','12 h de tutorías individuales por videollamada','Feedback personal en cada entregable','Prácticas en una boda de Nubes','Tu propio shooting como proyecto final','Revisión de tus tarifas, tu contrato y tu web'],
    signature:['Todo lo de Completo','Módulos de lujo, bodas destino y bodas de otras culturas','Fin de semana presencial en la Costa Brava','Una boda desde cero con nuestro equipo','Solo 8 plazas por edición'],
    forOnline:'Para ti si quieres aprender la profesión sin dejar tu trabajo todavía.',
    forCompleto:'Para ti si ya has decidido dar el paso y quieres hacerlo con nosotras a tu lado.',
    forSignature:'Para ti si sueñas con bodas de lujo y parejas internacionales.',
    edition:'Próxima edición: febrero de 2027 · 8 plazas',
    paso0:'¿Aún no lo tienes claro? Empieza por el Paso 0.',
    upgrade:'Si después quieres subir de nivel, solo pagas la diferencia.'},
  guide:{mode:'90dias'},
  gallery:{eyebrow:'El fin de semana presencial',title:'Aprender *haciendo*, con proveedores reales',intro:'Así fue el fin de semana de workshops de la primera edición, en la Costa Brava: visitas a espacios, papelería, mesas y los proveedores con los que trabajamos cada semana. En Signature lo vives con nosotras.',
    items:[['ws-071.jpg','Visita a un espacio de bodas con su equipo'],['ws-079.jpg','Papelería de boda para elegir'],['ws-077.jpg','Alumnas en el taller de mesa dulce'],['ws-082.jpg','Cristalería y vajilla para diseñar la mesa'],['ws-050.jpg','Música en directo durante el workshop'],['ws-043.jpg','El cuaderno de The Wedding Creators']].map(([f,alt])=>({src:'/img/'+f,alt}))},
  faq:{title:'Antes de empezar',items:[
    {q:'¿Necesito experiencia previa?',a:'No. El programa empieza por la base de la profesión y te acompaña hasta montar tu empresa.'},
    {q:'¿Puedo hacerlo sin dejar mi trabajo?',a:'Sí, está pensado para eso. Las lecciones son cortas y puedes avanzar con unas horas a la semana.'},
    {q:'¿Qué es el Paso 0?',a:'Una semana para conocer la profesión por dentro, hacer tus números y tu plan de 90 días antes de decidir. Si después sigues con el programa, te descontamos lo que pagaste.'},
    {q:'¿Qué diferencia hay entre Online, Completo y Signature?',a:'En Online aprendes el oficio a tu ritmo, con una sesión grupal de dudas al mes. En Completo lanzas tu negocio con nosotras: tutorías individuales, feedback en cada entregable, prácticas en una boda nuestra y tu propio shooting. Signature suma el lujo y las bodas destino, con un fin de semana presencial y solo 8 plazas por edición.'},
    {q:'¿Sirve si vivo fuera de España?',a:'Sí. Es online y las tutorías son por videollamada. La parte legal explica España, y en las tutorías lo adaptamos a tu país.'},
    {q:'¿Cómo funcionan las tutorías?',a:'En Completo y Signature tienes 12 horas de tutorías individuales por videollamada, que reservas desde tu portal.'},
    {q:'¿Puedo pagar a plazos?',a:'Sí: Online en 3 cuotas mensuales de 197 € y Completo en 6 cuotas de 332 €. El acceso es completo desde el primer pago.'},
    {q:'¿Recibo factura?',a:'Sí, al pagar recibes la factura por email.'}]},
};
// Saved texts over the defaults: a section the team never touched keeps its starting text
const W=()=>{ const d=S.web||{}, out={}; for(const k in WEB_DEFAULT) out[k]=Object.assign({},WEB_DEFAULT[k],d[k]||{}); return out; };
const em=t=>esc(t).replace(/\*([^*]+)\*/g,'<em>$1</em>');
// The free guides (PDFs in public/, written in tools/guia*.html). 'auto' shows a different one each month.
const GUIDES=[
  {id:'senales',t:'¿Puedo ser wedding planner? *7 señales* de que esto es para ti',sub:'Para ti si te encantan las bodas, tu trabajo ya no te llena y te preguntas si podrías dedicarte a esto.',pdf:'/guia-senales.pdf',cover:'/img/guia-senales.jpg'},
  {id:'numeros',t:'Cuánto gana una wedding planner *en España*',sub:'Descárgala y comprueba que tú también puedes ser una de ellas.',pdf:'/guia-numeros.pdf',cover:'/img/guia-numeros.jpg'},
  {id:'90dias',t:'De la oficina a las bodas: *el plan de 90 días*',sub:'Para empezar tu negocio sin dejar tu trabajo todavía, con unas horas a la semana.',pdf:'/guia-90-dias.pdf',cover:'/img/guia-90-dias.jpg'},
  {id:'errores',t:'Los 7 errores que hunden a una wedding planner *en su primer año*',sub:'Y cómo evitarlos desde el principio.',pdf:'/guia-wedding-planner.pdf',cover:'/img/guia-wedding-planner.jpg'},
];
// A link can choose the guide (?guia=numeros) and say where the visit came from (?utm_source=instagram): the ManyChat replies on Instagram use both
const Q=new URLSearchParams(location.search);
const FROM=(()=>{ const f=(Q.get('utm_source')||'').toLowerCase().slice(0,40); try{ if(f) sessionStorage.setItem('from',f); return sessionStorage.getItem('from')||''; }catch{ return f; } })();
const withFrom=x=>FROM?Object.assign({from:FROM},x):x;
function guideNow(){ const m=GUIDES.some(g=>g.id===Q.get('guia'))?Q.get('guia'):W().guide.mode, d=new Date(); return GUIDES.find(g=>g.id===m)||GUIDES[(d.getFullYear()*12+d.getMonth())%GUIDES.length]; }
const fill=t=>esc(t).replace('{modulos}',pub().mods.length).replace('{lecciones}',pub().mods.reduce((a,m)=>a+m.lessons.length,0));
function brand(){ return `<a class="brand" href="/" style="text-decoration:none;color:inherit"><b>Nubes de Algodón</b><span>School</span></a>`; }
function webPage(){
  const w=W(), p0=w.paso0;
  return `<div class="wrap">
  <div class="nav">${brand()}
    <nav><a href="/#paso0">Paso 0</a><a href="/#programa">El programa</a><a href="/#nosotras">Quiénes somos</a><a href="/#precios">Precios</a><a href="/#faq">Preguntas</a><a class="btn sm" href="/portal">Acceso alumnas</a></nav></div>

  <section class="hero">
    <div>
      <span class="eyebrow">${esc(w.hero.eyebrow)}</span>
      <h1>${em(w.hero.title)}</h1>
      <p class="lede">${esc(w.hero.lede)}</p>
      <div class="row cta"><a class="btn primary" href="/#paso0">${esc(w.hero.cta1)}</a><a class="btn" href="/#guia">${esc(w.hero.cta2)}</a></div>
    </div>
    ${w.hero.photo?`<img class="heroimg" src="${esc(w.hero.photo)}" alt="${esc(w.hero.alt||'')}" fetchpriority="high">`:''}
  </section>
  <div class="facts">${w.facts.items.map(f=>`<div><b class="num">${fill(f.num).replace(/\+/g,'<i class="plus">+</i>')}</b><span>${fill(f.text)}</span></div>`).join('')}</div>

  <section class="sec">
    <span class="eyebrow">${esc(w.who.eyebrow)}</span>
    <h2>${em(w.who.title)}</h2>
    <div class="who">${w.who.items.map(i=>`<div><b>${esc(i.t)}</b><span>${esc(i.d)}</span></div>`).join('')}</div>
    ${w.who.after?`<p class="after">${esc(w.who.after)}</p>`:''}
  </section>

  <section class="sec" id="nosotras">
    <div class="about">
      ${w.about.photo?`<img class="portrait" src="${esc(w.about.photo)}" alt="${esc(w.about.title)}">`:`<div class="portrait">Foto de Pilar y Ainoa</div>`}
      <div style="display:flex;flex-direction:column;gap:16px">
        <span class="eyebrow">${esc(w.about.eyebrow)}</span>
        <h2>${em(w.about.title)}</h2>
        ${String(w.about.text).split(/\n\s*\n/).map(p=>`<p>${esc(p)}</p>`).join('')}
        ${w.about.quote?`<blockquote>“${esc(w.about.quote)}”</blockquote>`:''}
      </div>
    </div>
  </section>

  <section class="sec" id="paso0">
    <div class="paso0">
      <div class="p0copy">
        <span class="eyebrow">${esc(p0.eyebrow)}</span>
        <h2>${em(p0.title)}</h2>
        <p class="intro">${esc(p0.intro)}</p>
        <ol class="days">${(p0.days||[]).map(d=>{ const [a,b]=String(d).split(' · '); return `<li>${b?`<small>${esc(a)}</small><b>${esc(b)}</b>`:`<b>${esc(a)}</b>`}</li>`; }).join('')}</ol>
      </div>
      <div class="p0side">
        <h3>${esc(p0.kitTitle)}</h3>
        <div class="kit">${(p0.items||[]).map((k,i)=>`<div class="tool t${i%4}"><span class="ico" aria-hidden="true">${['◷','☰','✿','€'][i%4]}</span><b>${esc(k.t)}</b><small>${esc(k.d)}</small></div>`).join('')}</div>
        <div class="p0buy"><div><b class="price num">${esc(p0.price)}</b><small>${esc(p0.priceNote)}</small></div>
        ${ui('p0Done')?`<p class="ok">¡Apuntada! Te avisamos en cuanto abra.</p>`:`<form data-form="paso0" class="p0form"><p class="hint">${esc(p0.soon)}</p>
          <div class="row"><input id="p0name" name="name" required placeholder="Tu nombre" aria-label="Tu nombre" autocomplete="given-name"><input id="p0mail" name="email" type="email" required placeholder="Tu email" aria-label="Tu email" autocomplete="email"></div>
          <label class="check"><input id="p0ok" type="checkbox" required> <span>He leído y acepto la <a href="/legal/privacidad">política de privacidad</a> y quiero recibir emails de Nubes de Algodón School.</span></label>
          <button class="btn primary" type="submit">${esc(p0.cta)}</button></form>`}</div>
      </div>
    </div>
  </section>

  <section class="sec" id="programa">
    <span class="eyebrow">${esc(w.program.eyebrow)}</span>
    <h2>${em(w.program.title)}</h2>
    <p class="intro">${esc(w.program.intro)}</p>
    <div class="stages">${w.program.items.map((s,i)=>`<div class="stage"><span class="wk">Etapa ${i+1}</span><h3>${esc(s.t)}</h3><p>${esc(s.d)}</p></div>`).join('')}</div>
  </section>

  <section class="sec">
    <span class="eyebrow">${esc(w.gallery.eyebrow)}</span>
    <h2>${em(w.gallery.title)}</h2>
    <p class="intro">${esc(w.gallery.intro)}</p>
    ${(w.gallery.items||[]).length?`<div class="gallery">${w.gallery.items.filter(g=>g.src).map(g=>`<img src="${esc(g.src)}" alt="${esc(g.alt||'')}" loading="lazy">`).join('')}</div>`:''}
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
      ${planCard('online','o 3 cuotas de 197 €',w.prices.online,false,w.prices.forOnline,w.prices.tOnline)}
      ${planCard('completo','o 6 cuotas de 332 €',w.prices.completo,true,w.prices.forCompleto,w.prices.tCompleto)}
      ${planCard('signature',w.prices.edition,w.prices.signature,false,w.prices.forSignature,w.prices.tSignature)}
    </div>
    ${w.prices.paso0?`<p class="hint">${esc(w.prices.paso0)} <a class="btn sm" href="/#paso0">Ver el Paso 0</a></p>`:''}
    ${w.prices.upgrade?`<p class="hint">${esc(w.prices.upgrade)}</p>`:''}
  </section>

  <section class="sec" id="guia">
    <div class="lead">
      <div class="guidecopy">${guideNow().cover?`<img class="gcover" src="${guideNow().cover}" alt="Portada de la guía">`:''}<div><span class="eyebrow">Guía gratuita en PDF</span><h2>${em(guideNow().t)}</h2><p class="hint" style="margin-top:8px">${esc(guideNow().sub)}</p></div></div>
      ${ui('leadDone')?`<div style="display:flex;flex-direction:column;gap:10px"><p class="ok">¡Gracias! Aquí tienes tu guía.</p><a class="btn primary" href="${guideNow().pdf}" target="_blank" rel="noopener">Descargar la guía (PDF)</a></div>`:
      `<form data-form="lead"><div class="field"><span>Tu nombre</span><input id="lname" name="name" required autocomplete="given-name"></div>
        <div class="field"><span>Tu email</span><input id="lmail" name="email" type="email" required autocomplete="email"></div>
        <label class="check"><input id="lok" name="ok" type="checkbox" required> <span>He leído y acepto la <a href="/legal/privacidad">política de privacidad</a> y quiero recibir la guía y emails de Nubes de Algodón School.</span></label>
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
function planCard(k,sub,items,star,who,tag){ const p=PLANS[k];
  return `<div class="sheet plan${star?' star':''}">${star?'<span class="pill prog tag">La más elegida</span>':''}<h3>${p.t}</h3>${tag?`<p class="ptag">${esc(tag)}</p>`:''}<div class="price num">${eur(p.price)}<br><small>${esc(sub)}</small></div>${who?`<p class="for">${esc(who)}</p>`:''}<ul>${items.map(i=>`<li>${esc(i)}</li>`).join('')}</ul><button type="button" class="btn${star?' primary':''}" data-act="buy" data-arg="${k}">${CALL(k)?'Hablemos 20 minutos':'Inscribirme'}</button></div>`; }
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
      <label class="check"><input id="aok" type="checkbox" required> <span>He leído y acepto la <a href="/legal/privacidad">política de privacidad</a>.</span></label>`:
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
FORM.paso0=async f=>{ await DB.addLead(f.name,f.email,'guia',withFrom({guide:'paso0'})); ui('p0Done',true); render(); };
FORM.lead=async f=>{ await DB.addLead(f.name,f.email,'guia',withFrom({guide:guideNow().id})); ui('leadDone',true); render(); };
