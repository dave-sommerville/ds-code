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

const hangmanBlanksDisplay = select('.word-display');
const gallowsDisplay = select('.gallows');
const wrongGuessDisplay = select('.wrong-letters');
const inputElement = select('.letter-guess');
const outputElement = select('output');
const  hangmanStart = select('.hangman-start');

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

const icon = select('.hangman');
const popOut = select('dialog');
listen("click", icon, () =>{
  popOut.showModal();
});