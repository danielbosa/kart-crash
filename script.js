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
    // per ogni riga della matrice
    gridMatrix.forEach(function(rowCells){
        // per ogni cella della riga
        rowCells.forEach(function(cellContent){
            // creo quadratino
            const cell = document.createElement('div');
            cell.className = 'cell';
            // se c'è qualcosa, aggiungo classe con lo stesso nome
            if(cellContent){
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

// FUNZIONE DI RENDERING DI TUTTI GLI ELEMENTI
function renderElements() {
    // posiziono kart
    placeKart();
    // render griglia
    renderGrid();
}