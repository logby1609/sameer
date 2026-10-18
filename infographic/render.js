const { chromium } = require('playwright');
(async () => {
  const transparent = process.argv[3] === 'transparent';
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const p = await b.newPage({ viewport: { width: 1123, height: 794 }, deviceScaleFactor: 3 });
  await p.goto('file://' + __dirname + '/index.html');
  if (transparent) {
    await p.addStyleTag({ content: 'body,.page{background:transparent!important}#cert img{mix-blend-mode:normal!important}.cert-box h3 span{background:transparent!important}.cert-box{border-top-color:transparent!important}.cert-box h3{padding:0!important;left:-2.5px!important;right:-2.5px!important}' });
    await p.evaluate(() => document.querySelectorAll('#cert img').forEach(i => { i.src = i.getAttribute('src').replace('.png', '_t.png'); }));
    await p.waitForFunction(() => [...document.images].every(i => i.complete));
  }
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: process.argv[2] || 'out.png', omitBackground: transparent });
  await b.close();
})();
