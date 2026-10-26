// Prints tools/guia.html to public/guia-wedding-planner.pdf (the free guide offered on the web).
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
const { chromium } = createRequire(import.meta.url)('playwright');
const b = await chromium.launch(), p = await b.newPage();
await p.goto('file://' + process.cwd() + '/tools/guia.html', { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
mkdirSync('public', { recursive: true });
await p.pdf({ path: 'public/guia-wedding-planner.pdf', format: 'A4', printBackground: true, preferCSSPageSize: true });
await b.close(); console.log('public/guia-wedding-planner.pdf');
