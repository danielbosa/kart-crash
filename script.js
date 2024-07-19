// FASE DI PREPARAZIONE
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
let turbo = 1;
let score = 0;
let speed = 500;
let kartPosition = { y: 7, x: 3 };

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

// FUNZIONI KART
// posizionare il kart
function placeKart() {
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


// FUNZIONI OSTACOLI
// funzione per far scorrere ostacoli

function scrollObstacles() {
    // tolgo kart, perché deve rimanere lì: non scorre insieme alla griglia
    gridMatrix[kartPosition.y][kartPosition.x] = '';
    // recupero ultima riga perché poi la inserisco in cima
    let lastRow = gridMatrix.pop();
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

// FUNZIONE DI RENDERING DI TUTTI GLI ELEMENTI
function renderElements() {
    // posiziono kart
    placeKart();
    // render griglia
    renderGrid();
}

// EVENTI DI GIOCO
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