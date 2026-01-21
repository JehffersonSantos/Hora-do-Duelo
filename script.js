const BotaoJogarCarta = document.querySelector('.Jogar_Carta');
const MinhasCartas = document.querySelectorAll('.Cartas');
const CartaEscolhidaE = document.querySelector('.Minha_Carta');
const CartaEscolhidaO = document.querySelector('.Maquina_Carta');
const Carta_Mao = document.querySelector('.Carta_Mao');


const Meus_Pontos = document.querySelector('.Meus_Pontos');
const Maquina_Pontos = document.querySelector('.Maquina_Pontos');
const Pontos_Rodada = document.querySelector('.Pontos_Rodada');
const Total_Player = document.querySelector('.Total_Player');
const Total_Maquina = document.querySelector('.Total_Maquina');

const Baralho = [
    { nome: 'Dragao Branco', imagem: 'images/image_1.jpg', ataque: 3000, defesa: 2500 },
    { nome: 'Mago Negro', imagem: 'images/image_2.jpg', ataque: 2500, defesa: 2100 },
    { nome: 'Exodia', imagem: 'images/image_11.jpg', ataque: 1000, defesa: 1000 },
    { nome: 'Olhos Vermelhos', imagem: 'images/image_8.jpg', ataque: 2400, defesa: 2000 },
    { nome: 'Kuriboh', imagem: 'images/image_10.jpg', ataque: 300, defesa: 200 },
    { nome: 'Slifer', imagem: 'images/image_7.jpg', ataque: 3000, defesa: 3000},
    { nome: 'Meteor B Dragon', imagem: 'images/image_5.jpg', ataque: 3500, defesa: 2500}
];




MinhasCartas.forEach((carta) => {
    carta.addEventListener('click', (e) => {
        let imgClicada = carta.querySelector('img');
        if (!imgClicada) return; /* codigo indicado pelo GPT */
        console.log(imgClicada);

        MinhasCartas.forEach((outrasCartas) => {
            let imgOutra = outrasCartas.querySelector("img")
            // console.log(imgOutra);
            if (imgOutra !== imgClicada) imgOutra.classList.remove("Selecionada")
        });
        
        imgClicada.classList.toggle("Selecionada");

        
        
    });



    
});













function trocarCarta(id) { 
    imagemCard.addEventListener('transitionend', () => {
        imagemCard.setAttribute('src', `images/image_${id}.jpg`);
    },  { once: true });
    atualizarDescricao(id);
};



function virarCarta() {
  imagemCard.setAttribute('src', carta_virada);
  imagemCard.classList.add("trocando");
  setTimeout(() => {
  imagemCard.classList.remove("trocando");
  }, 400);
  
  // imagemCard.addEventListener('transitionend', () => {
  //     imagemCard.setAttribute('src', carta_virada);
  // });
};


BotaoJogarCarta.addEventListener('click', (e) => {
    console.log("clicou")
})



CartaEscolhidaE.addEventListener('click', (e) => {
    console.log('clicou na minha carta')
})


CartaEscolhidaO.addEventListener('click', (e) => {
    console.log('Clicou na carta oponente')
})
