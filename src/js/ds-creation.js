'use strict';
/*------------------------------------------------>
  Utility Functions
<------------------------------------------------*/

function select(selector, scope = document) {
  return scope.querySelector(selector);
}

function selectAll(selector, scope = document) {
  return scope.querySelectorAll(selector);
}

function listen(event, element, callback) {
  return element.addEventListener(event, callback);
}

function unListen(event, element, callback) {
  return element.removeEventListener(event, callback);
}

function addClass(element, customClass) {
  element.classList.add(customClass);
  return element;
}

function removeClass(element, customClass) {
  element.classList.remove(customClass);
  return element;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const shuffleWords = arr => arr.sort(() => Math.random() - 0.5);

function createImage(imageSrc) {
  const img = document.createElement('img');
  img.src = imageSrc;  
  img.alt = imageSrc; // Because the photo could be anything 
  return img;
}
function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function displayRandomItem() {
  const randomItem = getRandomItem(typingTaunts);
    displayElement.textContent = randomItem;
    setTimeout(clearTaunt, 7000);
  const interval = getRandomInterval(8000, 13000); 
  setTimeout(displayRandomItem, interval);
}
/*------------------------------------------------------->
Hangman
<-------------------------------------------------------*/
/*
Need padding and allignment 
Man is currently stacking the wrong way and gallows are too narrow
Blank display not showing spaces
Need display to respect word size (of blanks)
Body part and Wrong guess show on correct guess 
No end of game logic 
*/
const hangingMan = [
  `  +---+\n||\n||\n||\n||\n||\n=========`,
  `  +---+\n|| \u00A0O\n||\n||\n||\n||\n=========`,
  `  +---+\n|| \u00A0O\n||\u00A0 |\n||\n||\n||\n=========`,
  `  +---+\n|| \u00A0O\n|| /|\n||\n||\n||\n=========`,
  `  +---+\n|| \u00A0O\n|| /|\\\n||\n||\n||\n=========`,
  `  +---+\n|| \u00A0O\n|| /|\\\n|| \u00A0|\n||\n||\n=========`,
  `  +---+\n|| \u00A0O\n|| /|\\\n|| \u00A0|\n||  /\n||\n=========`,
  `  +---+\n|| \u00A0O\n|| /|\\\n|| \u00A0|\n||  / \\\n||\n=========`
];


// Gotta change to utility functions 
const hangmanBlanksDisplay = select('.word-display');
const gallowsDisplay = select('.gallows');
const wrongGuessDisplay = select('.wrong-letters');
const inputElement = select('.letter-guess');
const outputElement = select('output');
const  hangmanStart = select('.hangman-start');

const hangmanPhrases = [
  "Quick brown fox",
  "Jump over the fence",
  "Life is a journey",
  "Home sweet home"
];

function arrayOfBlanks(randArr) {
  return randArr.map(char => (char === ' ' ? ' ' : '_'));
}


function updateHangDisplay(blankArr, dudArr) {
  hangmanBlanksDisplay.innerText = blankArr.join('');
  gallowsDisplay.innerText = hangingMan[dudArr.length]; 
  wrongGuessDisplay.innerText = dudArr.join(', ');
}

function userGuess(arrOne, arrTwo, dudArr) {
  const inputValue = inputElement.value.toLowerCase();
  inputElement.value = ''; 

  if (!/^[a-zA-Z]$/.test(inputValue)) {
    outputElement.textContent = 'Please enter a single letter!';
    return;
  }

  let isAbsent = true;  
  checkLetter(inputValue, arrOne, arrTwo, isAbsent);
  wrongGuess(inputValue, dudArr, isAbsent);

  updateHangDisplay(arrTwo, dudArr);
}

function checkLetter(char, arrayOne, arrayTwo) {
  let found = false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i].toLowerCase() === char) {
      arrayTwo[i] = arrayOne[i]; 
      found = true;
    }
  }
  return found;
}

function wrongGuess(char, dudArr, isAbsent) {
  if (isAbsent && !dudArr.includes(char)) {
    dudArr.push(char);
  }
}
let wrongGuesses = [];


function startHangman() {
  removeClass(inputElement, 'hidden');
  addClass(hangmanStart, 'hidden');
  startHangmanGame();
}


listen('click', hangmanStart, () =>{
  startHangman();
});

function startHangmanGame() {
  let hangPhrase = getRandomElement(hangmanPhrases);
  console.log(hangPhrase);
  let arrayOne = hangPhrase.split('');
  let arrayTwo = arrayOfBlanks(arrayOne);
  updateHangDisplay(arrayTwo, wrongGuesses);

  inputElement.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      userGuess(arrayOne, arrayTwo, wrongGuesses);
    }
  });
}

