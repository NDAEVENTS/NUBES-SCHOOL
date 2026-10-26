// Prints the free guides offered on the web: tools/<name>.html → public/<pdf>.
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
const { chromium } = createRequire(import.meta.url)('playwright');
const b = await chromium.launch(), p = await b.newPage();
mkdirSync('public', { recursive: true });
for (const [src, out] of [['guia', 'guia-wedding-planner'], ['guia-senales', 'guia-senales'], ['guia-numeros', 'guia-numeros'], ['guia-90-dias', 'guia-90-dias']]) {
  await p.goto('file://' + process.cwd() + `/tools/${src}.html`, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.pdf({ path: `public/${out}.pdf`, format: 'A4', printBackground: true, preferCSSPageSize: true });
  console.log(`public/${out}.pdf`);
}
await b.close();
