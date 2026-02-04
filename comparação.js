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

const extrairNumero = (texto) => {
    const valor = Number(texto.replace(/[^0-9]/g, ''));
    return Number.isNaN(valor) ? 0 : valor;
};

const baralhoBase = [
    { nome: 'Rei Caveira', imagem: 'images/image_1.jpg', ataque: 2500, defesa: 1200 },
    { nome: 'Dragao Branco', imagem: 'images/image_2.jpg', ataque: 3000, defesa: 2500 },
    { nome: 'Mago Negro', imagem: 'images/image_3.jpg', ataque: 2500, defesa: 2100 },
    { nome: 'Olhos Vermelhos', imagem: 'images/image_4.jpg', ataque: 2400, defesa: 2000 },
    { nome: 'Meteor B Dragon', imagem: 'images/image_5.jpg', ataque: 3500, defesa: 1200 },
    { nome: 'Slifer', imagem: 'images/image_7.jpg', ataque: 5000, defesa: 5000 },
    { nome: 'Maldicao do Dragao', imagem: 'images/image_8.jpg', ataque: 2000, defesa: 1500 },
    { nome: 'Kuriboh', imagem: 'images/image_9.jpg', ataque: 300, defesa: 200 },
];

const totalRodadas = 3;
const totalCartasMao = cartasMao.length;
let cartaSelecionada = null;
let indiceSelecionado = null;
let baralho = [];
let maoPlayer = [];
let maoMaquina = [];
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

const embaralhar = (cartas) => {
    const copia = [...cartas];
    for (let i = copia.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
};

const comprarCarta = () => (baralho.length ? baralho.shift() : null);

const formatarPontos = (valor) => String(valor).padStart(2, '0');

const atualizarPlacar = () => {
    meusPontosEl.textContent = `Meus Pontos: ${formatarPontos(pontosPlayer)}`;
    maquinaPontosEl.textContent = `Pontos da Maquina: ${formatarPontos(pontosMaquina)}`;
    pontosRodadaEl.textContent = `Rodada: ${rodadaAtual}/${totalRodadas}`;
    totalPlayerEl.textContent = `Total Player: ${totalPlayer}`;
    totalMaquinaEl.textContent = `Total Maquina: ${totalMaquina}`;
};

const atualizarMaoPlayer = () => {
    cartasMao.forEach((slot, index) => {
        const carta = maoPlayer[index];
        const imagem = slot.querySelector('img');
        const ataque = slot.querySelector('.Ataque');
        const defesa = slot.querySelector('.Defesa');

        if (carta) {
            slot.classList.remove('vazia');
            imagem.src = carta.imagem;
            imagem.alt = carta.nome;
            ataque.textContent = `Ataque:${carta.ataque}`;
            defesa.textContent = `Defesa:${carta.defesa}`;
        } else {
            slot.classList.add('vazia');
            ataque.textContent = '';
            defesa.textContent = '';
        }
    });
};

const iniciarDuelo = () => {
    baralho = embaralhar(baralhoBase);
    maoPlayer = [];
    maoMaquina = [];

    for (let i = 0; i < totalCartasMao; i += 1) {
        maoPlayer.push(comprarCarta());
        maoMaquina.push(comprarCarta());
    }

    cartaSelecionada = null;
    indiceSelecionado = null;
    cartasMao.forEach((item) => item.classList.remove('selecionada'));
    atualizarMaoPlayer();
    resultadoDuelo.textContent = 'Escolha uma carta na mao';
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

const obterIndiceMaquina = () => {
    const indices = maoMaquina
        .map((carta, index) => (carta ? index : null))
        .filter((index) => index !== null);

    if (!indices.length) {
        return null;
    }

    return indices[Math.floor(Math.random() * indices.length)];
};

cartasMao.forEach((carta, index) => {
    carta.addEventListener('click', () => {
        const selecionada = maoPlayer[index];

        if (!selecionada) {
            return;
        }

        cartasMao.forEach((item) => item.classList.remove('selecionada'));
        carta.classList.add('selecionada');

        cartaSelecionada = selecionada;
        indiceSelecionado = index;
    });
});

escolherCarta.addEventListener('click', () => {
    if (!cartaSelecionada || indiceSelecionado === null) {
        resultadoDuelo.textContent = 'Escolha uma carta na mao';
        return;
    }

    const indiceMaquina = obterIndiceMaquina();

    if (indiceMaquina === null) {
        iniciarDuelo();
        return;
    }

    const cartaMaquina = maoMaquina[indiceMaquina];
    atualizarCartaPlayer(cartaSelecionada);
    atualizarCartaMaquina(cartaMaquina);
    const vencedor = mostrarResultado(cartaSelecionada, cartaMaquina);

    if (vencedor === 'player') {
        pontosPlayer += 1;
    } else if (vencedor === 'maquina') {
        pontosMaquina += 1;
    }

    maoPlayer[indiceSelecionado] = comprarCarta();
    maoMaquina[indiceMaquina] = comprarCarta();
    cartaSelecionada = null;
    indiceSelecionado = null;
    cartasMao.forEach((item) => item.classList.remove('selecionada'));
    atualizarMaoPlayer();

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

    const maoPlayerVazia = maoPlayer.every((carta) => !carta);
    const maoMaquinaVazia = maoMaquina.every((carta) => !carta);

    if (maoPlayerVazia || maoMaquinaVazia) {
        iniciarDuelo();
    }
});

atualizarPlacar();
iniciarDuelo();
