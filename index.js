const ServicoCalculoFatura = require('./ServicoCalculoFatura'); // ou o nome correto do arquivo

const { readFileSync } = require('fs');

function gerarFaturaStr(fatura, pecas, calc) {
  let faturaStr = `Fatura ${fatura.cliente}\n`;
  for (let apre of fatura.apresentacoes) {
    faturaStr += `  ${calc.getPeca(pecas, apre).nome}: ${formatarMoeda(calc.calcularTotalApresentacao(calc.getPeca(pecas, apre), apre))} (${apre.audiencia} assentos)\n`;
  }
  faturaStr += `Valor total: ${formatarMoeda(calc.calcularTotalFatura(pecas, fatura.apresentacoes))}\n`;
  faturaStr += `Créditos acumulados: ${calc.calcularTotalCreditos(pecas, fatura.apresentacoes)} \n`;
  return faturaStr;
}

// function gerarFaturaHTML(fatura, pecas, calc) {
//   let faturaStr = '<html>\n'
//   faturaStr = `<p> Fatura ${fatura.cliente} <p>\n`;
//   faturaStr += `<ul>\n`
//   for (let apre of fatura.apresentacoes) {
//     faturaStr += `<li>  ${calc.getPeca(pecas, apre).nome}: ${formatarMoeda(calc.calcularTotalApresentacao(calc.getPeca(pecas, apre), apre))} (${apre.audiencia} assentos) </li>\n`;
//   }
//   faturaStr += `</ul>\n`
//   faturaStr += `<p> Valor total: ${formatarMoeda(calc.calcularTotalFatura(pecas, fatura.apresentacoes))}</p>\n`;
//   faturaStr += `<p> Créditos acumulados: ${calc.calcularTotalCreditos(pecas, fatura.apresentacoes)} </p> \n`;
//   return faturaStr;
// }

function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR",
    {
      style: "currency", currency: "BRL",
      minimumFractionDigits: 2
    }).format(valor / 100);
}


const calc = new ServicoCalculoFatura();
const faturas = JSON.parse(readFileSync('./faturas.json'));
const pecas = JSON.parse(readFileSync('./pecas.json'));
const faturaStr = gerarFaturaStr(faturas, pecas, calc);
// const faturaHtml = gerarFaturaHTML(faturas, pecas, calc);
console.log(faturaStr);
// console.log(faturaHtml);
