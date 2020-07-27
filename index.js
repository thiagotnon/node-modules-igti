import {promises as fs } from 'fs';

generateUfFiles()
async function readJsons() {
  const cidades = JSON.parse(await fs.readFile('Cidades.json'));
  const estados = JSON.parse(await fs.readFile('Estados.json'));
  return {
    cidades,
    estados
  }
}
const mapear = (result, {Estado: estado, ...cidade}) => {
  const acumulator = result.get(estado) || [];
  return result.set(estado,[...acumulator, cidade]);
};
const salvar = (mapa, {ID: id, Sigla: sigla }) => {
  fs.writeFile(`./estados/${sigla}.json`, JSON.stringify(mapa.get(id), null, 2))
}
async function generateUfFiles(){
  const files = await readJsons();
  const { estados, cidades } = files;

  const mapa = cidades.reduce(mapear, new Map());
  estados.forEach((estado) => salvar(mapa, estado));

  estados.forEach(estado => {
    const uf = estado.Sigla
    countCities(uf)
  })
}

function countCities(uf){
  const result = JSON.parse(fs.readFile(`./estados/${uf}.json`));
}

