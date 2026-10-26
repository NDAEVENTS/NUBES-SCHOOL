// Builds the site into dist/: one page for every address, the Supabase library and the app.
// Needs SUPABASE_URL, SUPABASE_ANON_KEY and SITE_URL (Cloudflare Pages > Settings > Variables).
// Without them (or with NUBES_DEMO=1) it builds the demo: same screens, example data, nothing is saved.
import { build } from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync, cpSync } from 'node:fs';

const ORDER = ['course', 'app', 'sync', 'web', 'legal', 'portal', 'panel'];
const url = process.env.SUPABASE_URL, key = process.env.SUPABASE_ANON_KEY;
const demo = !!process.env.NUBES_DEMO || !url || !key;
const site = process.env.SITE_URL || 'https://nubesdealgodonschool.com';

rmSync('dist', { recursive: true, force: true }); mkdirSync('dist');
if (existsSync('public')) cpSync('public', 'dist', { recursive: true });
await build({ stdin: { contents: "export { createClient } from '@supabase/supabase-js';", resolveDir: '.' },
  bundle: true, format: 'iife', globalName: 'supabase', minify: true, outfile: 'dist/vendor.js', target: 'es2020' });
const app = ORDER.map(f => readFileSync(`src/${f}.js`, 'utf8')).join('\n;\n') + '\nstart();\n';
const v = Date.now().toString(36);
writeFileSync('dist/app.js', app);
writeFileSync('dist/config.js', `window.NUBES_CONFIG=${JSON.stringify({ url: demo ? '' : url, key: demo ? '' : key, demo, site, v })};\n`);
const desc = 'The Wedding Creators: el programa online para convertirte en wedding planner y montar tu empresa, de la mano de Nubes de Algodón, wedding planners en la Costa Brava desde hace más de 10 años.';
writeFileSync('dist/index.html', `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Nubes de Algodón School · Formación para wedding planners</title>
<meta name="description" content="${desc}">
<meta property="og:title" content="Nubes de Algodón School"><meta property="og:description" content="${desc}">
<meta property="og:type" content="website"><meta property="og:url" content="${site}">
<link rel="canonical" href="${site}/">
${readFileSync('src/shell.html', 'utf8')}
<script src="/config.js?v=${v}"></script><script src="/vendor.js?v=${v}"></script><script src="/app.js?v=${v}" defer></script>
</head><body><div id="root"><noscript>Activa JavaScript para ver la web de Nubes de Algodón School.</noscript></div></body></html>
`);
// Every address (/, /portal, /legal/privacidad…) opens the same page; the app draws the right screen
writeFileSync('dist/_redirects', '/* /index.html 200\n');
writeFileSync('dist/_headers', `/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
`);
console.log(demo ? 'Built dist/ in demo mode (example data, nothing is saved)' : 'Built dist/ for ' + url);
