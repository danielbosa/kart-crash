// * FASE DI PREPARAZIONE
// Recupero gli elementi di interesse dalla pagina
const grid = document.querySelector('.grid');
const scoreCounter = document.querySelector('.score-counter');
const leftButton = document.querySelector('.left-button');
const rightButton = document.querySelector('.right-button');
const endGameScreen = document.querySelector('.end-game-screen');
const playAgainButton = document.querySelector('.play-again');
const finalScore = document.querySelector('.final-score');
const turboButton = document.querySelector('#turbo');

// Impostazioni di partenza
let turbo = 0;
let score = 0;
let speed = 500;
let kartPosition = { y: 7, x: 3 };

// Prepariamo la griglia iniziale
const gridMatrix = [
    ['', '', '', '', '', 'grass', ''],
    ['', 'cones', '', '', '', '', 'fence'],
    ['', '', 'rock', '', '', '', ''],
    ['fence', '', '', '', '', '', ''],
    ['', '', 'grass', '', '', 'water', ''],
    ['', '', '', '', 'cones', '', ''],
    ['', 'water', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', 'rock', ''],
];

function renderGrid() {
    // svuoto griglia
    grid.innerHTML = '';
    // per ogni riga della matrice
    gridMatrix.forEach(function (rowCells) {
        // per ogni cella della riga
        rowCells.forEach(function (cellContent) {
            // creo quadratino
            const cell = document.createElement('div');
            cell.className = 'cell';
            // se c'è qualcosa, aggiungo classe con lo stesso nome
            if (cellContent) {
                cell.classList.add(cellContent);
            }
            // metto quadratino in riga
            grid.appendChild(cell);
        })
    })
}

// inserire monetine
function insertCoin(row) {
    // prendo indice di prima cella vuota
    const emptyIndex = row.indexOf('');
    // inserisco coin nella cella vuota
    row[emptyIndex] = 'coin';
    // restituisco riga aggiornata
    return row;
}

// c'è già una monetina?
function hasCoin() {
    let coinFound = false;
    // per ogni riga controllo se c'è coin
    gridMatrix.forEach(function (row) {
        if (row.includes('coin')) coinFound = true;
    })
    return coinFound;
}

// * FUNZIONI KART
// posizionare il kart
function placeKart() {
    // recupero cella in cui devo mettere il kart e verifico cosa contiene
    let contentBeforeKart = gridMatrix[kartPosition.y][kartPosition.x];
    if (contentBeforeKart === 'coin') {
        getBonusPoints();
    } else if (contentBeforeKart) {
        gameOver();
    }
    // all'inizio metto kart nella posizione stabili da variabile globale kartPosition
    gridMatrix[kartPosition.y][kartPosition.x] = 'kart';
}

// funzione per muovere kart
function moveKart(direction) {
    // tolgo kart da posizione precedente
    gridMatrix[kartPosition.y][kartPosition.x] = '';

    // aggiorno coordinate di posizione kart in base alla direzione
    switch (direction) {
        case 'left':
            if (kartPosition.x > 0) kartPosition.x--;
            break;
        case 'right':
            if (kartPosition.x < 6) kartPosition.x++;
            break;
        default:
            gridMatrix[kartPosition.y][kartPosition.x] = 'kart';
    }
    // reindirizzo elementi
    renderElements();
}

// * FUNZIONI OSTACOLI
// funzione per far scorrere ostacoli

function scrollObstacles() {
    // tolgo kart, perché deve rimanere lì: non scorre insieme alla griglia
    gridMatrix[kartPosition.y][kartPosition.x] = '';
    // c'è già un coin?
    const isCoinInGame = hasCoin();
    // recupero ultima riga perché poi la inserisco in cima
    let lastRow = gridMatrix.pop();
    // inserisco riga con monetina se non ci sono coin in gioco
    if (!isCoinInGame) {
        lastRow = insertCoin(lastRow);
    }
    // mescolo elementi di riga
    lastRow = shuffleRow(lastRow);
    // riporto ultima riga in cima
    gridMatrix.unshift(lastRow);
    // reindirizzo elementi
    renderElements();
}

// funzione per mescolare elementi di riga
function shuffleRow(row) {
    for (let i = row.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [row[i], row[j]] = [row[j], row[i]];
    }
    return row;
}

// game over
function gameOver() {
    clearInterval(gameLoop);
    finalScore.innerText = score;
    endGameScreen.classList.remove('hidden');
    // focus su tasto enter
    playAgainButton.focus();
}

// * FUNZIONE DI RENDERING DI TUTTI GLI ELEMENTI
function renderElements() {
    // posiziono kart
    placeKart();
    // render griglia
    renderGrid();
}

// * PUNTI E VELOCITA'
// punteggio
function updateScore() {
    score++;
    scoreCounter.innerText = score;
}

// bonus
function getBonusPoints() {
    // aumento punteggio di 30
    score += 30;
    // aggiorno punteggio in pagina
    scoreCounter.innerText = score;
    // aggiungo animazione
    scoreCounter.classList.add('bonus');
    //tolgo animazione / classe bonus dopo 1/2 secondo 
    setTimeout(function () {
        scoreCounter.classList.remove('bonus');
    }, 500);
}

// velocità
function increaseSpeed() {
    // imposto limite di velocità oltre cui non incrementa speed
    if (speed > 100) {
        // interrompo flusso
        clearInterval(gameLoop);
        // incremento velocità (decrementando intervallo!)
        speed -= 50;
        // riavvio flusso
        gameLoop = setInterval(gameFlow, speed);
    }
}

// * FLUSSO DI GIOCO
// funzione che raggruppa funz cicliche
function gameFlow() {
    // aumenta punteggio al passare del tempo
    updateScore()
    // aumenta velocità
    if (turbo == 1) {
        increaseSpeed();
    }
    // fai scorrere ostacoli
    scrollObstacles();
}

// * EVENTI DI GIOCO
// Click su bottone LEFT
leftButton.addEventListener('click', function () {
    moveKart('left');
});

// Click su bottone RIGHT
rightButton.addEventListener('click', function () {
    moveKart('right');
});

// Reazione a frecce di tastiera
document.addEventListener('keyup', function (e) {
    switch (e.key) {
        case 'ArrowLeft':
            moveKart('left');
            break;
        case 'ArrowRight':
            moveKart('right');
            break;
        default: return;
    }
})

// play again
playAgainButton.addEventListener('click', function () {
    location.reload();
})

// ESECUZIONE GIOCO
// scrollo automaticamente la griglia con gli ostacoli
let gameLoop = setInterval(gameFlow, speed);

