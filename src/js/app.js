'use strict';
/*----------------------------------------------------------->
	Utility Functions
<------------------------------------------------------------*/

function select(selector, scope = document) {
  return scope.querySelector(selector);
}
function selectAll(selector, scope = document) {
  return scope.querySelectorAll(selector);
}
function listen(event, element, callback) {
  return element.addEventListener(event, callback);
}
function removeClass(element, customClass) {
  element.classList.remove(customClass);
  return element;
}
function addClass(element, customClass) {
  element.classList.add(customClass);
  return element;
}
function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
/*----------------------------------------------------------->
	Selectors 
<------------------------------------------------------------*/

const heroBanner = select("header");
const headerSwitch = heroBanner.offsetHeight;
const cursorAnimation = select(".cursor");
const hangmanBlanksDisplay = select('.word-display');
const gallowsDisplay = select('.gallows');
const wrongGuessDisplay = select('.wrong-letters');
const inputElement = select('.letter-guess');
const hangmanStart = select('.hangman-start');
const closeButton = select('.exit-game');
const icon = select('.hangman');
const popOut = select('.pop-out');
const gameTitle = select('.game-title');
const pinkPony = select('.drag-bar');

/*----------------------------------------------------------->
	Parallax Controls 
<----------------------------------------------------------*/

const parallaxLayers = [
  {selector: ".large-orange-hex", speed: 0.4},
  {selector: ".med-orange-hex-one", speed: 0.6},
  {selector: ".med-orange-hex-two", speed: 0.1},
  {selector: ".med-dark-hex", speed: 0.5},
  {selector: ".small-solid-orange-hex-one", speed: 2},
  {selector: ".small-solid-orange-hex-two", speed: -0.8},
  {selector: ".large-dark-blur-hex", speed: 1.8}
];

listen("scroll", window, () => {
  const scrollTop = window.pageYOffset;
  parallaxLayers.forEach(({selector, speed}) => {
    const layer = select(selector);
    const yPos = -(scrollTop * speed);
    layer.style.transform = `translateY(${yPos}px)`;
  });
});


/*----------------------------------------------------------->
	Parallax Controls 
<----------------------------------------------------------*/

let isVisible = false; 

setInterval(() => {
  if(isVisible) {
    cursorAnimation.classList.remove('visible');
  } else if(!isVisible) {
    cursorAnimation.classList.add('visible');
  }
  isVisible = !isVisible;
}, 400);


const hangingMan = [
  `++---+
||\u00A0\u00A0\u00A0
||\u00A0\u00A0\u00A0
||\u00A0\u00A0\u00A0
||______`,
  
  `++---+
||\u00A0\u00A0\u00A0O
||\u00A0\u00A0\u00A0
||\u00A0\u00A0\u00A0
||______`,
  
  `++---+
||\u00A0\u00A0\u00A0O
||\u00A0\u00A0\u00A0|
||\u00A0\u00A0\u00A0
||______`,
  
  `++---+
||\u00A0\u00A0\u00A0O
||\u00A0\u00A0/|
||\u00A0\u00A0\u00A0
||______`,
  
  `++---+
||\u00A0\u00A0\u00A0O
||\u00A0\u00A0/|\\
||\u00A0\u00A0\u00A0
||______`,
  
  `++---+
||\u00A0\u00A0\u00A0O
||\u00A0\u00A0/|\\
||\u00A0\u00A0/ 
||______`,
  
  `++---+
||\u00A0\u00A0\u00A0O
||\u00A0\u00A0/|\\
||\u00A0\u00A0/ \\
||______`
];


const hangmanPhrases = [
  "Quick brown fox",
  "Jump over the fence",
  "Life is a journey",
  "Home sweet home"
];
let mixedLetterBlanks = [];
let wrongGuesses = [];
let hangPhrase = '';
let phraseArr = [];
let gameIsRunning = false;

function arrayOfBlanks() {
  return phraseArr.map(char => (char === ' ' ? ' ' : '_'));
}


function updateHangDisplay() {
  hangmanBlanksDisplay.innerText = mixedLetterBlanks.join('');
  gallowsDisplay.innerText = hangingMan[wrongGuesses.length]; 
  wrongGuessDisplay.innerText = wrongGuesses.join(', ');
}

function userGuess() {
  const inputValue = inputElement.value.toLowerCase();
  inputElement.value = ''; 

  if (!/^[a-zA-Z]$/.test(inputValue)) {
    wrongGuessDisplay.textContent = 'Enter a single letter';
    return;
  }
  if(!checkLetter(inputValue)) {
    wrongGuess(inputValue);
    if(wrongGuesses.length >= 5) {
      endHangman("You lose!");
      return;
    }
  }
  updateHangDisplay();
  if(!mixedLetterBlanks.includes('_')) {
    endHangman("You win!");
  }
}

function checkLetter(char) {
  let found = false;
  for (let i = 0; i < phraseArr.length; i++) {
    if (phraseArr[i].toLowerCase() === char) {
      mixedLetterBlanks[i] = phraseArr[i]; 
      found = true;
    }
  }
  return found;
}

function wrongGuess(char) {
  if (!wrongGuesses.includes(char)) {
    wrongGuesses.push(char);
  }
}

function resetGame() {
  wrongGuessDisplay.innerText = '';
  mixedLetterBlanks = [];
  wrongGuesses = [];
  hangPhrase = '';
  phraseArr = [];
}

function startHangmanGame() {
  hangPhrase = getRandomElement(hangmanPhrases);
  console.log(hangPhrase);
  phraseArr = hangPhrase.split('');
  mixedLetterBlanks = arrayOfBlanks();
  console.log(mixedLetterBlanks)
  updateHangDisplay();
  inputElement.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      userGuess();
    }
  });
}

function startHangman() {
  gameIsRunning = true;
  removeBigFont();
  removeClass(inputElement, 'hidden');
  addClass(hangmanStart, 'hidden');
  inputElement.focus();
  startHangmanGame();
  gameTitle.innerText = 'PHRASE';
}

function endHangman(result) {
  addClass(inputElement, 'hidden');
  removeClass(hangmanStart, 'hidden');
  hangmanStart.focus();
  gameTitle.innerText = result;
  gameIsRunning = false;
  resetGame();
}

function removeBigFont(){
  if (gameTitle.classList.contains("big-font")) {
    removeClass(gameTitle, "big-font");
  }
}

function addBigFont(){
  if (!gameTitle.classList.contains("big-font")) {
    addClass(gameTitle, "big-font");
  }
}

let offsetX = 0; 
let offsetY = 0;
let isDragging = false;

listen("mousedown", pinkPony, (e) => {
  isDragging = true;
  offsetX = e.clientX - popOut.offsetLeft;
  offsetY = e.clientY - popOut.offsetTop;
});

listen("mousemove", document, (e) =>{
  if(!isDragging) return;
  pinkPony.style.cursor = "grabbing"
  popOut.style.left = `${e.clientX - offsetX}px`;
  popOut.style.top = `${e.clientY - offsetY}px`;
});

listen("mouseup", document, () => {
  isDragging = false;
  pinkPony.style.cursor = "";
});

listen('click', hangmanStart, () =>{
  startHangman();
});
listen("click", icon, () =>{
  removeClass(popOut, 'hidden');
  gallowsDisplay.innerText = hangingMan[6];
  gameTitle.innerText = 'HANGMAN';
  document.body.style.overflow = "hidden";
});
listen("click", closeButton, ()=> {
  addClass(popOut, 'hidden');
  document.body.style.overflow = "";
  addBigFont();
});