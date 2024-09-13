const ServicoCalculoFatura = require('./ServicoCalculoFatura');
const Repositorio = require('./Repositorio');

const { readFileSync } = require('fs');

function gerarFaturaStr(fatura, calc) {
  let faturaStr = `Fatura ${fatura.cliente}\n`;
  for (let apre of fatura.apresentacoes) {
    faturaStr += `  ${calc.repo.getPeca(apre).nome}: ${formatarMoeda(calc.calcularTotalApresentacao(calc.repo.getPeca(apre), apre))} (${apre.audiencia} assentos)\n`;
  }
  faturaStr += `Valor total: ${formatarMoeda(calc.calcularTotalFatura(fatura.apresentacoes))}\n`;
  faturaStr += `Créditos acumulados: ${calc.calcularTotalCreditos(fatura.apresentacoes)} \n`;
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


const faturas = JSON.parse(readFileSync('./faturas.json'));
const calc = new ServicoCalculoFatura(new Repositorio());
const faturaStr = gerarFaturaStr(faturas, calc);
console.log(faturaStr);
// const faturaHtml = gerarFaturaHTML(faturas, pecas, calc);
// console.log(faturaHtml);
