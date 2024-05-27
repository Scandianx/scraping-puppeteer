const puppeteer = require('puppeteer');
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
(async () => {
  const browser = await puppeteer.launch({ headless: false, timeout: 60000 });
  const page = await browser.newPage();
  await page.goto('http://riodejaneiro1.dcfiorilli.com.br:8079/Transparencia/Default.aspx?AcessoIndividual=LnkServidores', { waitUntil: 'networkidle2' });

  // Esperar o botão "lnkDadosAbertos" estar visível e clicar nele
  await sleep(60000)







  
  // Esperar o iframe aparecer (você pode precisar ajustar o seletor se houver múltiplos iframes)
  await page.waitForSelector('iframe', { timeout: 60000 });

  // Localizar o iframe na página
  const iframeElement = await page.$('iframe');

  if (iframeElement) {
    // Obter o frame do iframe
    const frame = await iframeElement.contentFrame();

    // Verificar se o frame foi corretamente obtido
    if (frame) {
      // Esperar o elemento dentro do iframe estar visível
  
      const selector = "#gridPessoal_DXMainTable";
      await frame.waitForSelector(selector, { timeout: 60000 });

      // Localizar o elemento dentro do iframe
      const element = await frame.$(selector);

      if (element) {
        const text = await frame.evaluate(el => el.innerText, element);
        console.log(text);
      } else {
        console.log("Elemento não encontrado dentro do iframe");
      }
    } else {
      console.log("Frame não encontrado");
    }
  } else {
    console.log("iframe não encontrado");
  }

  await browser.close();
})();
