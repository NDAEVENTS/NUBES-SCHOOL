// ---------- Sign-in ----------
function authPage(){
  const mode=ui('setPass')?'set':ui('authMode')||'in';
  const T={in:['Entra en tu escuela','Con el email con el que te inscribiste.'],reset:['Recupera tu contraseña','Te enviamos un email con un enlace para crear una nueva.'],set:[ui('setPass')==='invite'?'Crea tu contraseña':'Nueva contraseña','Mínimo 8 caracteres. La usarás para entrar en tu portal.']}[mode];
  return `<div class="wrap"><div class="nav">${brand()}<nav><a href="/">Volver a la web</a></nav></div><div class="center"><form class="auth" data-form="auth_${mode}">
    <span class="eyebrow">The Wedding Creators</span><h1>${T[0]}</h1><p class="hint">${T[1]}</p>
    ${S.err?`<p class="err">${esc(S.err)}</p>`:''}${ui('authOk')?`<p class="ok">${esc(ui('authOk'))}</p>`:''}
    ${mode!=='set'?`<div class="field"><span>Email</span><input id="aemail" name="email" type="email" required autocomplete="email"></div>`:''}
    ${mode!=='reset'?`<div class="field"><span>Contraseña</span><input id="apass" name="password" type="password" required minlength="${mode==='set'?8:1}" autocomplete="${mode==='set'?'new-password':'current-password'}"></div>`:''}
    <button class="btn primary" type="submit" ${S.busy?'disabled':''}>${mode==='in'?'Entrar':mode==='reset'?'Enviar enlace':'Guardar y entrar'}</button>
    ${mode==='in'?`<button type="button" class="btn sm" style="align-self:flex-start" data-act="authMode" data-arg="reset">He olvidado mi contraseña</button>`:mode==='reset'?`<button type="button" class="btn sm" style="align-self:flex-start" data-act="authMode" data-arg="in">Volver</button>`:''}
    ${CFG.demo?`<p class="hint">En la demo, pulsa Entrar con cualquier email y contraseña.</p>`:''}
  </form></div></div>`;
}
ACT.authMode=m=>{ ui('authMode',m); S.err=''; ui('authOk',''); render(); };
FORM.auth_in=async f=>{ S.busy=true; S.err=''; render(); try{ await DB.signIn(f.email.trim(),f.password); }catch(e){ S.err=e.friendly||'No hemos podido entrar.'; } S.busy=false; if(S.user) nav(S.me.role==='nubes'?'/panel':'/portal'); else render(); };
FORM.auth_reset=async f=>{ await DB.resetPassword(f.email.trim()); ui('authOk','Si ese email está inscrito, te llegará el enlace en unos minutos.'); render(); };
FORM.auth_set=async f=>{ S.busy=true; render(); try{ await DB.setPassword(f.password); ui('setPass',null); }catch(e){ S.err=e.friendly; } S.busy=false; nav(S.me?.role==='nubes'?'/panel':'/portal'); };
ACT.signOut=async()=>{ await DB.signOut(); nav('/'); };

// ---------- Student portal ----------
const PMENU=[['','Inicio'],['formacion','Mi formación'],['ejercicios','Ejercicios'],['tutorias','Tutorías'],['agenda','Agenda'],['biblioteca','Biblioteca'],['negocio','Mi negocio'],['cuenta','Mi cuenta']];
const page=()=>S.route.replace(/^\/portal\/?/,'').split('/')[0];
function portal(){
  const me=S.me, p=plan(me), pg=page();
  if(me.plan==='paso0'&&!(me.access_until&&me.access_until<todayISO())) return p0Portal();
  if(me.access_until&&me.access_until<todayISO()) return shell(`<header><h1>Tu acceso ha terminado</h1><p>Tu año de acceso terminó el ${fdate(me.access_until)}. Si quieres ampliarlo, escríbenos a <span style="user-select:all">${CONTACT}</span>.</p></header>`);
  const menu=PMENU.filter(([k])=>!(k==='tutorias'&&!p.hours));
  const pend=allEx().filter(x=>stageOpen(me,stageOf(x.m).n)&&!S.subs[x.key]).length;
  const body=ui('lesson')?reader():({'':home,formacion,ejercicios,tutorias,agenda,biblioteca,negocio,cuenta})[pg]?.()||home();
  return shell(body,menu,pg,pend);
}
function shell(body,menu,pg,pend){
  return `${previewBar()}<div class="app"><aside class="side">${brand()}
    ${(menu||[]).map(([k,t])=>`<a class="sidelink" href="/portal${k?'/'+k:''}" aria-current="${pg===k}">${t}${k==='ejercicios'&&pend?`<span class="count">${pend}</span>`:''}</a>`).join('')}
    <div class="me">${esc(S.me.name)} · ${plan(S.me).t}<br>Acceso hasta el ${fdate(S.me.access_until,{day:'numeric',month:'numeric',year:'numeric'})}</div></aside>
    <main class="main">${body}</main></div>`;
}
function curStage(){ const me=S.me; for(const s of STAGES){ if(!stageOpen(me,s.n)) break; if(!s.mods.every(m=>MOD(m).lessons.every((_,i)=>S.progress[lessonKey(m,i)]))) return s; } return STAGES.filter(s=>stageOpen(me,s.n)).pop()||STAGES[0]; }
function nextLesson(){ for(const s of STAGES){ if(!stageOpen(S.me,s.n)) return null; for(const m of s.mods){ const i=MOD(m).lessons.findIndex((_,i)=>!S.progress[lessonKey(m,i)]); if(i>=0) return [m,i]; } } return null; }
const myLessons=()=>myStages(S.me).flatMap(s=>s.mods.flatMap(m=>MOD(m).lessons.map((_,i)=>lessonKey(m,i))));
function home(){
  const me=S.me, p=plan(me), nl=nextLesson(), mine=myLessons(), done=mine.filter(k=>S.progress[k]).length, pct=mine.length?Math.round(done/mine.length*100):0, cs=curStage();
  const nextTut=S.tuts.filter(t=>t.status==='booked'&&t.starts_at>new Date().toISOString()).sort((a,b)=>a.starts_at.localeCompare(b.starts_at))[0];
  const nextEv=S.events.filter(e=>(e.plans||[]).includes(me.plan))[0];
  const lockedNext=STAGES.find(s=>inPlan(me,s.n)&&!stageOpen(me,s.n));
  return `<header><span class="eyebrow">Etapa ${cs.n} · ${cs.t}</span><h1>Hola, ${esc(me.name.split(' ')[0])}</h1><p>${pct===100?'¡Has completado todo el programa! Enhorabuena.':nl?`Esta semana toca: ${esc(MOD(nl[0]).t.toLowerCase())}.`:lockedNext?`Has terminado lo que está abierto. La Etapa ${lockedNext.n} se abre el ${fdate(stageOpensOn(me,lockedNext.n),{weekday:'long',day:'numeric',month:'long'})}.`:''}</p></header>
  ${nl?`<div class="next"><div><span class="label">Tu siguiente paso</span><h3>Módulo ${modNo(nl[0])} · ${esc(MOD(nl[0]).lessons[nl[1]].t)}</h3></div><button type="button" class="btn" data-act="lesson" data-arg="${nl[0]}-${nl[1]}">${done?'Continuar':'Empezar'}</button></div>`:''}
  ${upgradeCard(me)}
  <div class="sheet pad"><div class="spread"><h3 style="font-size:20px">Tu progreso</h3><span class="num">${pct} %</span></div><div class="bar"><i style="width:${pct}%"></i></div>
    <div class="stagebar">${myStages(me).map(s=>{ const ks=s.mods.flatMap(m=>MOD(m).lessons.map((_,i)=>lessonKey(m,i))), d=ks.filter(k=>S.progress[k]).length; return `<div><span>Etapa ${s.n}${stageOpen(me,s.n)?'':' · se abre el '+fdate(stageOpensOn(me,s.n),{day:'numeric',month:'short'})}</span><b>${s.t}</b><div class="bar"><i style="width:${(ks.length?Math.round(d/ks.length*100):0)}%"></i></div></div>`; }).join('')}</div></div>
  <div class="grid2">
    ${p.hours?`<div class="sheet pad"><span class="label">Próxima tutoría</span>${nextTut?`<h3 style="font-size:22px">${fdt(nextTut.starts_at)}</h3><p class="hint">Módulo ${modNo(nextTut.module)} · ${nextTut.hours} h · videollamada</p>${nextTut.link?`<a class="btn sm" style="align-self:flex-start" href="${esc(nextTut.link)}" target="_blank" rel="noopener">Enlace de la videollamada</a>`:''}`:`<p class="hint">Cuando termines un módulo, pide su tutoría y te proponemos día y hora.</p><a class="btn sm" style="align-self:flex-start" href="/portal/tutorias">Ver mis tutorías</a>`}</div>`:
    `<div class="sheet pad"><span class="label">Próxima sesión de dudas</span>${nextEv?`<h3 style="font-size:22px">${fdt(nextEv.starts_at)}</h3><p class="hint">${esc(nextEv.title)}</p>`:`<p class="hint">Pronto publicaremos la próxima fecha.</p>`}<a class="btn sm" style="align-self:flex-start" href="/portal/agenda">Ver agenda</a></div>`}
    <div class="sheet pad"><span class="label">Del equipo Nubes</span>${S.notes.length?S.notes.slice(0,2).map(n=>`<div class="fb"><p>${esc(n.body)}</p><small>${esc(n.by)} · ${ago(n.created_at)}</small></div>`).join(''):`<p class="hint">Aquí verás nuestros mensajes y comentarios sobre tu proyecto.</p>`}</div>
  </div>`;
}
// Moving up: Etapa 1 students who finish their stage are offered Online; Online students who finish Etapa 2, Completo
const stageDone=(n)=>{ const st=STG(n); return !!st&&st.mods.every(m=>MOD(m).lessons.every(l=>S.progress[l.k])); };
function upgradeCard(me){
  if(me.plan==='etapa1'&&STAGES[0]&&stageDone(STAGES[0].n)) return `<div class="sheet pad up"><span class="label">Tu siguiente nivel</span><h3 style="font-size:22px">¿Seguimos? Continúa con el programa Online</h3><p class="hint">Ya has terminado la Etapa 1. Si te pasas a Online en los 60 días siguientes a tu compra, te descontamos los 197 € que pagaste.</p><a class="btn primary sm" style="align-self:flex-start" href="/#precios">Ver el programa Online</a></div>`;
  if(me.plan==='online'&&STAGES[1]&&stageDone(STAGES[1].n)) return `<div class="sheet pad up"><span class="label">Tu siguiente nivel</span><h3 style="font-size:22px">¿Quieres que revisemos tu negocio contigo?</h3><p class="hint">Ya has terminado la Etapa 2. Con Completo tienes 12 h de tutorías y feedback personal en cada ejercicio, y solo pagas la diferencia. Hablamos 20 minutos y lo vemos juntas.</p>${ui('upAsked')?`<p class="ok">¡Hecho! Te escribimos en 48 horas para agendar la llamada.</p>`:`<button type="button" class="btn primary sm" style="align-self:flex-start" data-act="askUpgrade">Quiero hablarlo</button>`}</div>`;
  return '';
}
ACT.askUpgrade=async()=>{ if(!S.realMe) await DB.addLead(S.me.name,S.me.email,'signature',{plan:'completo',why:'Alumna Online que ha terminado la Etapa 2 y quiere pasar a Completo.'}); ui('upAsked',true); render(); };
function formacion(){
  const me=S.me, p=plan(me);
  return `<header><h1>Mi formación</h1><p>Se abre una etapa nueva cada semana. Puedes volver a cualquier lección siempre que quieras.</p></header>
  ${STAGES.map(s=>{ const incl=inPlan(me,s.n), open=stageOpen(me,s.n);
    return `<section class="sheet pad${open?'':' locked'}"><span class="eyebrow">Etapa ${s.n} · semana ${Math.floor(s.opens/7)+1}</span><h2 style="font-size:26px">${s.t}</h2>
    ${!incl?`<p class="hint">Incluida en Online, Completo y Signature. <a href="/#precios">Ver cómo ampliar</a></p>`:!open?`<p class="hint">Se abre el ${fdate(stageOpensOn(me,s.n),{weekday:'long',day:'numeric',month:'long'})}.</p>`:
    s.mods.map(m=>{ const M=MOD(m), d=M.lessons.filter((_,i)=>S.progress[lessonKey(m,i)]).length;
      return `<div><div class="modhead"><h3>Módulo ${modNo(m)}. ${esc(M.t)}</h3><span class="pill ${d===M.lessons.length?'done':d?'prog':'up'}">${d===M.lessons.length?'Completado':d?`${d} de ${M.lessons.length}`:'Por empezar'}</span></div>
      ${M.lessons.map((l,i)=>{ const on=S.progress[lessonKey(m,i)]; return `<button type="button" class="lesson" data-act="lesson" data-arg="${m}-${i}"><span class="tick${on?' on':''}">${on?'✓':''}</span><b>${esc(l.t)}</b><span class="hint">${l.video?'Vídeo':'Lectura'}</span></button>`; }).join('')}
      ${M.exercises.map((x,i)=>`<a class="lesson" href="/portal/ejercicios#${exKey(m,i)}" style="text-decoration:none;color:inherit"><span class="tick${S.subs[exKey(m,i)]?' on':''}">${S.subs[exKey(m,i)]?'✓':''}</span><b>Ejercicio: ${esc(x.t)}</b><span class="hint">Ejercicio</span></a>`).join('')}</div>`; }).join('')}</section>`; }).join('')}`;
}
function blocksHTML(b){ let out='', list=false;
  b.forEach(([k,t])=>{ if(k==='li'&&!list){ out+='<ul>'; list=true; } if(k!=='li'&&list){ out+='</ul>'; list=false; }
    out+=k==='h'?`<h3>${esc(t)}</h3>`:k==='li'?`<li>${esc(t)}</li>`:`<p>${esc(t)}</p>`; });
  return out+(list?'</ul>':''); }
// YouTube, Vimeo and Loom links play inside the lesson; anything else opens in a new tab
function videoSrc(u){ let m;
  if((m=u.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/))) return 'https://www.youtube-nocookie.com/embed/'+m[1];
  if((m=u.match(/vimeo\.com\/(?:video\/)?(\d+)(?:\/(\w+))?/))) return 'https://player.vimeo.com/video/'+m[1]+(m[2]?'?h='+m[2]:'');
  if((m=u.match(/loom\.com\/(?:share|embed)\/(\w+)/))) return 'https://www.loom.com/embed/'+m[1];
  return null; }
function videoHTML(u){ const src=videoSrc(u||'');
  return src?`<div class="media video"><iframe src="${esc(src)}" title="Vídeo de la lección" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`:`<p><a class="btn sm" href="${esc(u)}" target="_blank" rel="noopener">Ver el vídeo</a></p>`; }
function reader(){
  const [m,i]=ui('lesson').split('-').map(Number), M=MOD(m), L=M.lessons[i], key=lessonKey(m,i), on=S.progress[key];
  const prev=i>0?`${m}-${i-1}`:null, next=i+1<M.lessons.length?`${m}-${i+1}`:null, last=!next;
  return `<div class="row"><button type="button" class="btn sm" data-act="closeLesson">← Mi formación</button></div>
  <article class="reader"><span class="eyebrow">Módulo ${modNo(m)} · Lección ${i+1} de ${M.lessons.length}</span><h2>${esc(L.t)}</h2>
  ${L.video?videoHTML(L.video):''}${blocksHTML(L.b||[])}
  ${(L.files||[]).length?`<div class="row">${L.files.map(f=>`<button type="button" class="btn sm" data-act="openFile" data-arg="course|${esc(f.path)}">${esc(f.name)}</button>`).join('')}</div>`:''}
  ${last?`${M.exercises.length?`<div class="tut"><b>Ahora te toca:</b> ${M.exercises.map((x,j)=>`<a href="/portal/ejercicios#${exKey(m,j)}">${esc(x.t)}</a>`).join(', ')}.</div>`:''}${plan(S.me).hours&&M.tutoria?`<div class="tut"><b>Tutoría del módulo (${M.h} h).</b> ${esc(M.tutoria)}</div>`:''}`:''}
  <div class="pager">${prev?`<button type="button" class="btn sm" data-act="lesson" data-arg="${prev}">← Anterior</button>`:'<span></span>'}
    ${on?`<span class="pill done">Lección completada</span>`:''}
    <button type="button" class="btn primary" data-act="doneLesson" data-arg="${key}">${on?(next?'Siguiente →':'Volver al módulo'):(next?'Hecha, siguiente →':'Terminar el módulo')}</button></div></article>`;
}
ACT.lesson=k=>{ const [m]=k.split('-').map(Number); if(!stageOpen(S.me,stageOf(m).n)) return toast('Esta etapa todavía no está abierta.'); if(page()!=='formacion') history.pushState({},'','/portal/formacion'); S.route=location.pathname; ui('lesson',k); render(); scrollTo(0,0); };
ACT.closeLesson=()=>{ ui('lesson',null); render(); };
ACT.doneLesson=async k=>{ const [m,i]=k.split('-').map(Number); if(!S.progress[k]){ await DB.markLesson(k); }
  const nx=i+1<MOD(m).lessons.length?`${m}-${i+1}`:null; ui('lesson',nx); render(); scrollTo(0,0);
  if(!nx){ toast(`Módulo ${modNo(m)} completado${plan(S.me).hours?'. Ya puedes pedir su tutoría.':'.'}`); } };

// ---------- Exercises ----------
const ST={draft:['up','Borrador'],sent:['wait','Entregado · en revisión'],rev:['done','Revisado']};
function ejercicios(){
  const me=S.me, fb=plan(me).feedback, open=allEx().filter(x=>stageOpen(me,stageOf(x.m).n)), sel=location.hash.slice(1);
  return `<header><h1>Ejercicios</h1><p>${fb?'Cada ejercicio construye una parte de tu empresa. Lo entregas aquí y te devolvemos feedback personal.':'Cada ejercicio construye una parte de tu empresa. Se guarda en “Mi negocio” y puedes traer tus dudas a la sesión grupal mensual.'}</p></header>
  ${open.length?open.map(x=>{ const s=S.subs[x.key], E=x.E, editing=sel===x.key||!s;
    return `<section class="sheet pad" id="${x.key}"><div class="spread"><div><span class="label">Módulo ${modNo(x.m)}</span><h3 style="font-size:22px">${esc(x.t)}</h3></div>${s?`<span class="pill ${ST[s.status][0]}">${fb?ST[s.status][1]:'Guardado'}</span>`:''}</div>
      ${s?.feedback?`<div class="fb"><p>${esc(s.feedback)}</p><small>${esc(s.feedback_by||'Equipo Nubes')} · ${ago(s.feedback_at)}</small></div>`:''}
      <details ${editing&&!s?'open':''}><summary class="hint">Ver el enunciado</summary><div class="reader" style="font-size:15px;margin-top:10px">${blocksHTML(E.b)}</div></details>
      <form data-form="ex" data-ex="${x.key}" style="display:flex;flex-direction:column;gap:10px">
        <div class="field"><span>Tu respuesta</span><textarea id="t-${x.key}" name="text" rows="6" placeholder="Escribe aquí o adjunta tu documento">${esc(s?.text||'')}</textarea></div>
        ${(s?.files||[]).length?`<div class="row">${s.files.map(f=>`<button type="button" class="btn sm" data-act="openFile" data-arg="entregas|${esc(f.path)}">${esc(f.name)}</button>`).join('')}</div>`:''}
        <div class="field"><span>Adjuntar documento o imágenes (opcional)</span><input id="f-${x.key}" name="file" type="file" multiple></div>
        <div class="row">${fb?`<button class="btn primary" type="submit" name="send" value="1">${s?.status==='sent'?'Actualizar entrega':'Entregar'}</button><button class="btn" type="submit" name="send" value="">Guardar borrador</button>`:`<button class="btn primary" type="submit">Guardar</button>`}</div>
      </form></section>`; }).join(''):`<p class="empty">Los ejercicios aparecen a medida que se abren las etapas.</p>`}`;
}
FORM.ex=async (f,form)=>{ const ex=form.dataset.ex, send=f.send==='1';
  const files=[...(S.subs[ex]?.files||[])]; for(const file of form.querySelector('input[type=file]').files) files.push(await DB.uploadFile('entregas',file));
  await DB.saveSubmission(ex,f.text,files,send&&plan(S.me).feedback); history.replaceState({},'','/portal/ejercicios'); render();
  toast(send&&plan(S.me).feedback?'Entregado. Te avisaremos cuando tengas el feedback.':'Guardado'); };
ACT.openFile=async a=>{ const [bucket,path]=a.split('|'); if(/^https?:/.test(path)) return window.open(path,'_blank','noopener'); const url=await DB.fileUrl(bucket,path); if(url) window.open(url,'_blank','noopener'); else toast('En la demo no hay archivos reales.'); };

// ---------- Tutorials ----------
function tutorias(){
  const me=S.me, total=plan(me).hours, used=S.tuts.filter(t=>t.status==='done'||t.status==='booked').reduce((a,t)=>a+(+t.hours||0),0);
  const doneMods=COURSE.filter(m=>stageOpen(me,stageOf(m.n).n)&&m.lessons.every((_,i)=>S.progress[lessonKey(m.n,i)]));
  const canAsk=doneMods.filter(m=>!S.tuts.some(t=>t.module===m.n&&t.status!=='cancelled'));
  const up=S.tuts.filter(t=>t.status==='booked'||t.status==='requested'), past=S.tuts.filter(t=>t.status==='done').reverse();
  return `<header><h1>Tutorías</h1><p>Tienes ${total} horas de tutoría individual por videollamada: una al terminar cada módulo.</p></header>
  <div class="sheet pad"><div class="spread"><h3 style="font-size:20px">Te quedan ${Math.max(0,total-used)} de ${total} horas</h3><span class="hint">Cada cuadro es 1 hora</span></div><div class="hours">${Array.from({length:total},(_,i)=>`<i class="${i<used?'used':''}"></i>`).join('')}</div></div>
  ${canAsk.length?`<form class="sheet pad" data-form="askTut"><h3 style="font-size:20px">Pedir una tutoría</h3>
    <div class="formgrid"><div class="field"><span>Módulo</span><select id="tmod" name="module">${canAsk.map(m=>`<option value="${m.n}">Módulo ${modNo(m.n)} · ${esc(m.t)} (${m.h} h)</option>`).join('')}</select></div>
    <div class="field"><span>Tu disponibilidad (días y horas, y tu zona horaria)</span><input id="tnote" name="note" placeholder="P. ej. martes y jueves por la tarde, hora de Madrid" required></div></div>
    <button class="btn primary" type="submit" style="align-self:flex-start">Pedir tutoría</button></form>`:''}
  <div class="sheet pad"><h3 style="font-size:20px">Próximas</h3>${up.length?`<div class="list">${up.map(t=>`<div class="li"><div class="t"><b style="font-weight:400">${t.starts_at?fdt(t.starts_at)+' (hora de Madrid)':'Pendiente de fecha'}</b><small>Módulo ${modNo(t.module)} · ${t.hours} h${t.note?' · Tu disponibilidad: '+esc(t.note):''}</small></div><span class="pill ${t.status==='booked'?'prog':'wait'}">${t.status==='booked'?'Reservada':'Pedida'}</span>${t.link?`<a class="btn sm" href="${esc(t.link)}" target="_blank" rel="noopener">Entrar</a>`:''}</div>`).join('')}</div>`:`<p class="empty">No tienes tutorías próximas. Termina un módulo para pedir la suya.</p>`}</div>
  <div class="sheet pad"><h3 style="font-size:20px">Hechas</h3>${past.length?`<div class="list">${past.map(t=>`<div class="li"><div class="t"><b style="font-weight:400">Módulo ${modNo(t.module)} · ${t.hours} h</b><small>${fdate(t.starts_at)}${t.summary?' · Resumen: '+esc(t.summary):''}</small></div><span class="pill done">Hecha</span></div>`).join('')}</div>`:`<p class="empty">Aquí quedará el resumen de cada tutoría.</p>`}</div>`;
}
FORM.askTut=async f=>{ await DB.requestTutorial(+f.module,f.note); render(); toast('Tutoría pedida. Te proponemos día y hora en menos de 48 horas.'); };

// ---------- Agenda ----------
function agenda(){
  const ev=S.events.filter(e=>(e.plans||[]).includes(S.me.plan));
  const K={qa:'Sesión de dudas',workshop:'Workshop',shooting:'Shooting',otro:'Evento'};
  return `<header><h1>Agenda</h1><p>Sesiones en directo y encuentros de tu programa.</p></header>
  <div class="sheet pad">${ev.length?`<div class="list">${ev.map(e=>`<div class="li"><div class="t"><b style="font-weight:400">${esc(e.title)}</b><small>${K[e.kind]||'Evento'} · ${fdt(e.starts_at)} (hora de Madrid)${e.place?' · '+esc(e.place):''}</small></div>${e.link?`<a class="btn sm" href="${esc(e.link)}" target="_blank" rel="noopener">Entrar</a>`:''}</div>`).join('')}</div>`:`<p class="empty">Todavía no hay fechas publicadas. Te avisaremos por email.</p>`}</div>`;
}

// ---------- Library ----------
function biblioteca(){
  const items=S.library.filter(l=>(l.plans||[]).includes(S.me.plan)&&stageOpen(S.me,stageOf(l.module||1).n));
  return `<header><h1>Biblioteca</h1><p>Las plantillas del programa, listas para adaptarlas a tu empresa. Aparecen a medida que se abren las etapas.</p></header>
  <div class="sheet pad">${items.length?`<div class="list">${items.map(l=>`<div class="li"><div class="t"><b style="font-weight:400">${esc(l.title)}</b><small>${esc(l.detail||'')}${l.detail?' · ':''}Módulo ${modNo(l.module)}</small></div><button type="button" class="btn sm" data-act="openFile" data-arg="course|${esc(l.path||'')}">Descargar</button></div>`).join('')}</div>`:`<p class="empty">Pronto subiremos aquí las plantillas.</p>`}</div>`;
}

// ---------- My business ----------
const BIZ_EX=[['2-e0','Cliente ideal'],['2-e1','Nombre de tu empresa'],['2-e2','DAFO'],['3-e0','Tu primer shooting'],['4-e0','La primera reunión'],['5-e0','Mood board'],['8-e0','Inspiración para tu contenido']];
function negocio(){
  const b=S.biz, c=b.calc||{m:400,a:1000,s:2500,b:17}, anual=c.m*12+c.a+c.s*12;
  const fb=plan(S.me).feedback;
  return `<header><h1>Mi negocio</h1><p>Lo que construyes en cada ejercicio se va guardando aquí. Al terminar el programa tienes tu empresa definida, paso a paso${fb?', y nosotras vemos cómo avanza':''}.</p></header>
  <div class="grid3">${BIZ_EX.filter(([k])=>allEx().some(x=>x.key===k)).map(([k,t])=>{ const s=S.subs[k], m=+k.split('-')[0], open=stageOpen(S.me,stageOf(m).n);
    return `<a class="sheet tile" href="/portal/ejercicios#${k}" style="text-decoration:none;color:inherit${open?'':';opacity:.55;pointer-events:none'}"><div class="spread"><h3>${t}</h3><span class="pill ${s?ST[s.status][0]:'up'}">${s?(fb?ST[s.status][1]:'Guardado'):open?'Por hacer':'Módulo '+modNo(m)}</span></div><p class="hint">${s?esc((s.text||'').slice(0,110))+((s.text||'').length>110?'…':''):'Se completa con el ejercicio del módulo '+modNo(m)+'.'}</p></a>`; }).join('')}</div>
  <form class="sheet pad" data-form="biz"><span class="eyebrow">Tu empresa</span>
    <div class="formgrid"><div class="field"><span>Nombre de tu empresa</span><input id="bname" name="name" value="${esc(b.name||'')}"></div><div class="field"><span>Dominio web</span><input id="bdom" name="domain" value="${esc(b.domain||'')}"></div></div>
    <div class="field"><span>Tus servicios (Módulo 5)</span><textarea id="bserv" name="services" placeholder="Organización integral, diseño, coordinación del día B…">${esc(b.services||'')}</textarea></div>
    <div class="field"><span>Tu objetivo a un año</span><textarea id="bgoal" name="goal">${esc(b.goal||'')}</textarea></div>
    <button class="btn primary" type="submit" style="align-self:flex-start">Guardar</button></form>
  <div class="sheet pad"><span class="eyebrow">Módulo 6 · calculadora</span><h3 style="font-size:22px">¿Cuánto debes cobrar por boda?</h3>
    <div class="calc">
      <label for="cm">Gastos al mes (€)<input id="cm" type="number" min="0" data-live="calc" data-k="m" value="${c.m}"></label>
      <label for="ca">Gastos al año (€)<input id="ca" type="number" min="0" data-live="calc" data-k="a" value="${c.a}"></label>
      <label for="cs">Sueldo deseado al mes (€)<input id="cs" type="number" min="0" data-live="calc" data-k="s" value="${c.s}"></label>
      <label for="cb">Bodas al año<input id="cb" type="number" min="1" data-live="calc" data-k="b" value="${c.b}"></label>
    </div>
    <div class="spread"><span class="hint">Ingresos mínimos al año: <span class="num" id="anu">${eur2(anual)}</span></span><span><span class="hint">Honorarios mínimos por boda </span><span class="result num" id="res">${eur2(anual/c.b)}</span></span></div></div>
  ${listCard('vendors','Tu base de proveedores','Módulo 2',['cat','Gremio'],['name','Proveedor'],['st','Estado'])}
  ${listCard('couples','Tus primeras parejas','Módulo 4',['name','Pareja'],['date','Fecha de boda'],['st','En qué punto estáis'])}`;
}
function listCard(k,t,mod,...cols){ const rows=S.biz[k]||[];
  return `<div class="sheet pad"><span class="eyebrow">${mod}</span><h3 style="font-size:22px">${t}</h3>
    ${rows.length?`<div class="tblwrap"><table><thead><tr>${cols.map(c=>`<th>${c[1]}</th>`).join('')}<th></th></tr></thead><tbody>${rows.map((r,i)=>`<tr>${cols.map(c=>`<td>${esc(r[c[0]]||'')}</td>`).join('')}<td><button type="button" class="btn sm" data-act="delRow" data-arg="${k}|${i}">Quitar</button></td></tr>`).join('')}</tbody></table></div>`:`<p class="empty">Todavía no hay nada.</p>`}
    <form data-form="addRow" data-k="${k}" class="formgrid" style="grid-template-columns:repeat(${cols.length},minmax(0,1fr)) auto;align-items:end">${cols.map(c=>`<div class="field"><span>${c[1]}</span><input id="${k}-${c[0]}" name="${c[0]}" ${c[0]==='name'?'required':''}></div>`).join('')}<button class="btn" type="submit">Añadir</button></form></div>`; }
let bizT; const bizSoon=()=>{ clearTimeout(bizT); bizT=setTimeout(()=>DB.saveBusiness().catch(fail),800); };
LIVE.calc=el=>{ const c=S.biz.calc=Object.assign({m:400,a:1000,s:2500,b:17},S.biz.calc); c[el.dataset.k]=Math.max(el.dataset.k==='b'?1:0,+el.value||0); const anual=c.m*12+c.a+c.s*12; $('#anu').textContent=eur2(anual); $('#res').textContent=eur2(anual/c.b); bizSoon(); };
FORM.biz=async f=>{ Object.assign(S.biz,f); await DB.saveBusiness(); toast('Guardado'); };
FORM.addRow=async (f,form)=>{ const k=form.dataset.k; (S.biz[k]=S.biz[k]||[]).push(f); await DB.saveBusiness(); render(); };
ACT.delRow=async a=>{ const [k,i]=a.split('|'); S.biz[k].splice(+i,1); await DB.saveBusiness(); render(); };

// ---------- Account ----------
function cuenta(){
  const me=S.me, p=plan(me);
  return `<header><h1>Mi cuenta</h1></header>
  <div class="sheet pad"><div class="list">
    <div class="li"><div class="t"><small>Nombre</small><b style="font-weight:400">${esc(me.name)}</b></div></div>
    <div class="li"><div class="t"><small>Email</small><b style="font-weight:400">${esc(me.email)}</b></div></div>
    <div class="li"><div class="t"><small>Programa</small><b style="font-weight:400">The Wedding Creators · ${p.t}</b></div>${me.plan==='etapa1'||me.plan==='online'?`<a class="btn sm" href="/#precios">Ampliar</a>`:''}</div>
    <div class="li"><div class="t"><small>Acceso</small><b style="font-weight:400">Del ${fdate(me.started_at)} al ${fdate(me.access_until)}</b></div></div>
  </div></div>
  <form class="sheet pad" data-form="auth_set"><h3 style="font-size:20px">Cambiar contraseña</h3><div class="field"><span>Nueva contraseña (mínimo 8 caracteres)</span><input id="npass" name="password" type="password" minlength="8" required autocomplete="new-password"></div><button class="btn" type="submit" style="align-self:flex-start">Guardar contraseña</button></form>
  <p class="hint">¿Dudas con tu acceso o tus pagos? Escríbenos a <span style="user-select:all">${CONTACT}</span>.</p>
  <div><button type="button" class="btn" data-act="signOut">Cerrar sesión</button></div>`;
}
