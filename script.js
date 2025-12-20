const escolherCarta = document.querySelector('.Jogar_Carta');
const cartasMao = document.querySelectorAll('.Carta_Mao');
const resultadoDuelo = document.querySelector('.Resultado_Duelo');
const meusPontosEl = document.querySelector('.Meus_Pontos');
const maquinaPontosEl = document.querySelector('.Maquina_Pontos');
const pontosRodadaEl = document.querySelector('.Pontos_Rodada');
const totalPlayerEl = document.querySelector('.Total_Player');
const totalMaquinaEl = document.querySelector('.Total_Maquina');

const minhaCartaImagem = document.querySelector('#Minha_Carta_Imagem');
const minhaCartaAtaque = document.querySelector('#Minha_Carta_Ataque');
const minhaCartaDefesa = document.querySelector('#Minha_Carta_Defesa');

const maquinaCartaImagem = document.querySelector('#Maquina_Carta_Imagem');
const maquinaCartaAtaque = document.querySelector('#Maquina_Carta_Ataque');
const maquinaCartaDefesa = document.querySelector('#Maquina_Carta_Defesa');

const cartasMaquina = [
    { nome: 'Dragao Branco', imagem: 'images/image_1.jpg', ataque: 3000, defesa: 2500 },
    { nome: 'Mago Negro', imagem: 'images/image_2.jpg', ataque: 2500, defesa: 2100 },
    { nome: 'Exodia', imagem: 'images/image_7.jpg', ataque: 1000, defesa: 1000 },
    { nome: 'Olhos Vermelhos', imagem: 'images/image_8.jpg', ataque: 2400, defesa: 2000 },
    { nome: 'Kuriboh', imagem: 'images/image_9.jpg', ataque: 300, defesa: 200 },
];

let cartaSelecionada = null;

const extrairNumero = (texto) => {
    const valor = Number(texto.replace(/[^0-9]/g, ''));
    return Number.isNaN(valor) ? 0 : valor;
};

const totalRodadas = 3;
let pontosPlayer = extrairNumero(meusPontosEl?.textContent || '');
let pontosMaquina = extrairNumero(maquinaPontosEl?.textContent || '');
let rodadaAtual = extrairNumero(pontosRodadaEl?.textContent || '') || 1;
let totalPlayer = extrairNumero(totalPlayerEl?.textContent || '');
let totalMaquina = extrairNumero(totalMaquinaEl?.textContent || '');

const atualizarCartaPlayer = (carta) => {
    minhaCartaImagem.src = carta.imagem;
    minhaCartaAtaque.textContent = `Ataque:${carta.ataque}`;
    minhaCartaDefesa.textContent = `Defesa:${carta.defesa}`;
};

const atualizarCartaMaquina = (carta) => {
    maquinaCartaImagem.src = carta.imagem;
    maquinaCartaAtaque.textContent = `Ataque:${carta.ataque}`;
    maquinaCartaDefesa.textContent = `Defesa:${carta.defesa}`;
};

const formatarPontos = (valor) => String(valor).padStart(2, '0');

const atualizarPlacar = () => {
    meusPontosEl.textContent = `Meus Pontos: ${formatarPontos(pontosPlayer)}`;
    maquinaPontosEl.textContent = `Pontos da Maquina: ${formatarPontos(pontosMaquina)}`;
    pontosRodadaEl.textContent = `Rodada: ${rodadaAtual}/${totalRodadas}`;
    totalPlayerEl.textContent = `Total Player: ${totalPlayer}`;
    totalMaquinaEl.textContent = `Total Maquina: ${totalMaquina}`;
};

const mostrarResultado = (player, maquina) => {
    if (player.ataque > maquina.ataque) {
        resultadoDuelo.textContent = 'Resultado do Duelo: Vitoria';
        return 'player';
    }

    if (player.ataque < maquina.ataque) {
        resultadoDuelo.textContent = 'Resultado do Duelo: Derrota';
        return 'maquina';
    }

    resultadoDuelo.textContent = 'Resultado do Duelo: Empate';
    return 'empate';
};

cartasMao.forEach((carta) => {
    carta.addEventListener('click', () => {
        cartasMao.forEach((item) => item.classList.remove('selecionada'));
        carta.classList.add('selecionada');

        const imagem = carta.querySelector('img');
        const ataque = carta.querySelector('.Ataque');
        const defesa = carta.querySelector('.Defesa');

        cartaSelecionada = {
            imagem: imagem?.getAttribute('src') || '',
            ataque: extrairNumero(ataque?.textContent || ''),
            defesa: extrairNumero(defesa?.textContent || ''),
        };
    });
});

escolherCarta.addEventListener('click', () => {
    if (!cartaSelecionada) {
        resultadoDuelo.textContent = 'Escolha uma carta na mao';
        return;
    }

    const cartaMaquina = cartasMaquina[Math.floor(Math.random() * cartasMaquina.length)];
    atualizarCartaPlayer(cartaSelecionada);
    atualizarCartaMaquina(cartaMaquina);
    const vencedor = mostrarResultado(cartaSelecionada, cartaMaquina);

    if (vencedor === 'player') {
        pontosPlayer += 1;
    } else if (vencedor === 'maquina') {
        pontosMaquina += 1;
    }

    if (pontosPlayer >= 3 || pontosMaquina >= 3) {
        if (pontosPlayer > pontosMaquina) {
            totalPlayer += 1;
        } else if (pontosMaquina > pontosPlayer) {
            totalMaquina += 1;
        }

        rodadaAtual = Math.min(rodadaAtual + 1, totalRodadas);
        pontosPlayer = 0;
        pontosMaquina = 0;
    }

    atualizarPlacar();
});
