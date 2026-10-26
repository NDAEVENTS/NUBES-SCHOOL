// ---------- Panel → Edición del curso: the team organises stages and modules and writes lessons and exercises ----------
// Everything is saved to course_stages / course_modules and students see it the next time they open the portal.
// Lesson text is plain writing: a blank line starts a new paragraph, "## " a subheading and "- " a bullet point.
function blocksToText(b){ return (b||[]).map(([k,t],i,a)=>(i?(k==='li'&&a[i-1][0]==='li'?'\n':'\n\n'):'')+(k==='h'?'## ':k==='li'?'- ':'')+t).join(''); }
function textToBlocks(txt){
  const out=[]; let para=[]; const flush=()=>{ if(para.length) out.push(['p',para.join(' ')]); para=[]; };
  String(txt||'').split(/\r?\n/).forEach(raw=>{ const l=raw.trim();
    if(!l) return flush();
    let m; if((m=l.match(/^#{1,3}\s+(.*)$/))){ flush(); out.push(['h',m[1]]); }
    else if((m=l.match(/^[-•*]\s+(.*)$/))){ flush(); out.push(['li',m[1]]); }
    else para.push(l); });
  flush(); return out;
}
const cMod=n=>S.cAll.mods.find(m=>m.n===+n);
const cStageMods=n=>S.cAll.mods.filter(m=>m.stage===n).sort((a,b)=>a.position-b.position);
const cNo=n=>{ const i=S.cAll.stages.flatMap(s=>cStageMods(s.n)).findIndex(m=>m.n===+n); return i+1; };   // its number, hidden modules included
const doneBy=k=>new Set(S.allProgress.filter(p=>p.lesson===k).map(p=>p.user_id)).size;
const sentBy=k=>S.allSubs.filter(s=>s.exercise===k).length;
const opensTxt=d=>+d?`se abre el día ${+d} de su programa (semana ${Math.floor(d/7)+1})`:'abierta desde el primer día';
const FORMAT_HINT='Escribe como en un email: deja una línea en blanco para empezar un párrafo nuevo, empieza la línea con “## ” para un subtítulo y con “- ” para una viñeta.';

function pCurso(arg,kind,k){
  if(arg&&cMod(arg)){ if(kind==='l') return pLesson(cMod(arg),k); if(kind==='e') return pExercise(cMod(arg),k); return pModule(cMod(arg)); }
  const st=S.cAll.stages;
  return `<header><h1>Edición del curso</h1><p>Así se organiza The Wedding Creators en el portal de las alumnas. Ordenad etapas y módulos, y entrad en cada módulo para escribir sus lecciones, añadir vídeos y archivos, y preparar sus ejercicios. Lo que guardáis lo ven al momento.</p></header>
  ${st.length?'':`<div class="sheet pad"><p class="empty">Todavía no hay curso en la base de datos. Ejecuta <b>supabase/curso.sql</b> en Supabase (lo explica la guía) para importar el temario.</p></div>`}
  ${st.map(s=>{ const ms=cStageMods(s.n);
    return `<section class="sheet pad">
      <form class="formgrid" data-form="stage" data-n="${s.n}" style="align-items:end">
        <div class="field"><span>Etapa ${s.n} · título</span><input id="st-${s.n}" name="title" value="${esc(s.title)}" required></div>
        <div class="field"><span>Se abre a los … días de empezar (0 = el primer día)</span><input id="so-${s.n}" name="opens" type="number" min="0" max="365" value="${+s.opens||0}" required></div>
        <div class="row"><button class="btn sm" type="submit">Guardar etapa</button>${ms.length?'':`<button type="button" class="btn sm" data-act="delStage" data-arg="${s.n}">Quitar etapa</button>`}</div>
      </form>
      <p class="hint">Para cada alumna, esta etapa ${opensTxt(s.opens)}.${s.n===st[0].n?' Es la que incluye el nivel Etapa 1.':''}</p>
      <div class="list">${ms.map((m,i)=>{ const dr=(m.lessons||[]).filter(l=>l.draft).length;
        return `<div class="li"><div class="t"><a href="/panel/curso/${m.n}"><b style="font-weight:400">Módulo ${cNo(m.n)}. ${esc(m.title)}</b></a>
          <small>${(m.lessons||[]).length} lecciones · ${(m.exercises||[]).length} ejercicios · tutoría ${+m.hours||0} h${dr?` · ${dr} en borrador`:''}</small></div>
          ${m.published===false?`<span class="pill wait">Oculto</span>`:''}
          <div class="row"><button type="button" class="btn sm" data-act="modMove" data-arg="${m.n}|-1" ${i?'':'disabled'} aria-label="Subir">↑</button><button type="button" class="btn sm" data-act="modMove" data-arg="${m.n}|1" ${i<ms.length-1?'':'disabled'} aria-label="Bajar">↓</button><a class="btn sm" href="/panel/curso/${m.n}">Editar</a></div></div>`; }).join('')||`<p class="empty">Esta etapa todavía no tiene módulos.</p>`}</div>
      <button type="button" class="btn sm" data-act="addMod" data-arg="${s.n}" style="align-self:flex-start">+ Añadir módulo a esta etapa</button>
    </section>`; }).join('')}
  ${st.length?`<button type="button" class="btn" data-act="addStage" style="align-self:flex-start">+ Añadir etapa</button>
  <div class="sheet pad"><h3 style="font-size:20px">Cómo lo ven las alumnas</h3><p class="hint">Cada etapa se abre sola los días que marquéis, contando desde que empieza cada alumna (podéis abrírselo todo desde su ficha). Los módulos ocultos y las lecciones en borrador no se ven en el portal ni en la web. El temario de la web pública se actualiza con los títulos que pongáis aquí.</p></div>`:''}`;
}
FORM.stage=async (f,form)=>{ const s=S.cAll.stages.find(x=>x.n===+form.dataset.n); Object.assign(s,{title:f.title.trim(),opens:Math.max(0,+f.opens||0)}); await DB.saveStage(s); render(); toast('Etapa guardada'); };
ACT.addStage=async()=>{ const st=S.cAll.stages, last=st[st.length-1]; const s={n:Math.max(0,...st.map(x=>x.n))+1,title:'Nueva etapa',opens:last?(+last.opens||0)+7:0};
  await DB.saveStage(s); render(); toast('Etapa añadida. Ponle título y añade sus módulos.'); };
ACT.delStage=async n=>{ const s=S.cAll.stages.find(x=>x.n===+n); if(cStageMods(s.n).length) return toast('Mueve antes sus módulos a otra etapa.'); await DB.deleteStage(s); render(); };
ACT.addMod=async stage=>{ stage=+stage; const m={n:Math.max(0,...S.cAll.mods.map(x=>x.n))+1,stage,position:cStageMods(stage).length,title:'Nuevo módulo',hours:1,tutoria:'',published:false,lessons:[],exercises:[]};
  await DB.saveModule(m); nav('/panel/curso/'+m.n); toast('Módulo creado. Está oculto hasta que lo marquéis como visible.'); };
// Swap a module with its neighbour in the stage and renumber the positions
ACT.modMove=async a=>{ const [n,d]=a.split('|').map(Number), m=cMod(n), ms=cStageMods(m.stage), i=ms.indexOf(m), j=i+d; if(j<0||j>=ms.length) return;
  [ms[i],ms[j]]=[ms[j],ms[i]]; for(const [p,x] of ms.entries()) if(x.position!==p){ x.position=p; await DB.saveModule(x); } render(); };

function pModule(m){
  const st=S.cAll.stages.find(s=>s.n===m.stage);
  return `<div class="row"><a class="btn sm" href="/panel/curso">← Edición del curso</a></div>
  <header><span class="eyebrow">Etapa ${m.stage}${st?' · '+esc(st.title):''}</span><h1>Módulo ${cNo(m.n)}. ${esc(m.title)}</h1><p>${m.published===false?'Oculto: las alumnas todavía no lo ven.':'Visible en el portal.'}${m.updated_by?` Última edición: ${esc(m.updated_by)}, ${ago(m.updated_at)}.`:''}</p></header>
  <form class="sheet pad" data-form="mod" data-n="${m.n}">
    <div class="formgrid"><div class="field"><span>Título del módulo</span><input id="mt" name="title" value="${esc(m.title)}" required></div>
      <div class="field"><span>Etapa</span><select id="ms" name="stage">${S.cAll.stages.map(s=>`<option value="${s.n}" ${s.n===m.stage?'selected':''}>Etapa ${s.n} · ${esc(s.title)}</option>`).join('')}</select></div>
      <div class="field"><span>Horas de tutoría (Completo y Signature)</span><input id="mh" name="hours" type="number" min="0" max="12" step="0.5" value="${+m.hours||0}"></div></div>
    <div class="field"><span>Texto de la tutoría (lo ven al terminar el módulo)</span><textarea id="mtu" name="tutoria" rows="3">${esc(m.tutoria||'')}</textarea></div>
    <label class="check"><input id="mp" name="published" type="checkbox" ${m.published===false?'':'checked'}> Visible para las alumnas</label>
    <button class="btn primary" type="submit" style="align-self:flex-start">Guardar módulo</button></form>
  ${itemList(m,'l')}${itemList(m,'e')}
  <div class="sheet pad"><h3 style="font-size:20px">Quitar el módulo</h3>${(m.lessons||[]).length||(m.exercises||[]).length?`<p class="hint">Para que deje de verse, desmarca “Visible para las alumnas”. Solo se puede eliminar un módulo vacío, para no perder el progreso de nadie.</p>`:`<button type="button" class="btn sm" data-act="delMod" data-arg="${m.n}" style="align-self:flex-start">Eliminar módulo</button>`}</div>`;
}
// Lessons (l) or exercises (e) of a module, with order and status
function itemList(m,kind){
  const items=kind==='l'?(m.lessons||[]):(m.exercises||[]), L=kind==='l';
  return `<div class="sheet pad"><div class="spread"><h3 style="font-size:20px">${L?'Lecciones':'Ejercicios'}</h3><button type="button" class="btn sm" data-act="addItem" data-arg="${m.n}|${kind}">+ Añadir ${L?'lección':'ejercicio'}</button></div>
    <div class="list">${items.map((x,i)=>{ const who=L?doneBy(x.k):sentBy(x.k);
      return `<div class="li"><div class="t"><a href="/panel/curso/${m.n}/${kind}/${x.k}"><b style="font-weight:400">${i+1}. ${esc(x.t)}</b></a>
        <small>${L?[x.video?'Vídeo':'Lectura',(x.files||[]).length?`${x.files.length} archivo${x.files.length>1?'s':''}`:'',who?`${who} alumna${who>1?'s':''} la han hecho`:''].filter(Boolean).join(' · '):(who?`${who} entrega${who>1?'s':''}`:'Sin entregas todavía')}</small></div>
        ${x.draft?`<span class="pill up">Borrador</span>`:''}
        <div class="row"><button type="button" class="btn sm" data-act="itemMove" data-arg="${m.n}|${kind}|${i}|-1" ${i?'':'disabled'} aria-label="Subir">↑</button><button type="button" class="btn sm" data-act="itemMove" data-arg="${m.n}|${kind}|${i}|1" ${i<items.length-1?'':'disabled'} aria-label="Bajar">↓</button><a class="btn sm" href="/panel/curso/${m.n}/${kind}/${x.k}">Editar</a></div></div>`; }).join('')||`<p class="empty">Todavía no hay ${L?'lecciones':'ejercicios'}.</p>`}</div></div>`;
}
FORM.mod=async (f,form)=>{ const m=cMod(form.dataset.n), stage=+f.stage;
  if(stage!==m.stage){ m.position=cStageMods(stage).length; }
  Object.assign(m,{title:f.title.trim(),stage,hours:Math.max(0,+f.hours||0),tutoria:f.tutoria.trim(),published:!!f.published}); await DB.saveModule(m); render(); toast('Módulo guardado'); };
ACT.delMod=async n=>{ const m=cMod(n); if((m.lessons||[]).length||(m.exercises||[]).length) return; await DB.deleteModule(m); nav('/panel/curso'); toast('Módulo eliminado'); };
ACT.addItem=async a=>{ const [n,kind]=a.split('|'), m=cMod(n), L=kind==='l';
  const x={k:`${m.n}-${L?'':'e'}${uid('n')}`,t:L?'Nueva lección':'Nuevo ejercicio',b:[],draft:true};
  (L?(m.lessons=m.lessons||[]):(m.exercises=m.exercises||[])).push(x); await DB.saveModule(m); nav(`/panel/curso/${m.n}/${kind}/${x.k}`); };
ACT.itemMove=async a=>{ const [n,kind,i,d]=a.split('|'), m=cMod(n), arr=kind==='l'?m.lessons:m.exercises, j=+i+ +d; if(j<0||j>=arr.length) return;
  [arr[+i],arr[j]]=[arr[j],arr[+i]]; await DB.saveModule(m); render(); };

function itemOf(m,kind,k){ return (kind==='l'?m.lessons:m.exercises||[]).find(x=>x.k===k); }
function pLesson(m,k){
  const L=itemOf(m,'l',k); if(!L) return pModule(m);
  const i=m.lessons.indexOf(L), who=doneBy(k);
  return `<div class="row"><a class="btn sm" href="/panel/curso/${m.n}">← Módulo ${cNo(m.n)}. ${esc(m.title)}</a></div>
  <header><span class="eyebrow">Módulo ${cNo(m.n)} · Lección ${i+1} de ${m.lessons.length}</span><h1>${esc(L.t)}</h1><p>${L.draft?'En borrador: las alumnas todavía no la ven.':'Publicada.'}${who?` ${who} alumna${who>1?'s':''} ya la ${who>1?'han':'ha'} completado.`:''}</p></header>
  <form class="sheet pad" data-form="lesson" data-n="${m.n}" data-k="${k}">
    <div class="field"><span>Título</span><input id="lt" name="t" value="${esc(L.t)}" required></div>
    <div class="field"><span>Vídeo (opcional): enlace de YouTube, Vimeo o Loom</span><input id="lv" name="video" type="url" value="${esc(L.video||'')}" placeholder="https://youtu.be/…"></div>
    <p class="hint">En YouTube sube el vídeo como “No listado” para que solo lo vean las alumnas desde el portal.</p>
    <div class="field"><span>Texto de la lección</span><textarea id="lb" name="text" rows="18">${esc(blocksToText(L.b))}</textarea></div>
    <p class="hint">${FORMAT_HINT}</p>
    <label class="check"><input id="ld" name="draft" type="checkbox" ${L.draft?'checked':''}> Borrador (las alumnas no la ven todavía)</label>
    <div class="row"><button class="btn primary" type="submit">Guardar lección</button><button class="btn" type="submit" name="preview" value="1">Guardar y ver como alumna</button></div></form>
  <form class="sheet pad" data-form="lessonFile" data-n="${m.n}" data-k="${k}"><h3 style="font-size:20px">Archivos de la lección</h3>
    ${(L.files||[]).length?`<div class="list">${L.files.map((f,j)=>`<div class="li"><div class="t"><b style="font-weight:400">${esc(f.name)}</b></div><button type="button" class="btn sm" data-act="openFile" data-arg="course|${esc(f.path)}">Ver</button><button type="button" class="btn sm" data-act="delLessonFile" data-arg="${m.n}|${k}|${j}">Quitar</button></div>`).join('')}</div>`:`<p class="hint">PDF, plantillas o imágenes que la alumna descarga desde esta lección. Las plantillas generales van en Biblioteca.</p>`}
    <div class="field"><span>Añadir archivo</span><input id="lfu" name="file" type="file" required></div>
    <button class="btn sm" type="submit" style="align-self:flex-start">Subir</button></form>
  ${ui('preview')===k?`<div class="sheet pad"><span class="label">Vista previa · así lo ve la alumna</span><article class="reader"><h2>${esc(L.t)}</h2>${L.video?videoHTML(L.video):''}${blocksHTML(L.b||[])}</article></div>`:''}
  ${delBox(m,'l',k,who?`${who} alumna${who>1?'s':''} ya la ${who>1?'han':'ha'} completado; al eliminarla desaparece de su progreso. Si solo quieres esconderla, márcala como borrador.`:'')}`;
}
function pExercise(m,k){
  const E=itemOf(m,'e',k); if(!E) return pModule(m);
  const who=sentBy(k), biz=BIZ_EX.find(([x])=>x===k);
  return `<div class="row"><a class="btn sm" href="/panel/curso/${m.n}">← Módulo ${cNo(m.n)}. ${esc(m.title)}</a></div>
  <header><span class="eyebrow">Módulo ${cNo(m.n)} · Ejercicio</span><h1>${esc(E.t)}</h1><p>${E.draft?'En borrador: las alumnas todavía no lo ven.':'Publicado.'}${who?` ${who} entrega${who>1?'s':''}.`:''}${biz?` Aparece también en “Mi negocio” como “${esc(biz[1])}”.`:''}</p></header>
  <form class="sheet pad" data-form="exercise" data-n="${m.n}" data-k="${k}">
    <div class="field"><span>Título</span><input id="et" name="t" value="${esc(E.t)}" required></div>
    <div class="field"><span>Enunciado</span><textarea id="eb" name="text" rows="14">${esc(blocksToText(E.b))}</textarea></div>
    <p class="hint">${FORMAT_HINT}</p>
    <label class="check"><input id="ed" name="draft" type="checkbox" ${E.draft?'checked':''}> Borrador (las alumnas no lo ven todavía)</label>
    <button class="btn primary" type="submit" style="align-self:flex-start">Guardar ejercicio</button></form>
  ${delBox(m,'e',k,who?`Hay ${who} entrega${who>1?'s':''}; las respuestas se conservan, pero las alumnas dejarán de ver el ejercicio.`:'')}`;
}
function delBox(m,kind,k,warn){ const asking=ui('confirmDel')===k;
  return `<div class="sheet pad"><h3 style="font-size:20px">Eliminar</h3>${warn?`<p class="hint">${warn}</p>`:''}
    <div class="row">${asking?`<button type="button" class="btn sm" data-act="delItem" data-arg="${m.n}|${kind}|${k}">Sí, eliminar definitivamente</button><button type="button" class="btn sm" data-act="confirmDel" data-arg="">Cancelar</button>`:`<button type="button" class="btn sm" data-act="confirmDel" data-arg="${k}">Eliminar ${kind==='l'?'lección':'ejercicio'}</button>`}</div></div>`; }
ACT.confirmDel=k=>{ ui('confirmDel',k||null); render(); };
ACT.delItem=async a=>{ const [n,kind,k]=a.split('|'), m=cMod(n), x=itemOf(m,kind,k);
  if(kind==='l'){ m.lessons=m.lessons.filter(l=>l!==x); for(const f of x.files||[]) await DB.removeCourseFile(f.path); } else m.exercises=m.exercises.filter(e=>e!==x);
  ui('confirmDel',null); await DB.saveModule(m); nav('/panel/curso/'+m.n); toast(kind==='l'?'Lección eliminada':'Ejercicio eliminado'); };
FORM.lesson=async (f,form)=>{ const m=cMod(form.dataset.n), L=itemOf(m,'l',form.dataset.k);
  Object.assign(L,{t:f.t.trim(),b:textToBlocks(f.text),draft:!!f.draft}); if(f.video.trim()) L.video=f.video.trim(); else delete L.video;
  await DB.saveModule(m); ui('preview',f.preview?L.k:null); render(); toast('Lección guardada');
  if(f.preview) document.querySelector('.reader')?.scrollIntoView({behavior:'smooth'}); };
FORM.exercise=async (f,form)=>{ const m=cMod(form.dataset.n), E=itemOf(m,'e',form.dataset.k);
  Object.assign(E,{t:f.t.trim(),b:textToBlocks(f.text),draft:!!f.draft}); await DB.saveModule(m); render(); toast('Ejercicio guardado'); };
FORM.lessonFile=async (f,form)=>{ const m=cMod(form.dataset.n), L=itemOf(m,'l',form.dataset.k), file=form.querySelector('input[type=file]').files[0]; if(!file) return;
  const up=await DB.uploadFile('course',file); (L.files=L.files||[]).push(up); await DB.saveModule(m); render(); toast('Archivo subido'); };
ACT.delLessonFile=async a=>{ const [n,k,j]=a.split('|'), m=cMod(n), L=itemOf(m,'l',k), [f]=L.files.splice(+j,1);
  await DB.removeCourseFile(f.path); await DB.saveModule(m); render(); toast('Archivo quitado'); };
