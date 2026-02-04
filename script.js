const BotaoJogarCarta = document.querySelector('.Jogar_Carta');

const MinhasCartas = document.querySelectorAll('.Cartas');
const CartaEscolhidaE = document.querySelector('.Minha_Carta');
const CartaEscolhidaO = document.querySelector('.Maquina_Carta');
const Carta_Mao = document.querySelectorAll('.Carta_Mao');

// Placar
const Meus_Pontos = document.querySelector('.Meus_Pontos');
const Maquina_Pontos = document.querySelector('.Maquina_Pontos');
const Pontos_Rodada = document.querySelector('.Pontos_Rodada');
const Total_Player = document.querySelector('.Total_Player');
const Total_Maquina = document.querySelector('.Total_Maquina');
const resultadoDuelo = document.querySelector('.Resultado_Duelo');

// Minha Carta Ataque
const minhaCartaImagem = document.querySelector('#Minha_Carta_Imagem');
const minhaCartaAtaque = document.querySelector('#Minha_Carta_Ataque');
const minhaCartaDefesa = document.querySelector('#Minha_Carta_Defesa');

const cartaOponenteImagem = document.querySelector('#Maquina_Carta_Imagem');
const cartaOponenteAtaque = document.querySelector('#Maquina_Carta_Ataque');
const cartaOponenteDefesa = document.querySelector('#Maquina_Carta_Defesa');

const totalRodadas = 3;



const TodasCartas = [
    { nome: 'Dragao Branco', imagem: 'images/image_2.jpg', ataque: 3000, defesa: 2500 },
    { nome: 'Rei Caveira', imagem: 'images/image_1.jpg', ataque: 2500, defesa: 1200 },
    { nome: 'Mago Negro', imagem: 'images/image_3.jpg', ataque: 2500, defesa: 2100 },
    { nome: 'Exodia', imagem: 'images/image_11.jpg', ataque: 1000, defesa: 1000 },
    { nome: 'Olhos Vermelhos', imagem: 'images/image_4.jpg', ataque: 2400, defesa: 2000 },
    { nome: 'Kuriboh', imagem: 'images/image_10.jpg', ataque: 300, defesa: 200 },
    { nome: 'Slifer', imagem: 'images/image_7.jpg', ataque: 3000, defesa: 3000},
    { nome: 'Meteor B Dragon', imagem: 'images/image_5.jpg', ataque: 3500, defesa: 2500},
    { nome: 'Maldição do Dragão', imagem: 'images/image_8.jpg', ataque: 2000, defesa: 1500},

];

const Costas_Carta = 'images/image_9.jpg';



MinhasCartas.forEach((carta) => {
    carta.addEventListener('click', (e) => {
        let imgClicada = carta.querySelector('img');
        if (!imgClicada) return; /* codigo indicado pelo GPT */


        MinhasCartas.forEach((outrasCartas) => {
            let imgOutra = outrasCartas.querySelector("img")

            if (imgOutra !== imgClicada) imgOutra.classList.remove("Selecionada")
        });
        
        imgClicada.classList.toggle("Selecionada");

    });

 
});


const carta_1 = document.querySelector('#Minha_Carta_1');
const carta_2 = document.querySelector('#Minha_Carta_2');
const carta_3 = document.querySelector('#Minha_Carta_3');
const cartas = [carta_1, carta_2, carta_3];

const ataque_1 = document.getElementById('Ataque_1');
const ataque_2 = document.getElementById('Ataque_2');
const ataque_3 = document.getElementById('Ataque_3');
const ataques = [ataque_1, ataque_2, ataque_3];

const defesa_1 = document.getElementById('Defesa_1');
const defesa_2 = document.getElementById('Defesa_2');
const defesa_3 = document.getElementById('Defesa_3');
const defesas = [defesa_1, defesa_2, defesa_3];




const TOTAL_CARTAS_MAO = 3;

let meus_Pontos = 0
let maquina_Pontos = 0

let total_Player = 0;
let total_Maquina = 0;

let rodada_Atual = 1;


function embaralhar(cartas) {
  const copia = [...cartas];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}


let maoPlayer = [];
let maoMaquina = [];


function atualizarMaoPlayer() {
  for (let i = 0; i < TOTAL_CARTAS_MAO; i++) {
    if(!maoPlayer[i]) continue;
    cartas[i].src = maoPlayer[i].imagem;
    ataques[i].textContent = `Ataque:${maoPlayer[i].ataque}`;
    defesas[i].textContent = `Defesa:${maoPlayer[i].defesa}`;
  }

}


function iniciarDuelo() {


  const baralho = embaralhar(TodasCartas);
  maoPlayer = baralho.splice(0, TOTAL_CARTAS_MAO);
  maoMaquina = baralho.splice(0, TOTAL_CARTAS_MAO);
  console.log(maoMaquina)

  Carta_Mao.forEach((Carta_Mao) => {
    Carta_Mao.classList.remove('Desativada');
  })

  minhaCartaAtaque.textContent = `Ataque:${0}`;
  minhaCartaDefesa.textContent = `Defesa:${0}`;
  minhaCartaImagem.src = Costas_Carta;

  cartaOponenteAtaque.textContent = `Ataque:${0}`;
  cartaOponenteDefesa.textContent = `Defesa:${0}`;
  cartaOponenteImagem.src = Costas_Carta;



  atualizarRodada()
  atualizarMaoPlayer();

}


function atualizarRodada () {
  //  bagulho feio da poha

    if(maoMaquina.length === 3 ) {
      rodada_Atual = 1
    }

    if(maoMaquina.length === 2) {
      rodada_Atual = 2
    }

    if(maoMaquina.length === 1 ) {
      rodada_Atual = 3
    }

    console.log(rodada_Atual)
    
    Pontos_Rodada.textContent = `Rodada:${rodada_Atual}/3`
}


BotaoJogarCarta.addEventListener('click', (e) => {
    const cartaSelecionada = document.querySelector('.Selecionada');
    if (!cartaSelecionada) {
        resultadoDuelo.textContent = 'Escolha uma carta na mão';
        return;
    }
    
    const CartaEscolhida = cartaSelecionada.closest('.Carta_Mao');

    const imagemCartaEscolhida = CartaEscolhida.querySelector('img');

    const CartaEscolhidaT = imagemCartaEscolhida.getAttribute('src');

    const indice = maoPlayer.findIndex(c => c.imagem === CartaEscolhidaT); /* codigo feito pelo GPT */ 


    if (indice === -1) {
      resultadoDuelo.textContent = 'Não achei essa carta no array';
      return;
    }


    CartaEscolhida.classList.add('Desativada');
    cartaSelecionada.classList.remove('Selecionada');

    let cartaJogada = maoPlayer.splice(indice, 1)[0];
    let cartaJogadaOponente = maoMaquina.splice(0, 1)[0];
    let cartaOponenteAtaqueValor = cartaJogadaOponente.ataque;
    let cartaOponenteDefesaValor = cartaJogadaOponente.defesa;



    cartaOponenteAtaque.textContent = `Ataque:${cartaOponenteAtaqueValor}`;
    cartaOponenteDefesa.textContent = `Defesa:${cartaOponenteDefesaValor}`;
    cartaOponenteImagem.src = cartaJogadaOponente.imagem;

    let cartaJogadaAtaque = cartaJogada.ataque;
    let cartaJogadaDefesa = cartaJogada.defesa;
    let cartaJogadaImagem = cartaJogada;



    minhaCartaAtaque.textContent = `Ataque:${cartaJogadaAtaque}`
    minhaCartaDefesa.textContent = `Defesa:${cartaJogadaDefesa}`
    minhaCartaImagem.src = cartaJogadaImagem.imagem;

    atualizarRodada()

    horaDoDuelo(cartaJogadaAtaque, cartaOponenteAtaqueValor);

    verificarFimDeRodada(meus_Pontos, maquina_Pontos)

      if(maoPlayer.length === 0) {
        iniciarDuelo();

    };
});



function verificarFimDeRodada() {
  if((meus_Pontos >= 2 || maquina_Pontos >= 2)) {

    somandoMelhoDe3()

    meus_Pontos = 0;
    maquina_Pontos = 0;
    
    Meus_Pontos.textContent = `Meus Pontos: ${0}`;
    Maquina_Pontos.textContent = `Pontos do Oponente: ${0}`;

    console.log(meus_Pontos)
    console.log(maquina_Pontos)

    
    iniciarDuelo()



  }
}

function horaDoDuelo (cartaJogadaAtaque, cartaOponenteAtaqueValor) {




  if (cartaJogadaAtaque > cartaOponenteAtaqueValor) {
    resultadoDuelo.textContent = 'Você venceu o duelo!';
    meus_Pontos++
    Meus_Pontos.textContent = `Meus Pontos: ${meus_Pontos}`;
  } else if (cartaJogadaAtaque < cartaOponenteAtaqueValor) {
    resultadoDuelo.textContent = 'Você perdeu o duelo!';
    maquina_Pontos++
    Maquina_Pontos.textContent = `Pontos do Oponente: ${maquina_Pontos}`;
  } else {
    resultadoDuelo.textContent = 'Empate!';
  }
  


}



function somandoMelhoDe3 () {
  if (meus_Pontos > maquina_Pontos) {
      total_Player++
      Total_Player.textContent = `Total Player: ${total_Player}`;
  } else if (maquina_Pontos > meus_Pontos) {
      total_Maquina++
      Total_Maquina.textContent = `Total Maquina: ${total_Maquina}`;
  }


}



console.log(meus_Pontos)
console.log(maquina_Pontos)

iniciarDuelo();




// ////////////////////////




