const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false, timeout: 60000 }); // Defina headless como false para ver o navegador em ação
  const page = await browser.newPage();
  await page.goto('http://riodejaneiro1.dcfiorilli.com.br:8079/Transparencia/Default.aspx?AcessoIndividual=LnkServidores', { waitUntil: 'networkidle2' });

  // Esperar o seletor do menu estar visível e clicar nele
  const selector = '#divGridListaPessoal';

  // Esperar o botão "lnkDadosAbertos" estar visível e clicar nele, aguardando a navegação
  // Please make try and cat on the line    
  // Please make try and cat on the line 
  try{
  await page.waitForSelector('#lnkDadosAbertos', { timeout: 30000 });
}
catch (){
   
}
  await page.waitForSelector('#gridPessoal_DXDataRow10', { timeout: 60000000 });
  // Clicar no botão
  await page.click('#lnkDadosAbertos');
  console.log("achouwww")
  // Seletor da tabela
  
  // Esperar a tabela estar visível
  await page.waitForSelector(selector, {timeout: 60000000 });
  consolelog("achou")
  // Extrair dados da tabela
  const result = await page.$$eval('#example-table tr', rows => {
    return Array.from(rows, row => {
      const columns = row.querySelectorAll('td');
      return Array.from(columns, column => column.innerText);
    });
  });
  
  console.log(result[1][2]);
  
  

  await browser.close();
})();
