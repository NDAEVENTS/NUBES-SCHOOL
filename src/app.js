// ---------- Helpers ----------
const CFG=window.NUBES_CONFIG||{};
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const eur=n=>(+n||0).toLocaleString('es-ES',{minimumFractionDigits:(+n%1?2:0),maximumFractionDigits:2,useGrouping:'always'})+' €';
const eur2=n=>(+n||0).toLocaleString('es-ES',{minimumFractionDigits:2,maximumFractionDigits:2,useGrouping:'always'})+' €';
const todayISO=()=>new Date().toISOString().slice(0,10);
const D=iso=>new Date(String(iso).slice(0,10)+'T12:00:00Z');
const fdate=(iso,o)=>iso?D(iso).toLocaleDateString('es-ES',Object.assign({timeZone:'UTC'},o||{day:'numeric',month:'long',year:'numeric'})):'';
const fdt=ts=>ts?new Date(ts).toLocaleString('es-ES',{timeZone:'Europe/Madrid',weekday:'long',day:'numeric',month:'long',hour:'2-digit',minute:'2-digit'}):'';
const daysSince=iso=>Math.floor((D(todayISO())-D(iso))/864e5);
const addDays=(iso,n)=>{ const d=D(iso); d.setUTCDate(d.getUTCDate()+n); return d.toISOString().slice(0,10); };
const ago=ts=>{ if(!ts) return ''; const d=Math.floor((Date.now()-new Date(ts))/864e5); return d<=0?'hoy':d===1?'ayer':`hace ${d} días`; };
const uid=p=>(p||'x')+Math.random().toString(36).slice(2,10);

// ---------- Programme ----------
// The four stages group the nine modules of the dossier in their original order; one stage opens each week
const STAGES=[
  {n:1,t:'La profesión y tu empresa',mods:[1,2]},
  {n:2,t:'Visibilidad y clientes',mods:[3,4]},
  {n:3,t:'Servicios y precios',mods:[5,6]},
  {n:4,t:'Planifica, comunícate y brilla',mods:[7,8,9]},
];
// What each level includes. Prices are shown on the web; the amount charged lives in the checkout function
const PLANS={
  etapa1:{t:'Etapa 1',price:197,stages:1,hours:0,feedback:false,qa:false},
  online:{t:'Online',price:590,stages:4,hours:0,feedback:false,qa:true},
  completo:{t:'Completo',price:1990,stages:4,hours:12,feedback:true,qa:true},
  signature:{t:'Signature',price:3500,stages:4,hours:12,feedback:true,qa:true,workshop:true},
};
const MOD=n=>COURSE[n-1];
const lessonKey=(m,i)=>`${m}-${i}`;
const exKey=(m,i)=>`${m}-e${i}`;
const ALL_LESSONS=COURSE.flatMap(m=>m.lessons.map((l,i)=>lessonKey(m.n,i)));
const ALL_EX=COURSE.flatMap(m=>m.exercises.map((e,i)=>({key:exKey(m.n,i),m:m.n,t:e.t})));
const stageOf=m=>STAGES.find(s=>s.mods.includes(m));
const plan=mem=>PLANS[mem?.plan]||PLANS.online;
// A stage is open when the level includes it and its week has come (the team can open everything for one student)
const stageOpensOn=(mem,n)=>addDays(mem.started_at||todayISO(),7*(n-1));
const stageOpen=(mem,n)=>n<=plan(mem).stages&&(mem.unlocked||daysSince(mem.started_at||todayISO())>=7*(n-1));

// ---------- State ----------
const S={route:location.pathname,booting:true,user:null,me:null,toast:'',busy:false,err:'',
  // alumna
  progress:{},subs:{},tuts:[],biz:{},notes:[],events:[],library:[],
  // equipo
  members:[],allProgress:[],allSubs:[],allTuts:[],leads:[],purchases:[],
  // screen
  ui:{}};
const ui=(k,v)=>v===undefined?S.ui[k]:(S.ui[k]=v);

// ---------- Rendering ----------
const root=$('#root');
function render(){
  const r=S.route, focusId=document.activeElement?.id;
  let html;
  if(r.startsWith('/legal/')) html=legalPage(r.slice(7));
  else if(r==='/gracias') html=thanksPage();
  else if(r==='/acceso') html=authPage();
  else if(r.startsWith('/portal')||r.startsWith('/panel')) html=S.booting?`<div class="loading">Abriendo tu escuela…</div>`:!S.user?authPage():S.me?.role==='nubes'?panel():portal();
  else html=webPage();
  root.innerHTML=(CFG.demo?demoBar():'')+html+(S.toast?`<div class="toast" role="status">${esc(S.toast)}</div>`:'');
  if(focusId){ const f=document.getElementById(focusId); if(f&&f.tagName!=='BUTTON') f.focus(); }
}
function demoBar(){ return `<div class="demo-note">Versión de demostración: datos de ejemplo, no se guarda nada. Entra como <button type="button" class="btn sm" data-act="demoAs" data-arg="alumna">alumna</button> o como <button type="button" class="btn sm" data-act="demoAs" data-arg="nubes">equipo Nubes</button></div>`; }
function toast(t){ S.toast=t; render(); clearTimeout(toast.t); toast.t=setTimeout(()=>{ S.toast=''; render(); },3000); }
function nav(path,keepScroll){ if(path!==location.pathname+location.hash) history.pushState({},'',path); S.route=location.pathname; S.ui.lesson=null; render(); if(!keepScroll){ const h=location.hash.slice(1); const el=h&&document.getElementById(h); el?el.scrollIntoView():scrollTo(0,0); } }
addEventListener('popstate',()=>{ S.route=location.pathname; render(); });

// ---------- Events ----------
// Buttons carry data-act (+ data-arg); forms carry data-form. Each screen file adds its own handlers here
const ACT={}, FORM={};
root.addEventListener('click',e=>{
  const a=e.target.closest('a[href^="/"]');
  if(a&&!a.target&&!e.metaKey&&!e.ctrlKey){ e.preventDefault(); nav(a.getAttribute('href')); return; }
  if(e.target.classList.contains('overlay')){ S.ui.buy=null; S.ui.modal=null; render(); return; }
  const b=e.target.closest('[data-act]'); if(!b) return;
  const f=ACT[b.dataset.act]; if(f){ e.preventDefault(); Promise.resolve(f(b.dataset.arg,b,e)).catch(fail); }
});
root.addEventListener('submit',e=>{
  const f=FORM[e.target.dataset.form]; if(!f) return; e.preventDefault();
  let fd; try{ fd=new FormData(e.target,e.submitter); }catch{ fd=new FormData(e.target); if(e.submitter?.name) fd.set(e.submitter.name,e.submitter.value); }
  Promise.resolve(f(Object.fromEntries(fd),e.target)).catch(fail);
});
root.addEventListener('input',e=>{ const k=e.target.dataset.live; if(k&&LIVE[k]) LIVE[k](e.target); });
const LIVE={};
function fail(err){ console.error(err); S.busy=false; toast(err?.friendly||'No se ha podido guardar. Revisa tu conexión y vuelve a intentarlo.'); }

// ---------- Start ----------
async function start(){
  render();
  try{ await boot(); }catch(e){ console.error(e); S.err='No hemos podido abrir la escuela. Vuelve a intentarlo en un momento.'; }
  S.booting=false; render();
}
