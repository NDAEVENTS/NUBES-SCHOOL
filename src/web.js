// ---------- Public web (Spanish, for future students) ----------
const CONTACT='hola@nubesdealgodonevents.com';
const totalLessons=ALL_LESSONS.length;
function brand(){ return `<a class="brand" href="/" style="text-decoration:none;color:inherit"><b>Nubes de Algodón</b><span>School</span></a>`; }
function webPage(){
  return `<div class="wrap">
  <div class="nav">${brand()}
    <nav><a href="/#programa">El programa</a><a href="/#nosotras">Quiénes somos</a><a href="/#precios">Precios</a><a href="/#faq">Preguntas</a><a class="btn sm" href="/portal">Acceso alumnas</a></nav></div>

  <section class="hero">
    <div>
      <span class="eyebrow">The Wedding Creators · programa online</span>
      <h1>Aprende a organizar bodas <em>de lujo</em> con quienes las organizan cada semana.</h1>
      <p class="lede">Un método en 4 etapas para convertirte en wedding planner y montar tu propia empresa, con tutorías en directo, plantillas reales y nuestro acompañamiento hasta que lo consigas.</p>
      <div class="row cta"><a class="btn primary" href="/#precios">Ver precios y plazas</a><a class="btn" href="/#guia">Descarga la guía gratuita</a></div>
    </div>
    <div class="facts">
      <div><b class="num">10+</b><span>años organizando bodas en la Costa Brava, para parejas de todo el mundo</span></div>
      <div><b class="num">9</b><span>módulos y ${totalLessons} lecciones, de la profesión a tu primera pareja</span></div>
      <div><b class="num">12 h</b><span>de tutorías por videollamada con nosotras</span></div>
      <div><b class="num">4</b><span>semanas para recorrer el programa, y un año de acceso</span></div>
    </div>
  </section>

  <section class="sec">
    <span class="eyebrow">¿Es para ti?</span>
    <h2>Pensado para tres momentos</h2>
    <div class="who">
      <div><b>Empiezas de cero</b><span>Te apasionan las bodas y quieres convertirlo en tu profesión, con una base seria desde el primer día.</span></div>
      <div><b>Vienes de eventos u hostelería</b><span>Ya sabes de eventos. Te falta el método de wedding planning y saber vender tus servicios.</span></div>
      <div><b>Ya organizas bodas</b><span>Quieres subir de nivel: mejores tarifas, procesos de lujo y bodas destino con parejas internacionales.</span></div>
    </div>
  </section>

  <section class="sec" id="programa">
    <span class="eyebrow">El método</span>
    <h2>Cuatro etapas, una por semana</h2>
    <p class="intro">Cada semana se abre una etapa nueva con sus lecciones, ejercicios y plantillas. Al terminar cada módulo tienes tu tutoría para aplicarlo a tu proyecto. Y todo lo que construyes en los ejercicios se va guardando en tu espacio “Mi negocio”.</p>
    <div class="stages">${STAGES.map(s=>`<div class="stage"><span class="wk">Etapa ${s.n} · semana ${s.n}</span><h3>${s.t}</h3><ul>${s.mods.map(m=>`<li>${esc(MOD(m).t)}</li>`).join('')}</ul></div>`).join('')}</div>
    <div>${COURSE.map(m=>`<details class="mod"><summary><b>Módulo ${m.n}. ${esc(m.t)}</b><span class="hint">${m.lessons.length} lecciones · tutoría ${m.h} h</span></summary><ul>${m.lessons.map(l=>`<li>${esc(l.t)}</li>`).join('')}${m.exercises.map(x=>`<li>Ejercicio: ${esc(x.t)}</li>`).join('')}</ul></details>`).join('')}</div>
  </section>

  <section class="sec" id="nosotras">
    <div class="about">
      <div class="portrait">Foto de Ainoa y Pilar en una boda real</div>
      <div style="display:flex;flex-direction:column;gap:16px">
        <span class="eyebrow">Quiénes os enseñan</span>
        <h2>Ainoa y Pilar, de Nubes de Algodón Events</h2>
        <p>Llevamos más de diez años organizando bodas en la Costa Brava, y ahora también en Sicilia, para parejas que llegan de Estados Unidos y de toda Europa. Todo lo que enseñamos lo usamos cada semana: los contratos, las plantillas, la forma de presupuestar y de cuidar a cada pareja.</p>
        <blockquote>“Desde el primer día te prometemos que no soltaremos tu mano hasta que consigas tu objetivo.”</blockquote>
      </div>
    </div>
  </section>

  <section class="sec" id="precios">
    <span class="eyebrow">Precios</span>
    <h2>Elige cómo quieres hacerlo</h2>
    <p class="intro">El contenido es el mismo en las tres opciones. Cambia cuánto te acompañamos. Puedes pagar con tarjeta, Apple Pay, Google Pay o PayPal, también a plazos.</p>
    <div class="plans">
      ${planCard('online','o 3 cuotas de 197 €',['Las 4 etapas y los 9 módulos en tu portal','Todas las plantillas y descargables','Ejercicios guiados y tu espacio “Mi negocio”','1 sesión grupal de dudas al mes, en directo','Certificado al terminar'])}
      ${planCard('completo','o 6 cuotas de 332 €',['Todo lo de Online','12 h de tutorías individuales por videollamada','Feedback personal en cada ejercicio','Seguimiento de tu proyecto en “Mi negocio”'],true)}
      ${planCard('signature','plazas limitadas por edición',['Todo lo de Completo','Fin de semana de workshops y mentorías en la Costa Brava','Asistencia a un shooting real con nosotras','Módulo extra: bodas destino y clientes internacionales'])}
    </div>
    <p class="hint">¿Quieres probar primero? La Etapa 1 está disponible por 197 €, y te los descontamos si después te pasas al programa. <button type="button" class="btn sm" data-act="buy" data-arg="etapa1">Empezar con la Etapa 1</button></p>
  </section>

  <section class="sec" id="guia">
    <div class="lead">
      <div><span class="eyebrow">Guía gratuita</span><h2>Los 7 errores que hunden a una wedding planner en su primer año</h2><p class="hint" style="margin-top:8px">Y cómo evitarlos desde el principio.</p></div>
      ${ui('leadDone')?`<div style="display:flex;flex-direction:column;gap:10px"><p class="ok">¡Gracias! Aquí tienes tu guía.</p><a class="btn primary" href="/guia-wedding-planner.pdf" target="_blank" rel="noopener">Descargar la guía (PDF)</a></div>`:
      `<form data-form="lead"><div class="field"><span>Tu nombre</span><input id="lname" name="name" required autocomplete="given-name"></div>
        <div class="field"><span>Tu email</span><input id="lmail" name="email" type="email" required autocomplete="email"></div>
        <label class="check"><input id="lok" name="ok" type="checkbox" required> He leído y acepto la <a href="/legal/privacidad">política de privacidad</a> y quiero recibir la guía y emails de Nubes de Algodón School.</label>
        <button class="btn primary" type="submit">Quiero la guía</button></form>`}
    </div>
  </section>

  <section class="sec faq" id="faq">
    <span class="eyebrow">Preguntas frecuentes</span>
    <h2>Antes de empezar</h2>
    <div>
      ${faq('¿Necesito experiencia previa?','No. El programa empieza por la base de la profesión y te acompaña hasta montar tu empresa.')}
      ${faq('¿Cuánto tiempo tengo acceso?','12 meses desde la compra. Las etapas se abren una por semana y después puedes volver a cualquier lección cuando quieras.')}
      ${faq('¿Sirve si vivo fuera de España?','Sí. Es 100 % online y las tutorías son por videollamada. La parte legal explica España; en tu tutoría lo adaptamos a tu país.')}
      ${faq('¿Cómo funcionan las tutorías?','En Completo y Signature tienes 12 horas: al terminar cada módulo pides tu tutoría desde el portal y te proponemos día y hora.')}
      ${faq('¿Qué diferencia hay entre Online y Completo?','El contenido es el mismo. En Completo trabajas con nosotras: tutorías individuales, feedback personal en cada ejercicio y seguimiento de tu proyecto. En Online avanzas a tu ritmo y resuelves dudas en la sesión grupal mensual.')}
      ${faq('¿Puedo pagar a plazos?','Sí: Online en 3 cuotas mensuales de 197 € y Completo en 6 cuotas de 332 €. El acceso es completo desde el primer pago.')}
      ${faq('¿Recibo factura?','Sí, al pagar recibes la factura por email.')}
    </div>
  </section>
  <footer class="pub"><span>Nubes de Algodón School · <span style="user-select:all">${CONTACT}</span></span><span class="row"><a href="/legal/aviso-legal">Aviso legal</a><a href="/legal/privacidad">Privacidad</a><a href="/legal/cookies">Cookies</a><a href="/legal/condiciones">Condiciones de venta</a></span></footer>
  </div>${ui('buy')?buyModal():''}`;
}
function planCard(k,sub,items,star){ const p=PLANS[k];
  return `<div class="sheet plan${star?' star':''}">${star?'<span class="pill prog tag">La más elegida</span>':''}<h3>${p.t}</h3><div class="price num">${eur(p.price)}<br><small>${sub}</small></div><ul>${items.map(i=>`<li>${i}</li>`).join('')}</ul><button type="button" class="btn${star?' primary':''}" data-act="buy" data-arg="${k}">${k==='signature'?'Solicitar plaza':'Inscribirme'}</button></div>`; }
function faq(q,a){ return `<details><summary>${q}</summary><p>${a}</p></details>`; }
const INST={online:[3,197],completo:[6,332]};
function buyModal(){
  const k=ui('buy'), p=PLANS[k], sig=k==='signature';
  return `<div class="overlay"><form class="sheet pad modal" role="dialog" aria-modal="true" aria-labelledby="buyt" data-form="${sig?'apply':'buy'}">
    <span class="label">${sig?'Solicitud de plaza':'Inscripción'}</span>
    <h3 id="buyt" style="font-size:24px">The Wedding Creators · ${p.t}</h3>
    ${sig?`<p class="hint">Signature tiene plazas limitadas. Cuéntanos un poco de ti y te escribimos en 48 horas para hablar por videollamada.</p>
      <div class="field"><span>Nombre</span><input id="aname" name="name" required></div>
      <div class="field"><span>Email</span><input id="amail" name="email" type="email" required></div>
      <div class="field"><span>País</span><input id="acountry" name="country" required></div>
      <div class="field"><span>¿Por qué quieres ser wedding planner y en qué punto estás?</span><textarea id="awhy" name="why" required></textarea></div>
      <label class="check"><input id="aok" type="checkbox" required> He leído y acepto la <a href="/legal/privacidad">política de privacidad</a>.</label>`:
    `<div class="spread"><span>Total</span><b class="num">${eur2(p.price)}</b></div>
      <div class="field"><span>Tu email (será tu acceso al portal)</span><input id="bmail" name="email" type="email" required autocomplete="email"></div>
      <label class="check"><input id="bdes" type="checkbox" required> Quiero empezar ya: acepto que el acceso al contenido digital comienza al pagar y que, desde ese momento, pierdo el derecho de desistimiento de 14 días.</label>
      <label class="check"><input id="bcond" type="checkbox" required> Acepto las <a href="/legal/condiciones">condiciones de venta</a>.</label>
      ${INST[k]?`<div class="field"><span>Forma de pago</span><select id="binst" name="installments"><option value="">Pago único de ${eur(p.price)}</option><option value="1">${INST[k][0]} cuotas mensuales de ${eur(INST[k][1])}</option></select></div>`:''}
      <p class="hint">Te llevamos a la página de pago seguro de Stripe: tarjeta, Apple Pay, Google Pay o PayPal.</p>`}
    <div class="row"><button type="submit" class="btn primary" ${S.busy?'disabled':''}>${sig?'Enviar solicitud':S.busy?'Abriendo el pago…':'Ir al pago'}</button><button type="button" class="btn" data-act="closeBuy">Cancelar</button></div>
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
FORM.apply=async f=>{ await DB.addLead(f.name,f.email,'signature',{country:f.country,why:f.why}); ui('buy',null); toast('Solicitud enviada. Te escribimos en 48 horas.'); };
FORM.lead=async f=>{ await DB.addLead(f.name,f.email,'guia'); ui('leadDone',true); render(); };
