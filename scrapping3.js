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
    await sleep(60000);
    const frame = await page.frames().find(f => f.name() === 'iframe');
    const button = await frame.$('#divGridListaPessoal');
    console.log(button)

    for (let i = 0; i <= 10; i++) {
      const selector = `#gridPessoal_DXDataRow${i} > td:nth-child(3) > div`;
      const element3 = await page.$(selector);
      const element4 = await page.$$(selector);
      if (element3 || element4) {
        console.log(element3)
        console.log(element4 + e)
      }
      else {
        console.log("não encontrou o elemento")
      }
    }
    

    
    const selector = `#gridPessoal_DXDataRow0 > td:nth-child(3) > div`;
    const element3 = await page.$(selector);
    console.log(element3);
  
  console.log("kkkkkkkkkkkk como sou burro")
    const element = await page.evaluate(() => {
      
      let table = document.getElementById('#divGridListaPessoal');
      console.log(table)
      const targetElement = document.querySelector('#divGridListaPessoal')
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


