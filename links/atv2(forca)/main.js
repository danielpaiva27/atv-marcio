const resultado = document.getElementById("resultado");
const inputResposta = document.getElementById("input-resposta");
const inputLetra = document.getElementById("input-letras");
const caixaInformacao = document.getElementById("caixa-informada");
const caixaErrada = document.getElementById("caixa-errada");
const outputLetras = document.getElementsByClassName("resultado");
const letrasPalavra = getPalavra();
const letrasInformadas = [];
const letrasErradas = [];

function gerarNumero(min, max) {
  min > max ? ([min, max] = [max, min]) : false;
  return Math.floor(Math.random() * (max - min) + min);
}

function getPalavra() {
  const palavras = [
    "Amarelo",
    "Amiga",
    "Amor",
    "Ave",
    "Aviao",
    "Avo",
    "Balao",
    "Bebe",
    "Bolo",
    "Branco",
    "Cama",
    "Caneca",
    "Celular",
    "Clube",
    "Copo",
    "Doce",
    "Elefante",
    "Escola",
    "Estojo",
    "Faca",
    "Foto",
    "Garfo",
    "Geleia",
    "Girafa",
    "Janela",
    "Limonada",
    "Mae",
    "Meia",
    "Noite",
    "Oculos",
    "Onibus",
    "Ovo",
    "Pai",
    "Pao",
    "Parque",
    "Passarinho",
    "Peixe",
    "Pijama",
    "Rato",
    "Umbigo",
  ];
  const numeroGerado = gerarNumero(0, palavras.length);
  const palavra = palavras[numeroGerado];

  const letrasPalavra = palavra.split("").map((e) => e.toUpperCase());
  letrasPalavra.forEach(
    (e) =>
      (resultado.innerHTML +=
        "<input type='text' class='resultado' size='2' readonly>")
  );

  return letrasPalavra;
}

function verificarLetra() {
  let letraAgora = document.getElementById("input-letras").value;
  letraAgora = letraAgora.toUpperCase();

  if (letraAgora.length === 0) {
    alert("[ERRO] Insira uma letra");
  } else {
    const valorConferenciaDaLetra = conferirSeALetraJaFoiChutada(letraAgora);

    if (valorConferenciaDaLetra === true) {
      alert(`Letra já informada, tente novamente`);
      document.getElementById("input-letras").focus();
      document.getElementById("input-letras").value = "";
    } else if (valorConferenciaDaLetra === false) {
      letrasInformadas.push(letraAgora);
      letrasPalavra.indexOf(letraAgora) !== -1
        ? acertouLetra(letraAgora)
        : errouLetra(letraAgora);
      document.getElementById("input-letras").focus();
      document.getElementById("input-letras").value = "";
    }
  }
  caixaInformacao.innerHTML = `<p>Letras informadas: ${letrasInformadas}</p>`;
}

function verificarResposta() {
  const resposta = document.getElementById("input-resposta").value;
  const letrasResposta = resposta.split("").map((e) => e.toUpperCase());

  if (letrasResposta.length == letrasPalavra.length) {
    let acertos = 0;
    letrasResposta.forEach((e, i) =>
      e === letrasPalavra[i] ? ++acertos : false
    );
    acertos === letrasResposta.length
      ? mostrarQueAcertou()
      : mostrarQuePerdeu();
  } else {
    alert("As palavras não tem o mesmo tamanho");
  }
}

function conferirSeALetraJaFoiChutada(letraAgora) {
  return letrasInformadas.indexOf(letraAgora) !== -1 &&
    letrasPalavra.indexOf(letraAgora) == -1
    ? true
    : false;
}

function acertouLetra(letraAgora) {
  const letrasPalavraMudavel = letrasPalavra.map((e) => e);

  if (letrasPalavraMudavel.indexOf(letraAgora) !== -1) {
    let quantasVezesALetraAparece;

    letrasPalavra.forEach((e) =>
      e == letraAgora
        ? (quantasVezesALetraAparece = (quantasVezesALetraAparece || 0) + 1)
        : false
    );

    for (let i = 1; i <= quantasVezesALetraAparece; i++) {
      outputLetras[letrasPalavra.indexOf(letraAgora)].value = letraAgora;
      letrasPalavraMudavel.splice(letrasPalavra.indexOf(letraAgora), 1, " ");
    }
  }
  verificarSeTemMenosDeTresLetras();
}

function errouLetra(letraAgora) {
  letrasErradas.push(letraAgora);
  let quantasVezesErrou = letrasErradas.length;
  caixaErrada.innerHTML = `<p>Letras erradas: ${letrasErradas}</p>`;

  const imgs = [
    "../atv2(forca)/imgs/forca.png",
    "../atv2(forca)/imgs/forca-cabeca.png",
    "../atv2(forca)/imgs/forca-tronco.png",
    "../atv2(forca)/imgs/forca-braco1.png",
    "../atv2(forca)/imgs/forca-braco2.png",
    "../atv2(forca)/imgs/forca-perna1.png",
    "../atv2(forca)/imgs/forca-perna2.png",
  ];
  const imgAtual = document.getElementById("img-forca");
  quantasVezesErrou < 6
    ? (imgAtual.src = imgs[quantasVezesErrou])
    : mostrarQuePerdeu();
}

function mostrarQuePerdeu() {
  document.getElementById("input-letras").setAttribute("readonly", "");
  for (let i = 0; i < outputLetras.length; ++i) {
    if (outputLetras[i].value === "") {
      outputLetras[i].value = letrasPalavra[i];
      outputLetras[i].style.color = "red";
    } else {
      outputLetras[i].style.color = "green";
    }
  }
  alert("Infelizmente você perdeu, tente novamente");
  document.getElementById("img-forca").src = "img/forca-perna2.png";

  setInterval(() => location.reload(), 5000);
}

function verificarSeTemMenosDeTresLetras() {
  let quantasLetrasFaltam = 0;
  for (let i = 0; i < outputLetras.length; ++i) {
    outputLetras[i].value === "" ? quantasLetrasFaltam++ : false;
  }

  quantasLetrasFaltam <= 1
    ? (document.getElementById("input-letras").setAttribute("readonly", ""),
      alert("Chute uma palavra"))
    : false;
}
function mostrarQueAcertou() {
  for (let i = 0; i < outputLetras.length; ++i) {
    outputLetras[i].value = letrasPalavra[i];
    outputLetras[i].style.color = "green";
  }
  alert("Parabéns! Você acertou a palavra, vamos mais uma vez?");
  setInterval(() => location.reload(), 5000);
}