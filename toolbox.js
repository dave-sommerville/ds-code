'use strict';
/*------------------------------------------------------------------------->
  Utility Functions 
<-------------------------------------------------------------------------*/

function select(selector, scope = document) {
  return scope.querySelector(selector);
}

function selectAll(selector, scope = document) {
  return scope.querySelectorAll(selector);
}

function listen(event, element, callback) {
  return element.addEventListener(event, callback);
}

function isImageFile(file) {
  return file && file.type.startsWith('image');
}

function generateUniqueId() {
  return '#:' + Date.now();
}

function addClass(element, customClass) {
  element.classList.add(customClass);
  return element;
}

function removeClass(element, customClass) {
  element.classList.remove(customClass);
  return element;
}

function sleep(duration) {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
}

function assignId(element) {
  element.id = id;
  return element;
}

function createImage(imageSrc) {
  const img = document.createElement('img');
  img.src = imageSrc;  
  img.alt = imageSrc; // Because the photo could be anything 
  return img;
}

function create(element) {
  const newElement = document.createElement(element); 
  return newElement;
}

function addText(element, text) {
  element.textContent = text; 
}

//Gives Random Boolen
let yesOrNo = Math.random() >= 0.5;

//Random Hex color (need `` and ${})
let randColor = ""; //Needs fixing 
randColor = Math.floor(Math.random()) * 0xffffff.toString(16);


//		Fisher-Yates Shuffle (best practice)
function shuffle() {
	const deck = [...new Array(52).keys()];

	for (let i = deck.length - 1; i > 0; i--) {

		const j = Math.floor(Math.random() * (i + 1));
		[deck[i], deck[j]] = [deck[j], deck[i]];
	}
	return deck;
}

//  Truncate numbers to adjust spacing 
let convert = (n) => {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6)
      return +(n / 1e3).toFixed(1) + "K";
  if (n >= 1e6 && n < 1e9)
      return +(n / 1e6).toFixed(1) + "M";
  if (n >= 1e9 && n < 1e12)
      return +(n / 1e9).toFixed(1) + "B";
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
};


// Find age between Dates 

let today = new Date();
let yearInMs = 1000 * 60 * 60 * 24 * 365;

function getAge(user) {
	let result = today - user.DOB;
	let age = Math.trunc(result / yearInMs);
	console.log(age);
}

