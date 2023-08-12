'use strict';

const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const diceImg = document.querySelector('.dice');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const player1CurrentScore = document.getElementById('current--0');
const player2CurrentScore = document.getElementById('current--1');
const player1ScoreTxt = document.getElementById('score--0');
const player2ScoreTxt = document.getElementById('score--1');
const btnReset = document.querySelector('.btn--new');

let current1 = 0,
  current2 = 0;
let score1 = 0,
  score2 = 0;

const updateCurrentScore = () => {
  player1CurrentScore.textContent = `${current1}`;
  player2CurrentScore.textContent = `${current2}`;
};

btnRoll.addEventListener('click', () => {
  const diceRoll = Math.floor(Math.random() * 6 + 1);
  diceImg.setAttribute('src', `dice-${diceRoll}.png`);
  if (diceRoll !== 1) {
    if (player1.classList.contains('player--active')) {
      current1 += diceRoll;
    } else if (player2.classList.contains('player--active')) {
      current2 += diceRoll;
    }
    updateCurrentScore();
  } else {
    if (player1.classList.contains('player--active')) {
      player1.classList.remove('player--active');
      current1 = 0;
      player2.classList.add('player--active');
    } else if (player2.classList.contains('player--active')) {
      player2.classList.remove('player--active');
      current2 = 0;
      player1.classList.add('player--active');
    }
    updateCurrentScore();
  }
});

btnHold.addEventListener('click', () => {
  if (player1.classList.contains('player--active')) {
    score1 += current1;
    current1 = 0;
    player1ScoreTxt.textContent = score1;
    if (score1 >= 100) {
      player1.classList.remove('player--active');
      player1.classList.add('player--winner');
    }
    updateCurrentScore();
  } else {
    score2 += current2;
    current2 = 0;
    player2ScoreTxt.textContent = score2;
    if (score2 >= 100) {
      player2.classList.remove('player--active');
      player2.classList.add('player--winner');
    }
    updateCurrentScore();
  }
});

btnReset.addEventListener('click', () => {
  current1 = 0;
  current2 = 0;
  score1 = 0;
  score2 = 0;
  updateCurrentScore();
  player1ScoreTxt.textContent = score1;
  player2ScoreTxt.textContent = score2;
  if (player1.classList.contains('player--winner'))
    player1.classList.remove('player--winner');
  else {
    player2.classList.remove('player--winner');
  }
});
