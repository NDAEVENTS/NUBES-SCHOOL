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
// The course lives in the database (course_stages, course_modules) and the team edits it in Panel → Curso.
// S.cAll keeps everything, drafts included, for the editor; COURSE and STAGES are what students see.
// Lessons and exercises have a stable key (k) that progress and submissions point to, so reordering never loses work.
let COURSE=[], STAGES=[];
// The first version of the programme: the four stages group the nine modules of the dossier in their original order
const STAGE_SEED=[
  {n:1,title:'La profesión y tu empresa',opens:0,mods:[1,2]},
  {n:2,title:'Visibilidad y clientes',opens:7,mods:[3,4]},
  {n:3,title:'Servicios y precios',opens:14,mods:[5,6]},
  {n:4,title:'Planifica, comunícate y brilla',opens:21,mods:[7,8,9]},
];
// What each level includes. Prices are shown on the web; the amount charged lives in the checkout function.
// stages: Etapa 1 only opens the first stage; the rest open every stage the team publishes
const PLANS={
  etapa1:{t:'Etapa 1',price:197,stages:1,hours:0,feedback:false,qa:false},
  online:{t:'Online',price:590,stages:99,hours:0,feedback:false,qa:true},
  completo:{t:'Completo',price:1990,stages:99,hours:12,feedback:true,qa:true},
  signature:{t:'Signature',price:3500,stages:99,hours:12,feedback:true,qa:true,workshop:true},
};
// Modules and stages as they come from the database → what students see
function setCourse(stages,mods){
  const st=[...stages].sort((a,b)=>a.n-b.n), ms=[...mods].sort((a,b)=>a.stage-b.stage||a.position-b.position||a.n-b.n);
  S.cAll={stages:st,mods:ms};
  COURSE=ms.filter(m=>m.published!==false&&st.some(s=>s.n===m.stage)).map(m=>({n:m.n,stage:m.stage,t:m.title,h:+m.hours||0,tutoria:m.tutoria||'',
    lessons:(m.lessons||[]).filter(l=>!l.draft),exercises:(m.exercises||[]).filter(x=>!x.draft)}));
  STAGES=st.map(s=>({n:s.n,t:s.title,opens:+s.opens||0,mods:COURSE.filter(m=>m.stage===s.n).map(m=>m.n)})).filter(s=>s.mods.length);
}
// The dossier's text turned into the course format (demo, and the import into the database)
function seedCourse(){
  const stage=n=>STAGE_SEED.find(s=>s.mods.includes(n));
  return {stages:STAGE_SEED.map(({n,title,opens})=>({n,title,opens})),
    mods:(typeof COURSE_SEED!=='undefined'?COURSE_SEED:[]).map(m=>({n:m.n,stage:stage(m.n).n,position:stage(m.n).mods.indexOf(m.n),title:m.t,hours:m.h,tutoria:m.tutoria||'',published:true,
      lessons:m.lessons.map((l,i)=>({k:`${m.n}-${i}`,t:l.t,b:l.b})),exercises:m.exercises.map((x,i)=>({k:`${m.n}-e${i}`,t:x.t,b:x.b}))}))};
}
const MOD=n=>COURSE.find(m=>m.n===+n);
const modNo=n=>{ const i=COURSE.findIndex(m=>m.n===+n); return i<0?n:i+1; };   // the number students see, in course order
const lessonKey=(m,i)=>MOD(m)?.lessons[i]?.k;
const exKey=(m,i)=>MOD(m)?.exercises[i]?.k;
const allLessons=()=>COURSE.flatMap(m=>m.lessons.map(l=>l.k));
const allEx=()=>COURSE.flatMap(m=>m.exercises.map(e=>({key:e.k,m:m.n,t:e.t,E:e})));
const STG=n=>STAGES.find(s=>s.n===n);
// A hidden module still belongs to a stage (library items, old tutorials)
const stageOf=m=>STAGES.find(s=>s.mods.includes(+m))||STAGES.find(s=>s.n===S.cAll?.mods.find(x=>x.n===+m)?.stage)||{n:99,t:'',opens:9999,mods:[]};
const plan=mem=>PLANS[mem?.plan]||PLANS.online;
const inPlan=(mem,n)=>plan(mem).stages===1?n===(STAGES[0]?.n??1):true;
// A stage is open when the level includes it and its day has come (the team can open everything for one student)
const stageOpensOn=(mem,n)=>addDays(mem.started_at||todayISO(),STG(n)?.opens??7*(n-1));
const stageOpen=(mem,n)=>inPlan(mem,n)&&!!STG(n)&&(mem.unlocked||daysSince(mem.started_at||todayISO())>=STG(n).opens);
const myStages=mem=>STAGES.filter(s=>inPlan(mem,s.n));

// ---------- State ----------
const S={route:location.pathname,cAll:{stages:[],mods:[]},booting:true,user:null,me:null,toast:'',busy:false,err:'',
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
