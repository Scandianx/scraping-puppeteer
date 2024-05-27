const puppeteer = require('puppeteer');
const xlsx = require('xlsx');
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
(async () => {
  const browser = await puppeteer.launch({ headless: false, timeout: 60000 });
  const page = await browser.newPage();
  await page.goto('http://riodejaneiro1.dcfiorilli.com.br:8079/Transparencia/Default.aspx?AcessoIndividual=LnkServidores', { waitUntil: 'networkidle2' });

  // Esperar o botão "lnkDadosAbertos" estar visível e clicar nele
  await page.waitForSelector('#lnkDadosAbertos', { timeout: 30000 });
  await page.click('#lnkDadosAbertos');
  await sleep(30000)
  // Esperar o iframe aparecer
  await page.waitForSelector('iframe', { timeout: 60000 });

  // Localizar o iframe na página
  const iframeElement = await page.$('iframe');

  if (iframeElement) {
    // Obter o frame do iframe
    const frame = await iframeElement.contentFrame();

    // Verificar se o frame foi corretamente obtido
    if (frame) {
      const rows = [];
      for (let i = 0; i <= 11; i++) {
        const selector = `#gridPessoal_DXDataRow${i}`;
        await frame.waitForSelector(selector, { timeout: 60000 });

        const row = await frame.$eval(selector, el => {
          const columns = el.querySelectorAll('td');
          return Array.from(columns, column => column.innerText);
        });
        rows.push(row);
      }

      console.log(rows); // Apenas para verificação dos dados

      // Criar um novo workbook e uma nova worksheet
      const workbook = xlsx.utils.book_new();
      const worksheet = xlsx.utils.aoa_to_sheet(rows);

      // Adicionar a worksheet ao workbook
      xlsx.utils.book_append_sheet(workbook, worksheet, 'Dados');

      // Escrever o arquivo Excel
      xlsx.writeFile(workbook, 'dados.xlsx');

      console.log('Dados exportados para dados.xlsx');
    } else {
      console.log("Frame não encontrado");
    }
  } else {
    console.log("iframe não encontrado");
  }

  await browser.close();
})();
