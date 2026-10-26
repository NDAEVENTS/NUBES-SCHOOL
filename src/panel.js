// ---------- Team panel (Ainoa and Pilar) ----------
const NMENU=[['','Hoy'],['alumnas','Alumnas'],['curso','Edición del curso'],['web','Editar landing'],['tutorias','Tutorías'],['agenda','Agenda'],['biblioteca','Biblioteca'],['leads','Leads'],['ventas','Ventas']];
const npage=()=>S.route.replace(/^\/panel\/?/,'').split('/');
const students=()=>S.members.filter(m=>m.role==='alumna');
const progOf=id=>S.allProgress.filter(p=>p.user_id===id);
const pctOf=m=>{ const mine=myStages(m).flatMap(s=>s.mods.filter(n=>forPlan(MOD(n),m.plan)).flatMap(n=>MOD(n).lessons.map((_,i)=>lessonKey(n,i)))); const done=new Set(progOf(m.user_id).map(p=>p.lesson)); return mine.length?Math.round(mine.filter(k=>done.has(k)).length/mine.length*100):0; };
const lastActive=m=>progOf(m.user_id).map(p=>p.done_at).sort().pop()||m.last_seen||m.created_at;
const stageNow=m=>{ const done=new Set(progOf(m.user_id).map(p=>p.lesson)); return (STAGES.find(s=>inPlan(m,s.n)&&!s.mods.filter(n=>forPlan(MOD(n),m.plan)).every(n=>MOD(n).lessons.every((_,i)=>done.has(lessonKey(n,i)))))||myStages(m).pop()||{n:1}).n; };
const nameOf=id=>S.members.find(m=>m.user_id===id)?.name||'Alumna';
const exTitle=k=>{ for(const m of S.cAll.mods){ const x=(m.exercises||[]).find(e=>e.k===k); if(x) return x.t; } return k; };
function attention(m){
  if(S.allSubs.some(s=>s.user_id===m.user_id&&s.status==='sent')) return ['wait','Entrega por revisar'];
  if(S.allTuts.some(t=>t.user_id===m.user_id&&t.status==='requested')) return ['prog','Pide tutoría'];
  const d=Math.floor((Date.now()-new Date(lastActive(m)))/864e5); if(d>=10) return ['due',`Sin avanzar hace ${d} días`];
  return ['done','Al día'];
}
function panel(){
  const [pg,arg,kind,k]=npage();
  const nRev=S.allSubs.filter(s=>s.status==='sent').length, nTut=S.allTuts.filter(t=>t.status==='requested').length;
  const body=({'':hoy,alumnas:()=>arg?alumnaDetail(arg):alumnas(),curso:()=>pCurso(arg,kind,k),web:pWeb,tutorias:pTutorias,agenda:pAgenda,biblioteca:pBiblioteca,leads:pLeads,ventas:pVentas})[pg||'']?.()||hoy();
  return `<div class="app"><aside class="side">${brand()}
    ${NMENU.map(([k,t])=>`<a class="sidelink" href="/panel${k?'/'+k:''}" aria-current="${(pg||'')===k}">${t}${k===''&&nRev+nTut?`<span class="count">${nRev+nTut}</span>`:''}</a>`).join('')}
    <div class="me">${esc(S.me.name)} · equipo Nubes<br><button type="button" class="btn sm" data-act="signOut" style="margin-top:8px">Cerrar sesión</button></div></aside>
    <main class="main">${body}</main></div>`;
}
function hoy(){
  const rev=S.allSubs.filter(s=>s.status==='sent'), tr=S.allTuts.filter(t=>t.status==='requested');
  const month=new Date().toISOString().slice(0,7), sales=S.purchases.filter(p=>(p.created_at||'').startsWith(month)).reduce((a,p)=>a+(+p.amount||0),0);
  const quiet=students().filter(m=>attention(m)[0]==='due');
  return `<header><h1>Hoy</h1><p>Lo que necesita a una de vosotras, lo más urgente arriba.</p></header>
  <div class="kpis"><div class="sheet"><span class="label">Alumnas activas</span><b class="num">${students().filter(m=>!m.access_until||m.access_until>=todayISO()).length}</b></div><div class="sheet"><span class="label">Ventas este mes</span><b class="num">${eur(sales)}</b></div><div class="sheet"><span class="label">Por revisar</span><b class="num">${rev.length}</b></div><div class="sheet"><span class="label">Leads este mes</span><b class="num">${S.leads.filter(l=>(l.created_at||'').startsWith(month)).length}</b></div></div>
  <div class="sheet pad"><h3 style="font-size:22px">Entregas por revisar</h3>${rev.length?rev.map(s=>reviewForm(s)).join(''):`<p class="empty">Todo revisado.</p>`}</div>
  <div class="sheet pad"><h3 style="font-size:22px">Tutorías pedidas</h3>${tr.length?tr.map(t=>tutForm(t)).join(''):`<p class="empty">No hay tutorías pendientes de fecha.</p>`}</div>
  ${quiet.length?`<div class="sheet pad"><h3 style="font-size:22px">Alumnas que se han parado</h3><div class="list">${quiet.map(m=>`<div class="li"><div class="t"><a href="/panel/alumnas/${m.user_id}">${esc(m.name)}</a><small>${esc(attention(m)[1])} · ${pctOf(m)} %</small></div></div>`).join('')}</div><p class="hint">Un mensaje corto desde su ficha suele bastar para que retomen.</p></div>`:''}`;
}
function reviewForm(s){
  return `<form class="li" data-form="review" data-id="${s.id}" style="flex-direction:column;align-items:stretch;gap:8px">
    <div class="spread"><b style="font-weight:400"><a href="/panel/alumnas/${s.user_id}">${esc(nameOf(s.user_id))}</a> · ${esc(exTitle(s.exercise))}</b><small class="hint">Entregado ${ago(s.updated_at)}</small></div>
    <p style="white-space:pre-wrap">${esc(s.text||'')}</p>
    ${(s.files||[]).length?`<div class="row">${s.files.map(f=>`<button type="button" class="btn sm" data-act="openFile" data-arg="entregas|${esc(f.path)}">${esc(f.name)}</button>`).join('')}</div>`:''}
    <div class="field"><span>Tu feedback</span><textarea id="fb-${s.id}" name="feedback" required></textarea></div>
    <button class="btn primary" type="submit" style="align-self:flex-start">Enviar feedback</button></form>`;
}
function tutForm(t){
  return `<form class="li" data-form="bookTut" data-id="${t.id}" style="flex-direction:column;align-items:stretch;gap:8px">
    <div class="spread"><b style="font-weight:400"><a href="/panel/alumnas/${t.user_id}">${esc(nameOf(t.user_id))}</a> · Módulo ${modNo(t.module)} · ${t.hours} h</b><small class="hint">Pedida ${ago(t.created_at)}</small></div>
    ${t.note?`<p class="hint">Disponibilidad: ${esc(t.note)}</p>`:''}
    <div class="formgrid"><div class="field"><span>Día y hora (hora de Madrid)</span><input id="tw-${t.id}" name="when" type="datetime-local" required></div><div class="field"><span>Enlace de la videollamada</span><input id="tl-${t.id}" name="link" type="url" placeholder="https://meet.google.com/…"></div></div>
    <button class="btn primary" type="submit" style="align-self:flex-start">Confirmar tutoría</button></form>`;
}
const madrid=v=>{ // datetime-local in Madrid time → ISO
  const [d,t]=v.split('T'); const guess=new Date(`${d}T${t}:00Z`); const off=new Date(guess.toLocaleString('en-US',{timeZone:'Europe/Madrid'}))-new Date(guess.toLocaleString('en-US',{timeZone:'UTC'})); return new Date(guess-off).toISOString(); };
FORM.review=async (f,form)=>{ const s=S.allSubs.find(x=>x.id===form.dataset.id); await DB.review(s,f.feedback); render(); toast(`Feedback enviado a ${nameOf(s.user_id)}`); };
FORM.bookTut=async (f,form)=>{ const t=S.allTuts.find(x=>x.id===form.dataset.id); Object.assign(t,{starts_at:madrid(f.when),link:f.link,status:'booked'}); await DB.saveTutorial(t); render(); toast('Tutoría confirmada. La alumna la ve en su portal.'); };

function alumnas(){
  const list=students(), f=ui('aflt')||'';
  const rows=list.filter(m=>!f||m.plan===f);
  return `<header><h1>Alumnas</h1><p>${list.length} alumnas. Pulsa en una para ver su portal: progreso, entregas, tutorías y “Mi negocio”.</p></header>
  <div class="spread"><div class="tabs">${[['','Todas'],...Object.entries(PLANS).map(([k,p])=>[k,p.t])].map(([k,t])=>`<button type="button" data-act="aflt" data-arg="${k}" aria-pressed="${f===k}">${t}</button>`).join('')}</div><button type="button" class="btn primary" data-act="modal" data-arg="invite">Añadir alumna</button></div>
  <form class="sheet pad row" data-form="asAlumna" style="align-items:end"><div class="field" style="flex:1;min-width:220px"><span>Ver el portal como una alumna nueva de nivel…</span><select id="asplan" name="plan">${Object.entries(PLANS).map(([k,p])=>`<option value="${k}" ${k==='completo'?'selected':''}>${p.t}</option>`).join('')}</select></div><button class="btn" type="submit">Ver el portal</button><p class="hint" style="flex-basis:100%">Para ver el de una alumna concreta, con su progreso, entra en su ficha y pulsa “Ver su portal”. Nada de lo que hagas en esa vista se guarda.</p></form>
  <div class="sheet pad"><div class="tblwrap"><table><thead><tr><th>Alumna</th><th>País</th><th>Nivel</th><th>Va por</th><th>Progreso</th><th>Atención</th></tr></thead><tbody>
    ${rows.map(m=>{ const a=attention(m); return `<tr class="click" data-act="go" data-arg="/panel/alumnas/${m.user_id}"><td>${esc(m.name)}<br><small class="hint">${esc(m.email)}</small></td><td>${esc(m.country||'')}</td><td>${plan(m).t}</td><td>Etapa ${stageNow(m)}</td><td class="num">${pctOf(m)} %</td><td><span class="pill ${a[0]}">${esc(a[1])}</span></td></tr>`; }).join('')||`<tr><td colspan="6" class="empty">Todavía no hay alumnas en este nivel.</td></tr>`}</tbody></table></div></div>
  ${ui('modal')==='invite'?inviteModal():''}`;
}
function inviteModal(){
  return `<div class="overlay"><form class="sheet pad modal" data-form="invite" role="dialog" aria-modal="true" aria-labelledby="invt"><h3 id="invt" style="font-size:24px">Añadir alumna</h3>
    <p class="hint">Para alumnas que pagan fuera de la web (transferencia, alumnas anteriores). Recibe un email para crear su contraseña.</p>
    <div class="field"><span>Nombre y apellido</span><input id="iname" name="name" required></div>
    <div class="field"><span>Email</span><input id="imail" name="email" type="email" required></div>
    <div class="formgrid"><div class="field"><span>Nivel</span><select id="iplan" name="plan">${Object.entries(PLANS).map(([k,p])=>`<option value="${k}" ${k==='completo'?'selected':''}>${p.t}</option>`).join('')}</select></div><div class="field"><span>País</span><input id="icountry" name="country"></div></div>
    <div class="row"><button class="btn primary" type="submit">Enviar invitación</button><button type="button" class="btn" data-act="modal" data-arg="">Cancelar</button></div></form></div>`;
}
ACT.aflt=k=>{ ui('aflt',k); render(); };
ACT.go=p=>nav(p);
ACT.modal=k=>{ ui('modal',k||null); render(); };
FORM.invite=async f=>{ await DB.invite(f); ui('modal',null); render(); toast(`Invitación enviada a ${f.email}`); };

function alumnaDetail(id){
  const m=S.members.find(x=>x.user_id===id); if(!m) return alumnas();
  const done=new Set(progOf(id).map(p=>p.lesson)), subs=S.allSubs.filter(s=>s.user_id===id), tuts=S.allTuts.filter(t=>t.user_id===id), p=plan(m);
  const used=tuts.filter(t=>t.status==='done'||t.status==='booked').reduce((a,t)=>a+(+t.hours||0),0);
  return `<div class="spread"><a class="btn sm" href="/panel/alumnas">← Alumnas</a><button type="button" class="btn sm primary" data-act="asStudent" data-arg="${id}">Ver su portal</button></div>
  <header><span class="eyebrow">${p.t} · desde el ${fdate(m.started_at)}</span><h1>${esc(m.name)}</h1><p>${esc(m.email)}${m.country?' · '+esc(m.country):''} · ${pctOf(m)} % del programa · última actividad ${ago(lastActive(m))}</p></header>
  <div class="grid2">
    <div class="sheet pad"><h3 style="font-size:20px">Progreso por módulo</h3><div class="list">${COURSE.filter(M=>inPlan(m,stageOf(M.n).n)&&forPlan(M,m.plan)).map(M=>{ const d=M.lessons.filter((_,i)=>done.has(lessonKey(M.n,i))).length; return `<div class="li"><div class="t"><b style="font-weight:400">Módulo ${modNo(M.n)}. ${esc(M.t)}</b><div class="bar" style="margin-top:6px"><i style="width:${(M.lessons.length?Math.round(d/M.lessons.length*100):0)}%"></i></div></div><span class="hint num">${d}/${M.lessons.length}</span></div>`; }).join('')}</div></div>
    <div style="display:flex;flex-direction:column;gap:18px">
      <form class="sheet pad" data-form="note" data-id="${id}"><h3 style="font-size:20px">Mensaje para su portal</h3><p class="hint">Lo ve en su Inicio, firmado por ti.</p><textarea id="note-${id}" name="body" required></textarea><button class="btn primary" type="submit" style="align-self:flex-start">Publicar</button></form>
      <form class="sheet pad" data-form="member" data-id="${id}"><h3 style="font-size:20px">Acceso</h3>
        <div class="formgrid"><div class="field"><span>Nivel</span><select id="mplan" name="plan">${Object.entries(PLANS).map(([k,x])=>`<option value="${k}" ${k===m.plan?'selected':''}>${x.t}</option>`).join('')}</select></div><div class="field"><span>Acceso hasta</span><input id="muntil" name="access_until" type="date" value="${m.access_until||''}"></div></div>
        <label class="check"><input id="munl" name="unlocked" type="checkbox" ${m.unlocked?'checked':''}> Abrir todas las etapas ya (sin esperar a cada semana)</label>
        <button class="btn" type="submit" style="align-self:flex-start">Guardar</button></form>
      ${p.hours?`<div class="sheet pad"><h3 style="font-size:20px">Tutorías: ${used} de ${p.hours} h usadas</h3>${tuts.length?`<div class="list">${tuts.map(t=>`<div class="li"><div class="t"><b style="font-weight:400">Módulo ${modNo(t.module)} · ${t.hours} h</b><small>${t.starts_at?fdt(t.starts_at):'Sin fecha'}${t.summary?' · '+esc(t.summary):''}</small></div><span class="pill ${t.status==='done'?'done':t.status==='booked'?'prog':'wait'}">${{done:'Hecha',booked:'Reservada',requested:'Pedida',cancelled:'Cancelada'}[t.status]}</span>${t.status==='booked'?`<button type="button" class="btn sm" data-act="modal" data-arg="tutdone:${t.id}">Marcar hecha</button>`:''}</div>`).join('')}</div>`:`<p class="empty">Todavía no ha pedido ninguna.</p>`}</div>`:''}
    </div>
  </div>
  <div class="sheet pad"><h3 style="font-size:20px">Ejercicios</h3>${subs.length?subs.map(s=>s.status==='sent'&&p.feedback?reviewForm(s):`<div class="li" style="flex-direction:column;align-items:stretch;gap:6px"><div class="spread"><b style="font-weight:400">${esc(exTitle(s.exercise))}</b><span class="pill ${ST[s.status][0]}">${ST[s.status][1]}</span></div><p style="white-space:pre-wrap" class="hint">${esc(s.text||'')}</p>${s.feedback?`<div class="fb"><p>${esc(s.feedback)}</p><small>${esc(s.feedback_by||'')}</small></div>`:''}</div>`).join(''):`<p class="empty">Todavía no ha entregado ejercicios.</p>`}</div>
  ${(ui('modal')||'').startsWith('tutdone:')?tutDoneModal(ui('modal').slice(8)):''}`;
}
function tutDoneModal(tid){ const t=S.allTuts.find(x=>x.id===tid);
  return `<div class="overlay"><form class="sheet pad modal" data-form="tutDone" data-id="${tid}" role="dialog" aria-modal="true" aria-labelledby="tdt"><h3 id="tdt" style="font-size:24px">Tutoría del módulo ${t.module}</h3>
    <div class="field"><span>Resumen para la alumna (qué hablasteis y sus tareas)</span><textarea id="tsum" name="summary" required></textarea></div>
    <div class="row"><button class="btn primary" type="submit">Guardar como hecha</button><button type="button" class="btn" data-act="modal" data-arg="">Cancelar</button></div></form></div>`; }
FORM.tutDone=async (f,form)=>{ const t=S.allTuts.find(x=>x.id===form.dataset.id); Object.assign(t,{status:'done',summary:f.summary}); await DB.saveTutorial(t); ui('modal',null); render(); toast('Tutoría guardada'); };
FORM.note=async (f,form)=>{ await DB.addNote(form.dataset.id,f.body); form.reset(); toast('Publicado en su portal'); };
FORM.member=async (f,form)=>{ const m=S.members.find(x=>x.user_id===form.dataset.id); await DB.updateMember(m,{plan:f.plan,access_until:f.access_until||null,unlocked:!!f.unlocked}); render(); toast('Acceso actualizado'); };

function pTutorias(){
  const up=S.allTuts.filter(t=>t.status==='booked').sort((a,b)=>a.starts_at.localeCompare(b.starts_at)), req=S.allTuts.filter(t=>t.status==='requested');
  return `<header><h1>Tutorías</h1><p>Las pedidas, para darles fecha, y las próximas.</p></header>
  <div class="sheet pad"><h3 style="font-size:20px">Pedidas</h3>${req.length?req.map(tutForm).join(''):`<p class="empty">Ninguna pendiente.</p>`}</div>
  <div class="sheet pad"><h3 style="font-size:20px">Próximas</h3>${up.length?`<div class="list">${up.map(t=>`<div class="li"><div class="t"><b style="font-weight:400">${fdt(t.starts_at)}</b><small><a href="/panel/alumnas/${t.user_id}">${esc(nameOf(t.user_id))}</a> · Módulo ${modNo(t.module)} · ${t.hours} h</small></div>${t.link?`<a class="btn sm" href="${esc(t.link)}" target="_blank" rel="noopener">Entrar</a>`:''}</div>`).join('')}</div>`:`<p class="empty">No hay tutorías reservadas.</p>`}</div>`;
}
function pAgenda(){
  const K={qa:'Sesión de dudas (grupal)',workshop:'Workshop',shooting:'Shooting',otro:'Otro'};
  return `<header><h1>Agenda</h1><p>Sesiones de dudas mensuales, workshops y shootings. Cada alumna ve solo los de su nivel.</p></header>
  <div class="sheet pad">${S.events.length?`<div class="list">${S.events.map((e,i)=>`<div class="li"><div class="t"><b style="font-weight:400">${esc(e.title)}</b><small>${K[e.kind]} · ${fdt(e.starts_at)} · ${(e.plans||[]).map(p=>PLANS[p]?.t).join(', ')}</small></div><button type="button" class="btn sm" data-act="delEvent" data-arg="${i}">Quitar</button></div>`).join('')}</div>`:`<p class="empty">No hay nada programado.</p>`}</div>
  <form class="sheet pad" data-form="event"><h3 style="font-size:20px">Añadir a la agenda</h3>
    <div class="formgrid"><div class="field"><span>Tipo</span><select id="ekind" name="kind">${Object.entries(K).map(([k,t])=>`<option value="${k}">${t}</option>`).join('')}</select></div><div class="field"><span>Título</span><input id="etitle" name="title" required placeholder="Sesión de dudas de diciembre"></div>
    <div class="field"><span>Día y hora (hora de Madrid)</span><input id="ewhen" name="when" type="datetime-local" required></div><div class="field"><span>Enlace o lugar</span><input id="elink" name="link" placeholder="https://meet.google.com/… o la dirección"></div></div>
    <div class="row">${Object.entries(PLANS).map(([k,p])=>`<label class="check"><input type="checkbox" name="p_${k}" ${k!=='etapa1'?'checked':''}> ${p.t}</label>`).join('')}</div>
    <button class="btn primary" type="submit" style="align-self:flex-start">Añadir</button></form>`;
}
FORM.event=async (f,form)=>{ const link=/^https?:/.test(f.link)?f.link:''; const ev={id:crypto.randomUUID(),kind:f.kind,title:f.title,starts_at:madrid(f.when),link,place:link?'':f.link,plans:Object.keys(PLANS).filter(k=>f['p_'+k])};
  await DB.saveEvent(ev); S.events.sort((a,b)=>a.starts_at.localeCompare(b.starts_at)); render(); toast('Añadido a la agenda'); };
ACT.delEvent=async i=>{ await DB.deleteEvent(S.events[+i]); render(); };
function pBiblioteca(){
  return `<header><h1>Biblioteca</h1><p>Las plantillas que descargan las alumnas. Cada una aparece cuando se abre la etapa de su módulo.</p></header>
  <div class="sheet pad">${S.library.length?`<div class="list">${S.library.map((l,i)=>`<div class="li"><div class="t"><b style="font-weight:400">${esc(l.title)}</b><small>Módulo ${modNo(l.module)}${l.detail?' · '+esc(l.detail):''}${l.path?'':' · falta subir el archivo'}</small></div>${l.path?`<button type="button" class="btn sm" data-act="openFile" data-arg="course|${esc(l.path)}">Ver</button>`:''}<button type="button" class="btn sm" data-act="delLib" data-arg="${i}">Quitar</button></div>`).join('')}</div>`:`<p class="empty">Todavía no hay plantillas.</p>`}</div>
  <form class="sheet pad" data-form="lib"><h3 style="font-size:20px">Subir plantilla</h3>
    <div class="formgrid"><div class="field"><span>Título</span><input id="ltitle" name="title" required></div><div class="field"><span>Detalle (opcional)</span><input id="ldetail" name="detail" placeholder="Word, hoja de cálculo…"></div>
    <div class="field"><span>Módulo</span><select id="lmod" name="module">${S.cAll.mods.map(m=>`<option value="${m.n}">Módulo ${modNo(m.n)} · ${esc(m.title)}</option>`).join('')}</select></div><div class="field"><span>Archivo</span><input id="lfile" name="file" type="file" required></div></div>
    <button class="btn primary" type="submit" style="align-self:flex-start">Subir</button></form>`;
}
FORM.lib=async (f,form)=>{ const file=form.querySelector('#lfile').files[0]; const mod=+f.module;
  await DB.addLibrary({id:crypto.randomUUID(),title:f.title,detail:f.detail,module:mod,plans:Object.keys(PLANS).filter(k=>inPlan({plan:k},stageOf(mod).n))},file); render(); toast('Plantilla subida'); };
ACT.delLib=async i=>{ await DB.deleteLibrary(S.library[+i]); render(); };
function pLeads(){
  const sig=S.leads.filter(l=>l.source==='signature'), g=S.leads.filter(l=>l.source!=='signature');
  return `<header><h1>Leads</h1><p>Solicitudes de Signature y personas que han descargado la guía gratuita.</p></header>
  <div class="sheet pad"><h3 style="font-size:20px">Solicitudes Signature</h3>${sig.length?`<div class="list">${sig.map(l=>`<div class="li" style="align-items:flex-start"><div class="t"><b style="font-weight:400">${esc(l.name)} · <span style="user-select:all">${esc(l.email)}</span></b><small>${esc(l.extra?.country||'')} · ${ago(l.created_at)}</small><p class="hint" style="margin-top:4px">${esc(l.extra?.why||'')}</p></div><button type="button" class="btn sm" data-act="payLink" data-arg="${esc(l.email)}">Crear enlace de pago</button></div>`).join('')}</div>`:`<p class="empty">Ninguna solicitud todavía.</p>`}
    ${ui('payLink')?`<div class="field"><span>Enlace de pago Signature para enviarle</span><input id="plink" readonly value="${esc(ui('payLink'))}"></div><button type="button" class="btn sm" data-act="copy" data-arg="plink" style="align-self:flex-start">Copiar enlace</button>`:''}</div>
  <div class="sheet pad"><div class="spread"><h3 style="font-size:20px">Guía gratuita · ${g.length}</h3>${g.length?`<button type="button" class="btn sm" data-act="copyEmails">Copiar todos los emails</button>`:''}</div>
    ${g.length?`<div class="tblwrap"><table><thead><tr><th>Nombre</th><th>Email</th><th>Fecha</th><th>¿Alumna?</th></tr></thead><tbody>${g.map(l=>`<tr><td>${esc(l.name)}</td><td>${esc(l.email)}</td><td>${fdate(l.created_at,{day:'numeric',month:'short'})}</td><td>${S.members.some(m=>m.email===l.email)?'<span class="pill done">Sí</span>':''}</td></tr>`).join('')}</tbody></table></div>`:`<p class="empty">Todavía no hay descargas.</p>`}</div>`;
}
ACT.payLink=async email=>{ ui('payLink',await DB.paymentLink('signature',email)); render(); };
ACT.copy=id=>{ const el=document.getElementById(id); navigator.clipboard?.writeText(el.value).then(()=>toast('Copiado'),()=>{ el.select(); }); };
ACT.copyEmails=()=>{ const t=S.leads.filter(l=>l.source!=='signature').map(l=>l.email).join(', '); navigator.clipboard?.writeText(t).then(()=>toast('Emails copiados'),()=>toast('No se ha podido copiar')); };
function pVentas(){
  const tot=S.purchases.reduce((a,p)=>a+(+p.amount||0),0);
  return `<header><h1>Ventas</h1><p>Cada pago completado en la web. Las facturas y los cobros a plazos se ven en Stripe.</p></header>
  <div class="sheet pad"><div class="spread"><h3 style="font-size:20px">Total</h3><span class="result num">${eur(tot)}</span></div>
  ${S.purchases.length?`<div class="tblwrap"><table><thead><tr><th>Fecha</th><th>Email</th><th>Nivel</th><th>Pago</th><th>Importe</th></tr></thead><tbody>${S.purchases.map(p=>`<tr><td>${fdate(p.created_at,{day:'numeric',month:'short',year:'numeric'})}</td><td>${esc(p.email)}</td><td>${PLANS[p.plan]?.t||esc(p.plan)}</td><td>${p.installments>1?p.installments+' cuotas':'Único'}</td><td class="num">${eur(p.amount)}</td></tr>`).join('')}</tbody></table></div>`:`<p class="empty">Todavía no hay ventas.</p>`}</div>`;
}

// ---------- Seeing the portal as a student ----------
// The team member becomes a pretend student of the chosen level: same course, agenda and library a student of that
// level would see, empty progress, and nothing she does is saved (see S.realMe in sync.js)
FORM.asAlumna=f=>asAlumna(f.plan,true);
function asAlumna(planKey,open){
  if(!S.realMe){ S.realMe=S.me; S.panelState={progress:S.progress,subs:S.subs,tuts:S.tuts,biz:S.biz,notes:S.notes}; }
  S.coursePlan=planKey; setCourse(S.cAll.stages,S.cAll.mods);
  S.me={user_id:S.realMe.user_id,role:'alumna',name:S.realMe.name,email:S.realMe.email,plan:planKey,started_at:todayISO(),access_until:addDays(todayISO(),365),unlocked:open};
  S.progress={}; S.subs={}; S.tuts=[]; S.biz={}; S.notes=[{id:'preview',body:'Aquí verá la alumna los mensajes que le escribáis desde su ficha.',by:S.realMe.name,created_at:new Date().toISOString()}];
  ui('lesson',null); nav('/portal');
}
// One real student's portal, with her progress, answers and tutorials (read only)
ACT.asStudent=async id=>{ const m=S.members.find(x=>x.user_id===id); if(!m) return;
  if(!S.realMe){ S.realMe=S.me; S.panelState={progress:S.progress,subs:S.subs,tuts:S.tuts,biz:S.biz,notes:S.notes}; }
  const extra=await DB.studentExtra(id);
  S.coursePlan=m.plan; setCourse(S.cAll.stages,S.cAll.mods);
  S.me=Object.assign({},m,{viewing:true}); S.progress=Object.fromEntries(S.allProgress.filter(p=>p.user_id===id).map(p=>[p.lesson,p.done_at]));
  S.subs=Object.fromEntries(S.allSubs.filter(x=>x.user_id===id).map(x=>[x.exercise,x])); S.tuts=S.allTuts.filter(t=>t.user_id===id); S.biz=extra.biz; S.notes=extra.notes;
  ui('lesson',null); nav('/portal'); };
ACT.asPlan=k=>asAlumna(k,S.me.unlocked);
ACT.asOpen=v=>asAlumna(S.me.plan,v==='1');
ACT.exitAlumna=()=>{ S.coursePlan=null; setCourse(S.cAll.stages,S.cAll.mods); const back=S.me.viewing?'/panel/alumnas/'+S.me.user_id:'/panel/alumnas'; S.me=S.realMe; S.realMe=null; Object.assign(S,S.panelState); ui('lesson',null); nav(back); };
function previewBar(){ if(!S.realMe) return '';
  if(S.me.viewing) return `<div class="demo-note">Estás viendo el portal de <b>${esc(S.me.name)}</b> (${plan(S.me).t}) tal como lo ve ella. Nada de lo que hagas aquí se guarda. <button type="button" class="btn sm primary" data-act="exitAlumna">Volver a su ficha</button></div>`;
  return `<div class="demo-note">Estás viendo el portal como una alumna nueva de nivel <b>${plan(S.me).t}</b>. Nada de lo que hagas aquí se guarda.
    ${Object.entries(PLANS).map(([k,p])=>`<button type="button" class="btn sm" data-act="asPlan" data-arg="${k}" aria-pressed="${S.me.plan===k}">${p.t}</button>`).join('')}
    <button type="button" class="btn sm" data-act="asOpen" data-arg="${S.me.unlocked?'':'1'}">${S.me.unlocked?'Verlo como el primer día':'Abrir todas las etapas'}</button>
    <button type="button" class="btn sm primary" data-act="exitAlumna">Volver al panel</button></div>`; }
