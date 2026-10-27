// ---------- Team panel: Instagram ----------
// Each Monday the team writes down last week's numbers from Instagram (Panel profesional → Estadísticas), and the numbers of
// each post. Guide downloads, call requests and sales are counted on their own: the ManyChat links carry utm_source=instagram (web.js).
// Stored in ig_stats (supabase/instagram.sql): kind 'week' (day = that Monday) or 'post' (day = the day it went out)
const IG_WEEK=[['followers','Seguidores'],['reach','Cuentas alcanzadas'],['visits','Visitas al perfil'],['clicks','Clics en el enlace'],['kw','Mensajes con palabra clave']];
const IG_POST=[['reach','Alcance'],['saves','Guardados'],['shares','Compartidos'],['comments','Comentarios'],['dms','Mensajes']];
const IG_TYPES=['Reel','Carrusel','Post','Stories'];
const IG_PILLARS=['Nuestra historia y la de Chari','Números reales','Backstage de bodas','Cómo empezar','Prueba y oferta'];
const IG_KW=['SEÑALES','NÚMEROS','90DÍAS','GUÍA','CURSO'];
const monday=iso=>{ const d=D(iso); d.setUTCDate(d.getUTCDate()-(d.getUTCDay()+6)%7); return d.toISOString().slice(0,10); };
const inWeek=(ts,mon)=>!!ts&&ts.slice(0,10)>=mon&&ts.slice(0,10)<addDays(mon,7);
const igLeads=(mon,src)=>S.leads.filter(l=>l.extra?.from==='instagram'&&l.source===src&&inWeek(l.created_at,mon)).length;
const igSales=mon=>S.purchases.filter(p=>inWeek(p.created_at,mon)).reduce((a,p)=>a+(+p.amount||0),0);
const igWeeks=()=>S.ig.filter(r=>r.kind==='week').sort((a,b)=>b.day.localeCompare(a.day));
const igNum=v=>v===undefined||v===null||v===''?'–':(+v).toLocaleString('es-ES',{useGrouping:'always'});
function igDiff(now,before){ if(now==null||before==null||now===''||before==='') return ''; const d=+now-+before; return d?`<small class="hint">${d>0?'+':''}${igNum(d)} vs. la anterior</small>`:''; }

function pInstagram(){
  const weeks=igWeeks(), last=weeks[0], prev=weeks[1], mon=last?.day||addDays(monday(todayISO()),-7);
  // Every week with numbers written down or with something that came from Instagram, the newest first
  const days=[...new Set([...weeks.map(w=>w.day),...S.leads.filter(l=>l.extra?.from==='instagram').map(l=>monday(l.created_at))])].sort().reverse().slice(0,12);
  const posts=S.ig.filter(r=>r.kind==='post').sort((a,b)=>b.day.localeCompare(a.day));
  const best=[...posts].sort((a,b)=>(+b.data.dms||0)-(+a.data.dms||0)||(+b.data.saves||0)-(+a.data.saves||0)).slice(0,3).filter(p=>+p.data.dms||+p.data.saves);
  const guides=igLeads(mon,'guia'), visits=+last?.data.visits||0;
  return `<header><h1>Instagram</h1><p>Cómo nos funciona Instagram semana a semana. Cada lunes, apuntad los números de la semana anterior (Instagram → Panel profesional → Estadísticas). Las guías, las llamadas y las ventas se cuentan solas.</p></header>
  ${S.igMissing?`<div class="sheet pad"><p class="hint">Falta un paso para poder guardar: ejecutad <b>supabase/instagram.sql</b> en Supabase (GUIA.md, paso 2.5).</p></div>`:''}
  <div class="kpis">
    <div class="sheet"><span class="label">Seguidores</span><b class="num">${igNum(last?.data.followers)}</b>${igDiff(last?.data.followers,prev?.data.followers)}</div>
    <div class="sheet"><span class="label">Alcance</span><b class="num">${igNum(last?.data.reach)}</b>${igDiff(last?.data.reach,prev?.data.reach)}</div>
    <div class="sheet"><span class="label">Guías desde Instagram</span><b class="num">${guides}</b><small class="hint">semana del ${fdate(mon,{day:'numeric',month:'short'})}</small></div>
    <div class="sheet"><span class="label">Llamadas desde Instagram</span><b class="num">${igLeads(mon,'signature')}</b><small class="hint">semana del ${fdate(mon,{day:'numeric',month:'short'})}</small></div>
  </div>
  ${visits?`<p class="hint">De cada 100 visitas al perfil, ${Math.round(guides/visits*1000)/10} piden una guía. Lo que hay que hacer crecer es este número.</p>`:''}
  <div class="sheet pad"><h3 style="font-size:20px">Semana a semana</h3>
    ${days.length?`<div class="tblwrap"><table><thead><tr><th>Semana</th>${IG_WEEK.map(([,t])=>`<th>${t}</th>`).join('')}<th>Guías</th><th>Llamadas</th><th>Ventas</th><th></th></tr></thead><tbody>
      ${days.map(d=>{ const w=weeks.find(x=>x.day===d); return `<tr><td>${fdate(d,{day:'numeric',month:'short'})}${w?.data.notes?`<br><small class="hint">${esc(w.data.notes)}</small>`:''}</td>${IG_WEEK.map(([k])=>`<td class="num">${igNum(w?.data[k])}</td>`).join('')}<td class="num">${igLeads(d,'guia')}</td><td class="num">${igLeads(d,'signature')}</td><td class="num">${eur(igSales(d))}</td><td>${w?`<button type="button" class="btn sm" data-act="igEdit" data-arg="${w.id}">Cambiar</button>`:''}</td></tr>`; }).join('')}
    </tbody></table></div><p class="hint">Ventas: todos los pagos de la web de esa semana.</p>`:`<p class="empty">Todavía no hay semanas apuntadas.</p>`}</div>
  ${igWeekForm(S.ig.find(r=>r.id===ui('igEdit')))}
  <div class="sheet pad"><h3 style="font-size:20px">Publicaciones</h3>
    ${best.length?`<p class="hint">Lo que mejor funciona (más mensajes y guardados): ${best.map(p=>`<b style="font-weight:400">${esc(p.data.type)} «${esc(p.data.topic)}»</b>`).join(' · ')}. Repetid ese formato y ese tema.</p>`:''}
    ${posts.length?`<div class="tblwrap"><table><thead><tr><th>Fecha</th><th>Publicación</th><th>Pilar</th><th>Palabra clave</th>${IG_POST.map(([,t])=>`<th>${t}</th>`).join('')}<th></th></tr></thead><tbody>
      ${posts.map(p=>`<tr><td>${fdate(p.day,{day:'numeric',month:'short'})}</td><td>${esc(p.data.type)} · ${esc(p.data.topic)}</td><td>${esc(p.data.pillar||'')}</td><td>${esc(p.data.kw||'')}</td>${IG_POST.map(([k])=>`<td class="num">${igNum(p.data[k])}</td>`).join('')}<td><button type="button" class="btn sm" data-act="igDel" data-arg="${p.id}">Quitar</button></td></tr>`).join('')}
    </tbody></table></div>`:`<p class="empty">Todavía no hay publicaciones apuntadas.</p>`}</div>
  <form class="sheet pad" data-form="igPost"><h3 style="font-size:20px">Apuntar una publicación</h3><p class="hint">Mejor a los 7 días de publicarla, cuando los números ya casi no se mueven.</p>
    <div class="formgrid"><div class="field"><span>Día que se publicó</span><input id="igp-day" name="day" type="date" required value="${addDays(todayISO(),-7)}"></div>
      <div class="field"><span>Tipo</span><select id="igp-type" name="type">${IG_TYPES.map(t=>`<option>${t}</option>`).join('')}</select></div>
      <div class="field"><span>Tema o título</span><input id="igp-topic" name="topic" required placeholder="Si eres la que organiza todos los cumpleaños…"></div>
      <div class="field"><span>Pilar</span><select id="igp-pillar" name="pillar">${IG_PILLARS.map(t=>`<option>${t}</option>`).join('')}</select></div>
      <div class="field"><span>Palabra clave</span><select id="igp-kw" name="kw"><option value="">Ninguna</option>${IG_KW.map(t=>`<option>${t}</option>`).join('')}</select></div>
      ${IG_POST.map(([k,t])=>`<div class="field"><span>${t}</span><input id="igp-${k}" name="${k}" type="number" min="0" inputmode="numeric"></div>`).join('')}</div>
    <button class="btn primary" type="submit" style="align-self:flex-start">Guardar publicación</button></form>`;
}
function igWeekForm(w){
  const d=w?.data||{};
  return `<form class="sheet pad" data-form="igWeek"><h3 style="font-size:20px">${w?'Cambiar la semana del '+fdate(w.day,{day:'numeric',month:'long'}):'Apuntar una semana'}</h3>
    <div class="formgrid"><div class="field"><span>Semana (el lunes en que empieza)</span><input id="igw-day" name="day" type="date" required value="${w?.day||addDays(monday(todayISO()),-7)}"></div>
      ${IG_WEEK.map(([k,t])=>`<div class="field"><span>${t}</span><input id="igw-${k}" name="${k}" type="number" min="0" inputmode="numeric" value="${esc(d[k]??'')}"></div>`).join('')}
      <div class="field"><span>Notas (qué funcionó, qué no)</span><input id="igw-notes" name="notes" value="${esc(d.notes||'')}"></div></div>
    <div class="row"><button class="btn primary" type="submit">Guardar semana</button>${w?`<button type="button" class="btn" data-act="igEdit" data-arg="">Cancelar</button>`:''}</div></form>`;
}
const igData=(f,keys)=>Object.fromEntries(keys.filter(k=>f[k]!==undefined&&f[k]!=='').map(k=>[k,/^\d+$/.test(f[k])?+f[k]:f[k]]));
FORM.igWeek=async f=>{ const day=monday(f.day), cur=S.ig.find(r=>r.kind==='week'&&r.day===day);
  await DB.saveIg({id:cur?.id||crypto.randomUUID(),kind:'week',day,data:igData(f,[...IG_WEEK.map(([k])=>k),'notes'])}); ui('igEdit',null); render(); toast('Semana guardada'); };
FORM.igPost=async (f,form)=>{ await DB.saveIg({id:crypto.randomUUID(),kind:'post',day:f.day,data:igData(f,['type','topic','pillar','kw',...IG_POST.map(([k])=>k)])}); form.reset(); render(); toast('Publicación guardada'); };
ACT.igEdit=id=>{ ui('igEdit',id||null); render(); if(id) document.getElementById('igw-day')?.scrollIntoView({block:'center'}); };
ACT.igDel=async id=>{ await DB.deleteIg(S.ig.find(r=>r.id===id)); render(); };
