const puppeteer = require('puppeteer');
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  const browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'] }); // Para ver o navegador em ação
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('http://riodejaneiro1.dcfiorilli.com.br:8079/Transparencia/Default.aspx?AcessoIndividual=LnkServidores', { waitUntil: 'networkidle2' });

  try {
    // Esperar o seletor do menu estar visível e clicar nele
    await page.waitForSelector("tbody", { timeout: 600000 });
    console.log("tbody encontrado");

    await page.waitForSelector('tbody > tr', { timeout: 60000 });
    console.log("linhas no tbody encontradas");

    await page.waitForSelector('#lnkDadosAbertos', { timeout: 30000 });
    await page.click('#lnkDadosAbertos');
    console.log("clicou no button");
    await sleep(20000);
    await page.waitForSelector('#gridPessoal_DXDataRow25 .dxgv.align_right');
    console.log("700 no meu bolso hoje ainda");
    const element = await page.evaluate(() => {
      const targetElement = document.querySelector('/html/body/form/div[3]/div/div[2]/div[5]/table[@id="gridPessoal"]/tbody/tr/td/div[1]/table/tbody/tr[3]/td[@id="gridPessoal_DXDataRow3"]');
      if (targetElement) {
        console.log("fe");
        return targetElement.textContent; // Example: extract text content
      } else {
        return null; // Handle the case where the element is not found
      }
    });
    
    if (element) {
      console.log("Element found! Content:", element);
    } else {
      console.log("Element not found.");
    }
    
    const rowData = await page.evaluate(() => {
      const row = document.querySelector('#gridPessoal_DXDataRow0');
      if (!row) return null;
      
      // Extrair os dados dos elementos da linha
      const cells = row.querySelectorAll('td');
      return {
        detalhe: cells[0].innerText.trim(),
        referencia: cells[1].innerText.trim(),
        proventos: cells[2].innerText.trim(),
        liquido: cells[3].innerText.trim(),
        nome: cells[4].innerText.trim(),
        divisao: cells[5].innerText.trim(),
        dataAdmissao: cells[6].innerText.trim(),
        dataDesligamento: cells[7].innerText.trim()
      };
    });

    console.log(rowData);
  } catch (error) {
    console.error("Erro ao aguardar o seletor ou clicar:", error);
  }

  await browser.close();
})();


