// ordens aleatórias que vão ascender
let order = [];
let clickedOrder = [];
let score = 0; // conta o score da pessoa, pois ela perde quando zera

//0 - verde, 1 - vermelho, 2 - amarelo, 3 - azul

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for (let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1)
        // Number(i)+1 traz um numero mais 1 para poder existir na lista de cores
    }
}

//acende a proxima cor
let lightColor = (element, number) => {
    number = number * 500;
    setTimeout(() => {
        element.classList.add('selected'); //atribuindo a classe selected ao element
        //remove a cor após um tempo
        setTimeout(() => {
            element.classList.remove('selected');
        }, 500)
    }, number - 250);
}

//checa se foi clicado o botão correto igual ao gerado
let checkOrder = () => {
    for (let i in clickedOrder) {
        if (clickedOrder[i] !== order[i]) {
            gameOver();
            break;
        }
        if (clickedOrder.length == order.length) {
            alert(`Pontuação: ${score}\n Você acertou! Iniciando próximo nível`);
            nextLevel();
        }
    }
}

//funcao para o clique do usuario
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder(); // para conferir se foi clicado correto
    }, 250);

}

//funcao que retorna a cor
let createColorElement = (color) => {
    if (color == 0) {
        return green;
    } else if (color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}

//funcao para proximo nivel do jogo
let nextLevel = () => {
    score++;
    shuffleOrder();
}

//funcao para game over
let gameOver = () => {
    alert(`Pontuação: ${score}\n Você perdeu o jogo!\n Clique em OK para recomeçar`)
    order = [];
    clickedOrder = [];

    playGame();
}

//funcao para iniciar novo jogo
let playGame = () => {
    score = 0;
    alert(`Bem vindo ao Gênesis! Iniciando o jogo\n Pontuação: ${score}`);

    nextLevel();
}

// green.addEventListener('click', click(0));
// red.addEventListener('click', click(1));
// yellow.addEventListener('click', click(2));
// blue.addEventListener('click', click(3));

//eventos de clique para as cores
green.onClick = () => click(0);
red.onClick = () => click(1);
yellow.onClick = () => click(2);
blue.onClick = () => click(3);

//inicio do jogo
playGame();