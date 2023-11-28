const botaoCor = document.getElementById('button-random-color');
const limpar = document.getElementById('clear-board');
const vqv = document.getElementById('generate-board');
const cores = document.getElementsByClassName('color');
let pixels = document.getElementsByClassName('pixel');
const pixelBoard = document.getElementById('pixel-board');

let selectedColor = 'black';
let randomizado = false;
let paletaGuardadas = [];
let pixelsGuardados = new Array(pixels.length).fill('white');

function randomizarPaleta() {
  let corRandom;

  for (let i = 1; i < cores.length; i += 1) {
    corRandom = Math.floor(Math.random() * 16777215).toString(16);
    cores[i].style.backgroundColor = `#${corRandom}`;
    paletaGuardadas[i] = `#${corRandom}`;
  }

  localStorage.setItem('colorPalette', JSON.stringify(paletaGuardadas));
  randomizado = true;
}

function recuperarPaleta() {
  paletaGuardadas = JSON.parse(localStorage.getItem('colorPalette'));

  for (let j = 1; j < cores.length; j += 1) {
    cores[j].style.backgroundColor = paletaGuardadas[j];
  }
}

function trocarCor(index) {
  pixelsGuardados.length = pixels.length;
  pixels[index].style.backgroundColor = selectedColor;
  pixelsGuardados[index] = selectedColor;

  localStorage.setItem('pixelBoard', JSON.stringify(pixelsGuardados));
}

function recuperarBoard() {
  const input = parseInt(localStorage.getItem('boardSize'), 10);
  pixelBoard.innerHTML = '';

  for (let i = 0; i < input; i += 1) {
    const novaLinha = document.createElement('div');
    novaLinha.classList.add('linha');
    pixelBoard.appendChild(novaLinha);

    for (let j = 0; j < input; j += 1) {
      const aux = (i * input) + j;
      const novoPixel = document.createElement('div');
      novoPixel.classList.add('pixel');
      novaLinha.appendChild(novoPixel);
      novoPixel.addEventListener('click', () => { trocarCor(aux); });
    }
  }

  pixels = document.getElementsByClassName('pixel');
}

function recuperarPixels() {
  pixelsGuardados = JSON.parse(localStorage.getItem('pixelBoard'));

  for (let j = 0; j < pixels.length; j += 1) {
    pixels[j].style.backgroundColor = pixelsGuardados[j];
  }
}

function pegarCor(index) {
  const selected = document.getElementsByClassName('selected');
  selected[0].classList.remove('selected');
  cores[index].classList.add('selected');

  if (index === 0 || !randomizado) {
    const estilo = window.getComputedStyle(cores[index]);
    selectedColor = estilo.getPropertyValue('background-color');
  } else {
    selectedColor = cores[index].style.backgroundColor;
  }
}

function limparBoard() {
  for (let k = 0; k < pixels.length; k += 1) {
    pixels[k].style.backgroundColor = 'white';
    pixelsGuardados[k] = 'white';
  }

  localStorage.setItem('pixelBoard', JSON.stringify(pixelsGuardados));
}

function gerarTabela(input) {
  for (let i = 0; i < input; i += 1) {
    const novaLinha = document.createElement('div');
    novaLinha.classList.add('linha');
    pixelBoard.appendChild(novaLinha);

    for (let j = 0; j < input; j += 1) {
      const aux = (i * input) + j;
      pixelsGuardados[aux] = 'white';
      const novoPixel = document.createElement('div');
      novoPixel.classList.add('pixel');
      novaLinha.appendChild(novoPixel);
      novoPixel.addEventListener('click', () => { trocarCor(aux); });
    }
  }

  localStorage.setItem('boardSize', input.toString());
  localStorage.setItem('pixelBoard', JSON.stringify(pixelsGuardados));
}

function pegarInput() {
  const input = document.getElementById('board-size').value;

  if (input === '') {
    alert('Board inválido!');
  } else {
    let nInput = parseInt(input, 10);

    if (nInput < 5) {
      nInput = 5;
    } else if (nInput > 50) {
      nInput = 50;
    }

    pixelBoard.innerHTML = '';
    gerarTabela(nInput);
    pixels = document.getElementsByClassName('pixel');
  }
}

function start() {
  if (localStorage.getItem('boardSize') !== null) {
    recuperarBoard();
  }
  if (localStorage.getItem('colorPalette') !== null) {
    recuperarPaleta();
    randomizado = true;
  }

  if (localStorage.getItem('pixelBoard') !== null) {
    recuperarPixels();
  }
}

window.onload = start;
botaoCor.addEventListener('click', randomizarPaleta);
limpar.addEventListener('click', limparBoard);
vqv.addEventListener('click', pegarInput);

for (let j = 0; j < cores.length; j += 1) {
  cores[j].addEventListener('click', () => { pegarCor(j); });
}

for (let k = 0; k < pixels.length; k += 1) {
  pixels[k].addEventListener('click', () => { trocarCor(k); });
}
