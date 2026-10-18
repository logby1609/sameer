const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const p = await b.newPage({ viewport: { width: 1123, height: 794 } });
  await p.goto('file://' + __dirname + '/index.html');
  await p.evaluate(() => document.fonts.ready);
  await p.waitForFunction(() => window.__ready === true);
  await p.addStyleTag({ content: '@page{size:297mm 210mm;margin:0}html,body{margin:0;padding:0}.page{margin:0!important;width:297mm!important;height:210mm!important;transform-origin:top left}.cert-box::before{-webkit-mask:none!important;mask:none!important}.cert-box h3 span,.iso span{background:#fff;padding:0 14px!important;position:relative;z-index:1}' });
  await p.pdf({ path: process.argv[2] || 'infographic.pdf', width: '297mm', height: '210mm', printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 }, pageRanges: '1' });
  await b.close();
})();
