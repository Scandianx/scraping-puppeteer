const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false, timeout: 60000 }); // Defina headless como false para ver o navegador em ação
  const page = await browser.newPage();
  await page.goto('http://riodejaneiro1.dcfiorilli.com.br:8079/Transparencia/Default.aspx?AcessoIndividual=LnkServidores', { waitUntil: 'networkidle2' });

  // Esperar o seletor do menu estar visível e clicar nele
  

  // Esperar o botão "lnkDadosAbertos" estar visível e clicar nele, aguardando a navegação
  
  await page.waitForSelector('#lnkDadosAbertos', { timeout: 3000000 });
  
  // Clicar no botão
  await page.click('#lnkDadosAbertos');
  console.log("achouwww")
  // Seletor da tabela
  const selector = '#divGridListaPessoal';
  
  // Esperar a tabela estar visível
  await page.waitForSelector(selector, { visible: true, timeout: 60000000 });
  consolelog("achou")
  // Extrair dados da tabela
  const tableData = await page.evaluate((selector) => {
    const rows = Array.from(document.querySelectorAll(`${selector} tr`));
    return rows.map(row => {
      const columns = Array.from(row.querySelectorAll('td'));
      return columns.map(column => column.textContent.trim());
    });
  }, selector);
  
  console.log(tableData);

  await browser.close();
})();
