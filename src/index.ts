import fs from 'fs';
import playwright from 'playwright';

(async () => {
  console.time('pdf');
  const html = fs.readFileSync('invoice.html', 'utf8');
  const browser = await playwright.chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.emulateMedia({ media: 'print' });
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.addStyleTag({
    content: `
      * {
        print-color-adjust: exact;
        -webkit-print-color-adjust: exact;
      }
    `
  })
  await page.pdf({ path: 'invoice.pdf', format: 'a4' });

  await browser.close();
  console.timeEnd('pdf');
})();
