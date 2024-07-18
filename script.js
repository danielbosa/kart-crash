// # FASE DI PREPARAZIONE
// Recupero gli elementi di interesse dalla pagina
const grid = document.querySelector('.grid');
const scoreCounter = document.querySelector('.score-counter');
const leftButton = document.querySelector('.left-button');
const rightButton = document.querySelector('.right-button');
const endGameScreen = document.querySelector('.end-game-screen');
const playAgainButton = document.querySelector('.play-again');
const finalScore = document.querySelector('.final-score');
const turboButton = document.querySelector('#turbo');

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

// Impostazioni di partenza
let turbo = 1;
let score = 0;
let speed = 500;
let kartPosition = { y: 7, x: 3 };