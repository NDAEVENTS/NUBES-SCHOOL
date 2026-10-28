// ---------- Supabase: sign-in, loading what each person may see, and saving ----------
// The database decides who sees what (supabase/schema.sql). In demo mode the same calls work on example data in memory.
const sb=CFG.demo?null:supabase.createClient(CFG.url,CFG.key,{auth:{persistSession:true,detectSessionInUrl:true,flowType:'implicit'}});
const HASH=new URLSearchParams(location.hash.slice(1));
const ok=r=>{ if(r.error) throw r.error; return r.data; };

async function boot(){
  if(CFG.demo){ demoSeed(); return; }
  // What the public web needs: the syllabus titles and the texts the team edited
  const outline=Promise.all([
    sb.rpc('course_outline').then(r=>{ if(r.data) S.pub=pubFrom(r.data); }),
    sb.from('site_content').select('data').eq('id','web').maybeSingle().then(r=>{ if(r.data) S.web=r.data.data; }),
  ]).catch(()=>{});
  const {data}=await sb.auth.getSession();
  const user=data.session?.user;
  const tp=HASH.get('type');
  if(user&&(tp==='invite'||tp==='recovery')){ S.user=user; S.ui.setPass=tp; history.replaceState({},'','/acceso'); S.route='/acceso'; }
  else if(user) await loadMe(user);
  await outline;
}
async function loadMe(user){
  const me=ok(await sb.from('members').select('*').eq('user_id',user.id).maybeSingle());
  if(!me){ await sb.auth.signOut(); S.err='Tu acceso todavía no está activo. Escríbenos a hola@nubesdealgodonevents.com y lo revisamos.'; return; }
  S.user=user; S.me=me;
  S.coursePlan=me.role==='alumna'?me.plan:null; await loadCourse();
  if(me.role==='nubes') await loadPanel(); else await loadAlumna();
  if(S.route==='/acceso'||S.route==='/') { history.replaceState({},'',me.role==='nubes'?'/panel':'/portal'); S.route=location.pathname; }
}
// The team gets every module, drafts included; a student only the stages her level includes (the database checks it)
async function loadCourse(){
  const [st,ms]=await Promise.all([sb.from('course_stages').select('*'),sb.from('course_modules').select('*')]).then(rs=>rs.map(ok));
  setCourse(st,ms);
}
// course_outline() → the same shape the web uses in the demo
function pubFrom(o){
  const mods=(o.modules||[]).sort((a,b)=>a.stage-b.stage||a.position-b.position).map(m=>({n:m.n,stage:m.stage,t:m.title,h:+m.hours||0,plans:m.plans||[],lessons:(m.lessons||[]).map(t=>({t})),exercises:(m.exercises||[]).map(t=>({t}))}));
  const stages=(o.stages||[]).sort((a,b)=>a.n-b.n).map(s=>({n:s.n,t:s.title,opens:+s.opens||0,mods:mods.filter(m=>m.stage===s.n).map(m=>m.n)})).filter(s=>s.mods.length);
  return {stages,mods:stages.flatMap(s=>s.mods.map(n=>mods.find(m=>m.n===n)))};
}
async function loadAlumna(){
  const id=S.user.id;
  const [P,SU,T,B,N,E,L]=await Promise.all([
    sb.from('progress').select('lesson,done_at').eq('user_id',id),
    sb.from('submissions').select('*').eq('user_id',id),
    sb.from('tutorials').select('*').eq('user_id',id).order('starts_at'),
    sb.from('business').select('data').eq('user_id',id).maybeSingle(),
    sb.from('notes').select('*').eq('user_id',id).order('created_at',{ascending:false}),
    sb.from('events').select('*').gte('starts_at',new Date(Date.now()-864e5).toISOString()).order('starts_at'),
    sb.from('library').select('*').order('module'),
  ]).then(rs=>rs.map(ok));
  S.progress={}; P.forEach(p=>S.progress[p.lesson]=p.done_at);
  S.subs={}; SU.forEach(s=>S.subs[s.exercise]=s);
  S.tuts=T; S.biz=B?.data||{}; S.notes=N; S.events=E; S.library=L;
}
async function loadPanel(){
  const [M,P,SU,T,LE,PU,E,L]=await Promise.all([
    sb.from('members').select('*').order('created_at',{ascending:false}),
    sb.from('progress').select('user_id,lesson,done_at'),
    sb.from('submissions').select('*').order('updated_at',{ascending:false}),
    sb.from('tutorials').select('*').order('starts_at'),
    sb.from('leads').select('*').order('created_at',{ascending:false}),
    sb.from('purchases').select('*').order('created_at',{ascending:false}),
    sb.from('events').select('*').order('starts_at'),
    sb.from('library').select('*').order('module'),
  ]).then(rs=>rs.map(ok));
  S.members=M; S.allProgress=P; S.allSubs=SU; S.allTuts=T; S.leads=LE; S.purchases=PU; S.events=E; S.library=L;
  // Instagram numbers (supabase/instagram.sql): until that file is run the rest of the panel still opens
  const IG=await sb.from('ig_stats').select('*').order('day',{ascending:false}); S.ig=IG.error?[]:IG.data; S.igMissing=!!IG.error;
}

// ---------- Account ----------
const DB={
  async signIn(email,password){ if(CFG.demo) return demoAs('alumna');
    const r=await sb.auth.signInWithPassword({email,password}); if(r.error) throw Object.assign(r.error,{friendly:'El email o la contraseña no son correctos.'}); await loadMe(r.data.user); },
  async signOut(){ if(!CFG.demo) await sb.auth.signOut(); S.user=null; S.me=null; S.realMe=null; },
  async resetPassword(email){ if(CFG.demo) return; const r=await sb.auth.resetPasswordForEmail(email,{redirectTo:CFG.site+'/acceso'}); if(r.error) throw r.error; },
  async setPassword(password){ if(CFG.demo) return; const r=await sb.auth.updateUser({password}); if(r.error) throw Object.assign(r.error,{friendly:'No se ha podido guardar la contraseña. Usa al menos 8 caracteres.'}); await loadMe(r.data.user); },

  // ---------- Alumna ----------
  async markLesson(key){ S.progress[key]=new Date().toISOString(); if(CFG.demo||S.realMe) return;
    ok(await sb.from('progress').upsert({user_id:S.user.id,lesson:key})); },
  async saveSubmission(ex,text,files,send){
    const cur=S.subs[ex]||{}; const row={id:cur.id||crypto.randomUUID(),user_id:S.user.id,exercise:ex,text,files:files||cur.files||[],status:send?'sent':(cur.status==='rev'?'rev':'draft'),updated_at:new Date().toISOString()};
    S.subs[ex]=Object.assign({},cur,row); if(S.realMe) return; if(CFG.demo){ S.allSubs=S.allSubs.filter(x=>x.exercise!==ex||x.user_id!==S.user.id).concat(S.subs[ex]); return; }
    ok(await sb.from('submissions').upsert(row)); },
  async uploadFile(bucket,file){
    const path=`${S.user.id}/${Date.now()}-${file.name.replace(/[^\w.\-]+/g,'_')}`;
    if(CFG.demo||(S.realMe&&bucket==='entregas')) return {path,name:file.name};
    ok(await sb.storage.from(bucket).upload(path,file)); return {path,name:file.name}; },
  async fileUrl(bucket,path){ if(CFG.demo) return null; const r=await sb.storage.from(bucket).createSignedUrl(path,600); return ok(r).signedUrl; },
  async requestTutorial(module,note){
    const row={id:crypto.randomUUID(),user_id:S.user.id,module,hours:MOD(module).h,status:'requested',note,created_at:new Date().toISOString()};
    S.tuts.push(row); if(CFG.demo||S.realMe) return; ok(await sb.from('tutorials').insert(row)); },
  async saveBusiness(){ if(CFG.demo||S.realMe) return; ok(await sb.from('business').upsert({user_id:S.user.id,data:S.biz,updated_at:new Date().toISOString()})); },

  async studentExtra(id){ if(CFG.demo) return {biz:id==='u-lucia'?S.panelState.biz:{},notes:id==='u-lucia'?S.panelState.notes:[]};
    const [B,N]=await Promise.all([sb.from('business').select('data').eq('user_id',id).maybeSingle(),sb.from('notes').select('*').eq('user_id',id).order('created_at',{ascending:false})]).then(rs=>rs.map(ok));
    return {biz:B?.data||{},notes:N}; },
  // ---------- Web ----------
  async addLead(name,email,source,extra){ if(CFG.demo) return; ok(await sb.rpc('add_lead',{p_name:name,p_email:email,p_source:source,p_extra:extra||{}})); },
  async checkout(planKey,email,installments){ if(CFG.demo) return null;
    const r=await sb.functions.invoke('checkout',{body:{plan:planKey,email,installments}}); if(r.error||!r.data?.url) throw Object.assign(new Error('checkout'),{friendly:'No hemos podido abrir el pago. Vuelve a intentarlo o escríbenos a hola@nubesdealgodonevents.com.'}); return r.data.url; },

  // ---------- Equipo ----------
  async review(sub,feedback){ Object.assign(sub,{status:'rev',feedback,feedback_by:S.me.name,feedback_at:new Date().toISOString()}); if(CFG.demo) return;
    ok(await sb.from('submissions').update({status:'rev',feedback,feedback_by:S.me.name,feedback_at:sub.feedback_at}).eq('id',sub.id)); },
  async saveTutorial(t){ if(CFG.demo){ if(!S.allTuts.includes(t)) S.allTuts.push(t); return; } ok(await sb.from('tutorials').upsert(t)); },
  async addNote(user_id,body){ const n={id:crypto.randomUUID(),user_id,body,by:S.me.name,created_at:new Date().toISOString()}; if(!CFG.demo) ok(await sb.from('notes').insert(n)); return n; },
  async updateMember(m,patch){ Object.assign(m,patch); if(CFG.demo) return; ok(await sb.from('members').update(patch).eq('user_id',m.user_id)); },
  async invite(body){ if(CFG.demo){ S.members.unshift({user_id:uid('u'),role:'alumna',name:body.name,email:body.email,plan:body.plan,started_at:todayISO(),access_until:addDays(todayISO(),365),created_at:new Date().toISOString()}); return; }
    const r=await sb.functions.invoke('invite',{body:Object.assign({redirect:CFG.site+'/acceso'},body)}); if(r.error||!r.data?.ok) throw Object.assign(new Error('invite'),{friendly:r.data?.error==='exists'?'Ese email ya tiene acceso.':'No se ha podido enviar la invitación.'}); await loadPanel(); },
  async paymentLink(planKey,email){ if(CFG.demo) return 'https://checkout.stripe.com/c/pay/ejemplo'; return DB.checkout(planKey,email); },
  async saveEvent(ev){ if(CFG.demo){ if(!S.events.includes(ev)) S.events.push(ev); return; } ok(await sb.from('events').upsert(ev)); },
  async deleteEvent(ev){ S.events=S.events.filter(x=>x!==ev); if(CFG.demo) return; ok(await sb.from('events').delete().eq('id',ev.id)); },
  async addLibrary(item,file){ if(file){ const up=await DB.uploadFile('course',file); item.path=up.path; item.file=up.name; } if(!CFG.demo) ok(await sb.from('library').insert(item)); S.library.push(item); },
  // ---------- Curso ----------
  // A module is saved whole (its lessons and exercises travel inside it)
  async saveModule(m){ m.updated_at=new Date().toISOString(); m.updated_by=S.me.name;
    if(!S.cAll.mods.includes(m)) S.cAll.mods.push(m); setCourse(S.cAll.stages,S.cAll.mods); if(CFG.demo) return;
    const {n,stage,position,title,hours,tutoria,published,lessons,exercises,updated_at,updated_by}=m, plans=m.plans||[];
    ok(await sb.from('course_modules').upsert({n,stage,position,title,hours,tutoria,published,plans,lessons,exercises,updated_at,updated_by})); },
  async deleteModule(m){ S.cAll.mods=S.cAll.mods.filter(x=>x!==m); setCourse(S.cAll.stages,S.cAll.mods); if(CFG.demo) return; ok(await sb.from('course_modules').delete().eq('n',m.n)); },
  async saveStage(st){ if(!S.cAll.stages.includes(st)) S.cAll.stages.push(st); setCourse(S.cAll.stages,S.cAll.mods); if(CFG.demo) return;
    ok(await sb.from('course_stages').upsert({n:st.n,title:st.title,opens:st.opens})); },
  async deleteStage(st){ S.cAll.stages=S.cAll.stages.filter(x=>x!==st); setCourse(S.cAll.stages,S.cAll.mods); if(CFG.demo) return; ok(await sb.from('course_stages').delete().eq('n',st.n)); },
  // ---------- Web ----------
  // Re-read before writing so that two people editing different sections never undo each other
  async saveWeb(sec,data){
    if(!CFG.demo){ const r=await sb.from('site_content').select('data').eq('id','web').maybeSingle(); S.web=ok(r)?.data||{}; }
    S.web=Object.assign({},S.web); if(data===null) delete S.web[sec]; else S.web[sec]=data; if(CFG.demo) return;
    ok(await sb.from('site_content').upsert({id:'web',data:S.web,updated_at:new Date().toISOString(),updated_by:S.me.name})); },
  async uploadWebImage(file){ if(CFG.demo) return URL.createObjectURL(file);
    const path=`${Date.now()}-${file.name.replace(/[^\w.\-]+/g,'_')}`; ok(await sb.storage.from('web').upload(path,file,{contentType:file.type}));
    return sb.storage.from('web').getPublicUrl(path).data.publicUrl; },
  async removeCourseFile(path){ if(CFG.demo||!path) return; await sb.storage.from('course').remove([path]); },
  async saveIg(row){ row.updated_at=new Date().toISOString(); row.updated_by=S.me.name; S.ig=S.ig.filter(r=>r.id!==row.id).concat(row); if(CFG.demo) return;
    ok(await sb.from('ig_stats').upsert(row)); S.igMissing=false; },
  async deleteIg(row){ S.ig=S.ig.filter(r=>r!==row); if(CFG.demo) return; ok(await sb.from('ig_stats').delete().eq('id',row.id)); },
  async saveLead(l,ch){ Object.assign(l,ch); if(CFG.demo) return; ok(await sb.from('leads').update(ch).eq('id',l.id)); },
  async deleteLead(l){ S.leads=S.leads.filter(x=>x!==l); if(CFG.demo) return; ok(await sb.from('leads').delete().eq('id',l.id)); },
  async deleteLibrary(item){ S.library=S.library.filter(x=>x!==item); if(CFG.demo) return; if(item.path) await sb.storage.from('course').remove([item.path]); ok(await sb.from('library').delete().eq('id',item.id)); },
};

// ---------- Demo data ----------
function demoSeed(){
  const now=Date.now(), iso=d=>new Date(now+d*864e5).toISOString();
  const c=seedCourse(); setCourse(c.stages,c.mods);
  S.demo={
    alumna:{user_id:'u-lucia',role:'alumna',name:'Lucía Martín',email:'lucia@ejemplo.com',plan:'completo',started_at:addDays(todayISO(),-9),access_until:addDays(todayISO(),356),country:'España',last_seen:iso(0),created_at:iso(-9)},
    nubes:{user_id:'u-ainoa',role:'nubes',name:'Ainoa',email:'ainoa@ejemplo.com'},
  };
  S.events=[{id:'e1',kind:'qa',title:'Sesión de dudas de noviembre',starts_at:iso(10),link:'https://meet.google.com/',plans:['online','completo','signature']},{id:'e2',kind:'workshop',title:'Fin de semana de workshops · Costa Brava',starts_at:iso(48),link:'',plans:['signature']}];
  S.library=[['Contrato de servicios','Validado por abogado',2],['Cesión de derechos de imagen','',2],['Plantilla DAFO','',2],['Base de datos de proveedores','Hoja de cálculo',2],['Dossier de servicios de ejemplo','',4],['Wedding book de ejemplo','',5],['Calculadora de honorarios','Hoja de cálculo',6],['Control de pagos','Hoja de cálculo',6],['Plantilla de planificación','Vacía y ejemplo real',7]].map(([t,d,m],i)=>({id:'l'+i,title:t,detail:d,module:m,path:'',plans:['etapa1','online','completo','signature'].slice(m<=2?0:1)}));
  S.progress={}; [[1,6],[2,10],[3,2]].forEach(([m,n])=>{ for(let i=0;i<n;i++) S.progress[lessonKey(m,i)]=iso(-9+m*2); });
  S.subs={
    '2-e0':{id:'s1',user_id:'u-lucia',exercise:'2-e0',text:'Valeria y Marc, 34 y 36 años, arquitectos de Barcelona. Boda civil en una masía del Empordà, 120 invitados, estilo mediterráneo y elegante…',files:[],status:'rev',feedback:'Muy bien definida la pareja. Afina el rango de presupuesto: con este estilo, piensa en bodas de 35.000 € en adelante.',feedback_by:'Ainoa',feedback_at:iso(-3),updated_at:iso(-5)},
    '2-e1':{id:'s2',user_id:'u-lucia',exercise:'2-e1',text:'Mis 4 favoritos: Atelier Olivo, Mar de Lino, Casa Brisa, Lucía Martín Weddings. Elijo Atelier Olivo (dominio libre).',files:[],status:'rev',feedback:'“Atelier Olivo” funciona: es elegante y el dominio está libre. Adelante.',feedback_by:'Pilar',feedback_at:iso(-2),updated_at:iso(-4)},
    '2-e2':{id:'s3',user_id:'u-lucia',exercise:'2-e2',text:'Fortalezas: experiencia en hostelería, red de proveedores en Girona… Debilidades: no tengo portfolio todavía…',files:[],status:'sent',updated_at:iso(-1)},
  };
  S.tuts=[{id:'t1',user_id:'u-lucia',module:1,hours:1,status:'done',starts_at:iso(-7),summary:'Por qué quieres ser wedding planner y tu objetivo a un año.'},{id:'t2',user_id:'u-lucia',module:2,hours:2,status:'done',starts_at:iso(-2),summary:'Nicho de bodas de lujo en el Empordà. Tarea: terminar el DAFO.'},{id:'t3',user_id:'u-lucia',module:3,hours:1,status:'booked',starts_at:iso(3),link:'https://meet.google.com/'}];
  S.biz={ideal:'Pareja de 30–40 años, boda de lujo en el Empordà, 120 invitados.',name:'Atelier Olivo Bodas',domain:'atelierolivo.com',services:'',calc:{m:400,a:1000,s:2500,b:17},vendors:[{cat:'Catering',name:'Mas Ejemplo Catering',st:'Contactado'},{cat:'Fotografía',name:'Estudio Ejemplo',st:'Reunión hecha'}],couples:[]};
  S.notes=[{id:'n1',body:'¡Qué bien quedó tu cliente ideal, Lucía! Revisa los comentarios del DAFO cuando puedas y lo vemos en la tutoría.',by:'Ainoa',created_at:iso(-2)}];
  S.members=[S.demo.alumna,
    {user_id:'u-carmen',role:'alumna',name:'Carmen Ruiz',email:'carmen@ejemplo.com',plan:'signature',started_at:addDays(todayISO(),-3),access_until:addDays(todayISO(),362),country:'México',last_seen:iso(-1),created_at:iso(-3)},
    {user_id:'u-vale',role:'alumna',name:'Valentina Gómez',email:'valentina@ejemplo.com',plan:'online',started_at:addDays(todayISO(),-17),access_until:addDays(todayISO(),348),country:'Colombia',last_seen:iso(0),created_at:iso(-17)},
    {user_id:'u-marta',role:'alumna',name:'Marta Soler',email:'marta@ejemplo.com',plan:'completo',started_at:addDays(todayISO(),-30),access_until:addDays(todayISO(),335),country:'España',last_seen:iso(-12),created_at:iso(-30)},
    S.demo.nubes];
  S.allProgress=[...Object.entries(S.progress).map(([lesson,done_at])=>({user_id:'u-lucia',lesson,done_at})),...allLessons().slice(0,40).map(l=>({user_id:'u-vale',lesson:l,done_at:iso(-2)})),...allLessons().slice(0,50).map(l=>({user_id:'u-marta',lesson:l,done_at:iso(-12)})),...allLessons().slice(0,3).map(l=>({user_id:'u-carmen',lesson:l,done_at:iso(-1)}))];
  S.allSubs=Object.values(S.subs);
  S.allTuts=[...S.tuts,{id:'t4',user_id:'u-carmen',module:1,hours:1,status:'requested',note:'Mejor por las tardes (hora de México).',created_at:iso(-1)}];
  S.leads=[{id:'d1',name:'Paula',email:'paula@ejemplo.com',source:'guia',created_at:iso(-1)},{id:'d2',name:'Andrea',email:'andrea@ejemplo.com',source:'signature',extra:{country:'Argentina',why:'Organizo eventos corporativos y quiero pasarme a bodas.'},created_at:iso(-2)},{id:'d3',name:'Sofía',email:'sofia@ejemplo.com',source:'guia',created_at:iso(-4)}];
  const mon=addDays(monday(todayISO()),-7);
  S.ig=[{id:'ig1',kind:'week',day:addDays(mon,-7),data:{followers:1180,reach:2900,visits:310,clicks:22,kw:9}},{id:'ig2',kind:'week',day:mon,data:{followers:1236,reach:4100,visits:420,clicks:41,kw:17,notes:'El reel de números a cámara funcionó muy bien'}},
    {id:'ig3',kind:'post',day:addDays(mon,0),data:{type:'Reel',topic:'Si eres la que organiza todos los cumpleaños',pillar:IG_PILLARS[0],kw:'SEÑALES',reach:2300,saves:64,shares:31,comments:18,dms:12}},
    {id:'ig4',kind:'post',day:addDays(mon,2),data:{type:'Carrusel',topic:'7 señales de que esto es para ti',pillar:IG_PILLARS[0],kw:'SEÑALES',reach:1400,saves:88,shares:12,comments:9,dms:6}}];
  S.leads.push(...[1,2,3].map(i=>({id:'di'+i,name:['Chari','Noelia','Laura'][i-1],email:`ig${i}@ejemplo.com`,source:'guia',extra:{guide:'senales',from:'instagram'},created_at:new Date(D(mon).getTime()+i*864e5).toISOString()})),{id:'di4',name:'Rocío',email:'rocio@ejemplo.com',source:'signature',extra:{plan:'completo',from:'instagram',country:'España',why:'Trabajo en un banco y quiero cambiar.'},created_at:new Date(D(mon).getTime()+4*864e5).toISOString()});
  S.purchases=[{id:'p1',email:'carmen@ejemplo.com',plan:'signature',amount:3500,created_at:iso(-3)},{id:'p2',email:'lucia@ejemplo.com',plan:'completo',amount:1990,created_at:iso(-9)}];
}
function demoAs(role){
  if(!S.demo) demoSeed();
  S.user={id:S.demo[role].user_id}; S.me=S.demo[role];
  if(role==='alumna'){ S.subs=Object.fromEntries(S.allSubs.filter(s=>s.user_id==='u-lucia').map(s=>[s.exercise,s])); S.tuts=S.allTuts.filter(t=>t.user_id==='u-lucia'); }
}
ACT.demoAs=role=>{ demoAs(role); nav(role==='nubes'?'/panel':'/portal'); };
