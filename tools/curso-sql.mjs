// Writes supabase/curso.sql: the course tables, who may read them, and the first version of the programme
// (the dossier, from src/course.js). Run: node tools/curso-sql.mjs
import { readFileSync, writeFileSync } from 'node:fs';
const src = readFileSync('src/course.js', 'utf8');
const COURSE_SEED = JSON.parse(src.slice(src.indexOf('['), src.lastIndexOf(']') + 1));
const app = readFileSync('src/app.js', 'utf8');
const STAGE_SEED = eval(app.slice(app.indexOf('const STAGE_SEED=') + 17, app.indexOf('];', app.indexOf('const STAGE_SEED=')) + 1));
const DDL = readFileSync('supabase/curso-tables.sql', 'utf8');
const q = s => "'" + String(s).replace(/'/g, "''") + "'";
const json = v => '$j$' + JSON.stringify(v) + '$j$::jsonb';
const stageOf = n => STAGE_SEED.find(s => s.mods.includes(n));
let out = `-- Nubes de Algodón School · Curso y textos de la web\n-- Paste all of it in Supabase → SQL Editor → Run. It can be run again: it never overwrites what you edited in Panel → Curso.\n\n${DDL}\n-- ---------- First version of the programme (the dossier) ----------\n`;
out += 'insert into public.course_stages(n,title,opens) values\n' + STAGE_SEED.map(s => `  (${s.n},${q(s.title)},${s.opens})`).join(',\n') + '\non conflict (n) do nothing;\n\n';
for (const m of COURSE_SEED) {
  const st = stageOf(m.n);
  const lessons = m.lessons.map((l, i) => ({ k: `${m.n}-${i}`, t: l.t, b: l.b }));
  const exercises = m.exercises.map((x, i) => ({ k: `${m.n}-e${i}`, t: x.t, b: x.b }));
  out += `insert into public.course_modules(n,stage,position,title,hours,tutoria,published,lessons,exercises) values (${m.n},${st.n},${st.mods.indexOf(m.n)},${q(m.t)},${m.h},${q(m.tutoria || '')},true,\n  ${json(lessons)},\n  ${json(exercises)})\non conflict (n) do nothing;\n\n`;
}
out += "select count(*) as modulos from public.course_modules;  -- debe decir 9\n";
writeFileSync('supabase/curso.sql', out);
console.log('supabase/curso.sql', (out.length / 1024).toFixed(0) + ' KB');
