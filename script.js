const jogos = {
  "streets of rage": {
    nome: "Streets of Rage",
    imagem: "assets/SOR.png",
    musicas: [
      { titulo: "The Street of Rage", arquivo: "assets/som1.mp3" },
      { titulo: "Player Select", arquivo: "assets/som2.mp3" },
      { titulo: "Fighting in the Street", arquivo: "assets/som3.mp3" },
      { titulo: "Dilapidated Town", arquivo: "assets/som4.mp3" }
    ]
  },

  "sonic": {
    nome: "Sonic the Hedgehog",
    imagem: "assets/sonic.jpg",
    musicas: [
      { titulo: "Title Theme", arquivo: "assets/sonic1.mp3" },
      { titulo: "Green Hill Zone", arquivo: "assets/sonic2.mp3" },
      { titulo: "Marble Zone", arquivo: "assets/sonic3.mp3" },
      { titulo: "Spring Yard Zone", arquivo: "assets/sonic4.mp3" }
    ]
  },

  "resident evil": {
    nome: "Resident Evil",
    imagem: "assets/reco.jpg",
    musicas: [
      { titulo: "Save Room - RE1", arquivo: "assets/RE1.mp3" },
      { titulo: "Save Room - RE2", arquivo: "assets/RE2.mp3" },
      { titulo: "Save Room - RE3", arquivo: "assets/RE3.mp3" },
      { titulo: "Save Room - RE Code Veronica", arquivo: "assets/REveronica.mp3" }
    ]
  }
};




const aliases = {
  "sonic the hedgehog": "sonic",
  "sor": "streets of rage",
  "street of rage": "streets of rage"
};


const input = document.getElementById("gameInput");

if (input) {
  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      verificarJogo();
    }
  });
}


function normalizarNome(nome) {
  nome = nome.toLowerCase().trim();
  return aliases[nome] || nome;
}


function verificarJogo() {
  const valor = normalizarNome(input.value);
  const mensagem = document.getElementById("mensagem");

  if (jogos[valor]) {
    localStorage.setItem("jogoSelecionado", valor);

    document.body.classList.add("fade-out");

    setTimeout(() => {
      window.location.href = "player.html";
    }, 600);
  } else {
    mensagem.textContent = "Comando inválido...";
  }
}

let audioAtual = null;
let somClick = new Audio("assets/click.mp3");
let musicasDoJogo = [];


window.addEventListener("DOMContentLoaded", () => {
  const jogoSelecionado = localStorage.getItem("jogoSelecionado");

  if (jogoSelecionado && jogos[jogoSelecionado]) {
    const jogo = jogos[jogoSelecionado];
    musicasDoJogo = jogo.musicas;

    const imagem = document.getElementById("gameImage");
    if (imagem) {
      imagem.src = jogo.imagem;
    }
  }
});


function tocarSom(tipo) {
  somClick.currentTime = 0;
  somClick.play();

  if (audioAtual) {
    audioAtual.pause();
    audioAtual.currentTime = 0;
  }

  const indice = {
    som1: 0,
    som2: 1,
    som3: 2,
    som4: 3
  }[tipo];

  const musica = musicasDoJogo[indice];
  if (!musica) return;

  audioAtual = new Audio(musica.arquivo);
  audioAtual.play();

  const texto = document.getElementById("nomeMusica");
  if (texto) {
    texto.innerHTML = `<span class="cursor">></span> ${musica.titulo}`;
  }

  animarTV();
}


function animarTV() {
  const tela = document.getElementById("gameImage");
  if (!tela) return;

  tela.classList.add("glitch");

  setTimeout(() => {
    tela.classList.remove("glitch");
  }, 300);
}
