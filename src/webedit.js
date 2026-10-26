// ---------- Panel → Editar landing: the texts of the public page ----------
// One form per section; saving a section stores it in site_content and visitors see it on their next visit.
const WEB_SECTIONS=[
  ['hero','Portada',[['eyebrow','Antetítulo'],['title','Título (entre *asteriscos* va en cursiva)'],['lede','Subtítulo','area'],['cta1','Botón principal'],['cta2','Botón de la guía']]],
  ['facts','Cifras de la portada',null],
  ['who','¿Es para ti?',[['eyebrow','Antetítulo'],['title','Título']]],
  ['method','El método',[['eyebrow','Antetítulo'],['intro','Texto','area']]],
  ['about','Quiénes os enseñan',[['eyebrow','Antetítulo'],['title','Título'],['text','Texto (una línea en blanco separa párrafos)','area'],['quote','Frase destacada','area']]],
  ['testimonials','Testimonios',[['eyebrow','Antetítulo'],['title','Título']]],
  ['prices','Precios',[['eyebrow','Antetítulo'],['title','Título'],['intro','Texto','area'],['online','Qué incluye Online (una línea por punto)','lines'],['completo','Qué incluye Completo (una línea por punto)','lines'],['signature','Qué incluye Signature (una línea por punto)','lines'],['forOnline','Para quién es Online','area'],['forCompleto','Para quién es Completo','area'],['forSignature','Para quién es Signature','area'],['edition','Próxima edición de Signature (debajo del precio)'],['etapa1','Texto de la Etapa 1','area'],['upgrade','Texto sobre subir de nivel','area']]],
  ['guide','Guía gratuita',[['title','Título'],['sub','Subtítulo']]],
  ['faq','Preguntas frecuentes',[['title','Título']]],
];
// Repeated items inside a section: [list key, button text, fields]
const WEB_LISTS={facts:['items','cifra',[['num','Cifra'],['text','Texto']]],who:['items','perfil',[['t','Título'],['d','Texto','area']]],
  testimonials:['items','testimonio',[['quote','Lo que dice','area'],['name','Nombre'],['detail','Detalle (p. ej. alumna 2026 · Madrid)']]],faq:['items','pregunta',[['q','Pregunta'],['a','Respuesta','area']]]};
const webField=(id,label,kind,val)=>`<div class="field"><span>${label}</span>${kind?`<textarea id="${id}" name="${id}" rows="${kind==='lines'?5:3}">${esc(kind==='lines'?(val||[]).join('\n'):val||'')}</textarea>`:`<input id="${id}" name="${id}" value="${esc(val||'')}">`}</div>`;
function pWeb(){
  const w=W();
  return `<header><h1>Editar landing</h1><p>Los textos de la página que ve quien entra en la web. Cada sección se guarda por separado. Los importes de los precios no se cambian aquí porque son los que cobra Stripe: pídenoslo y lo cambiamos en los dos sitios.</p>
    <div class="row"><a class="btn sm" href="/" target="_blank" rel="noopener">Abrir la web en otra pestaña</a></div></header>
  ${WEB_SECTIONS.map(([sec,title,fields])=>{ const L=WEB_LISTS[sec], items=L?(L[0]?w[sec][L[0]]:w[sec])||[]:null;
    return `<form class="sheet pad" data-form="web" data-sec="${sec}" id="web-${sec}"><h3 style="font-size:20px">${title}</h3>
      ${(fields||[]).map(([k,label,kind])=>webField(`${sec}.${k}`,label,kind,w[sec][k])).join('')}
      ${sec==='about'?`<div class="row" style="align-items:center">${w.about.photo?`<img src="${esc(w.about.photo)}" alt="" style="width:72px;height:90px;object-fit:cover;border-radius:8px">`:''}<div class="field" style="flex:1"><span>${w.about.photo?'Cambiar la foto':'Vuestra foto (vertical, 4:5)'}</span><input id="about.file" name="about.file" type="file" accept="image/*"></div></div>`:''}
      ${L?`<div class="list">${items.map((it,i)=>`<div class="li" style="flex-direction:column;align-items:stretch;gap:8px"><div class="spread"><span class="label">${L[1]} ${i+1}</span><label class="check"><input type="checkbox" name="${sec}.del.${i}"> Quitar al guardar</label></div>
        ${L[2].map(([k,label,kind])=>webField(`${sec}.${i}.${k}`,label,kind,it[k])).join('')}</div>`).join('')||`<p class="empty">Todavía no hay ninguno${sec==='testimonials'?': la sección no se muestra en la web hasta que añadáis uno':''}.</p>`}</div>
      <button type="submit" class="btn sm" name="add" value="1" style="align-self:flex-start">+ Añadir ${L[1]}</button>`:''}
      <div class="row"><button class="btn primary" type="submit">Guardar ${title.toLowerCase()}</button><button class="btn sm" type="submit" name="reset" value="1">Volver al texto original</button></div>
    </form>`; }).join('')}`;
}
FORM.web=async (f,form)=>{ const sec=form.dataset.sec, S0=Object.assign({},W()[sec]), L=WEB_LISTS[sec];
  let data;
  if(f.reset){ data=null; }
  else { data={};
    for(const [k,,kind] of WEB_SECTIONS.find(x=>x[0]===sec)[2]||[]){ const v=f[`${sec}.${k}`]??''; data[k]=kind==='lines'?v.split('\n').map(x=>x.trim()).filter(Boolean):v.trim(); }
    if(L){ const cur=(L[0]?S0[L[0]]:S0)||[]; let items=cur.map((_,i)=>Object.fromEntries(L[2].map(([k])=>[k,(f[`${sec}.${i}.${k}`]??'').trim()]))).filter((_,i)=>!f[`${sec}.del.${i}`]);
      if(f.add) items.push(Object.fromEntries(L[2].map(([k])=>[k,''])));
      if(L[0]) data[L[0]]=items; else data=items; }
    const file=form.querySelector('input[type=file]')?.files[0]; if(file) data.photo=await DB.uploadWebImage(file); else if(sec==='about') data.photo=S0.photo||'';
  }
  await DB.saveWeb(sec,data); render(); document.getElementById('web-'+sec)?.scrollIntoView();
  toast(f.reset?'Texto original recuperado':f.add?'Añadido: rellénalo y guarda':'Guardado. Ya se ve en la web.'); };
