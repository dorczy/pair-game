'use strict';

const cards = [...document.querySelectorAll('.card') ];

const clickDisplay = document.querySelector('.clickDisplay');
let clickCounter = 0;

cards.forEach(item => item.addEventListener('click', () => {
    item.classList.toggle('flip');
    item.classList.toggle('disabled');
    item.classList.add('open');

    clickCounter += 1;
    clickDisplay.textContent = `${clickCounter} steps`;
    if(clickCounter == 1) {
        clockInterval();
    };

    lookingForFlippedCards();
    isSameSign();
}));

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
};

const deck = document.querySelector(".content__cards--row");
const startGame = () => {
   let shuffledCards = shuffle(cards);
   for (let i = 0; i < shuffledCards.length; i += 1){
        [].forEach.call(shuffledCards, (item) => {
            deck.appendChild(item);
        });
   }
};
window.onload = startGame();

let flippedCards = [];
const lookingForFlippedCards = () => {
    if (clickCounter % 2 == 0) {
        cards.filter(item => 
            (item.classList.value.indexOf('open') > 0) ? flippedCards.push(item) : '');
        return flippedCards;
    }
};

const isSameSign = () => {
    if (flippedCards.length == 2) {
        if (flippedCards[0].textContent === flippedCards[1].textContent) {
            matched();
        } else {
            unmatched();
        }
    };
};

let matchCounter = 0;
const matched = () => {
    flippedCards[0].classList.add('match');
    flippedCards[1].classList.add('match');
    flippedCards[0].classList.remove('open');
    flippedCards[1].classList.remove('open');
    flippedCards = [];
    matchCounter += 1;
    if (matchCounter == 5) {
        clearInterval(interval);
        setTimeout(endGame, 5000);
       
    };
};

const unmatched = () => {
    setTimeout(() => { 
        flippedCards[0].classList.toggle('flip');
        flippedCards[1].classList.toggle('flip');
        flippedCards[0].classList.toggle('disabled');
        flippedCards[1].classList.toggle('disabled');
        flippedCards[0].classList.remove('open');
        flippedCards[1].classList.remove('open');
        flippedCards = [];
    }, 1000);
};

const endGame = () => {
    cards.forEach(item => item.classList.remove('flip'));
    cards.forEach(item => item.classList.remove('disabled'));
    cards.forEach(item => item.classList.remove('match'));
    clockDiv.textContent = '00:00';
    clickDisplay.textContent = `CLICK ANY CARD TO BEGIN`;
    clickCounter = 0;
    minutes = 0;
    sec = 0;
    matchCounter = 0;
    startGame();
};

let minutes = 0;
let sec = 0;
const clockDiv = document.querySelector('.gameTimer');
let interval;

const clock = () => {
    sec += 1;
    if (sec >= 60) {
        sec = 0;
        minutes += 1;
    }
    clockDiv.textContent = (minutes ? (minutes > 9 ? minutes : `0${minutes}`) : "00") + ":" + (sec > 9 ? sec : `0${sec}`);
};

const clockInterval = () => {
    interval = setInterval(clock, 1000);
};
