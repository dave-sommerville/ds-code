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

const leftButton = select('.left-btn');
const rightButton = select('.right-btn');


const infoDisplay = select('.info-display');
const portfolioPreview = select('.portfolio-preview');
const portfolioTitle = select('.portfolio-title');
const portfolioDescription = select('.portfolio-description');
const releasesSection = select('.releases');

const designButton = select('.design-btn');
const gameButton = select('.game-btn');
const releasesButton = select('.releases-btn');

class Portfolio {
  #imgUrl ='';
  #title = '';
  #description = '';
  constructor(url, title, desc) {
    this.imgUrl = url;
    this.title = title;
    this.description = desc;
  }
  set imgUrl(url) {
    this.#imgUrl = url;
  }
  set title(name) {
    this.#title = name;
  }
  set description(desc) {
    this.#description = desc;
  }
  get imgUrl() {
    return this.#imgUrl;
  }
  get title() {
    return this.#title;
  }
  get description() {
    return this.#description;
  }
}
const blackjack = new Portfolio("./src/img/blackjack-dave-sommerville-github.jpg", "Blackjack", "My online version of the popular card game Blackjack");
const scriptScavengers = new Portfolio("", "", "");
const designItems = [blackjack, scriptScavengers];
const gameItems = [];
let portfolioItems;


function displayPortfolioItem(index) {
  let item = portfolioItems[index];
  portfolioPreview.src= item.imgUrl;
  portfolioDescription.textContent = item.description;
  portfolioTitle.textContent = item.title;
}

let currentIndex = 0;
let totalEntries = 2;

function adjustIndex(index, operator) {
  if(operator === '+') {
    index++;
  } else if (operator === '-') {
    index--;
  } else {
    console.log("Please enter a + or -");
  }
  // if (index >= (totalEntries)) {
  //   index = 0;
  // }
  return index;
}

listen("click", gameButton, () => {
    if(releasesSection.classList.contains('expanded')) {
    removeClass(releasesSection, 'expanded');
  }
  if(!infoDisplay.classList.contains('expanded')) {
    addClass(infoDisplay, 'expanded');
  }
  portfolioItems = designItems;
  displayPortfolioItem(currentIndex);
  return portfolioItems;
});
listen("click", releasesButton, () => {
  if(!releasesSection.classList.contains('expanded')) {
    addClass(releasesSection, 'expanded');
  }
  if(infoDisplay.classList.contains('expanded')) {
    removeClass(infoDisplay, 'expanded');
  }
});

listen("click", leftButton, () => {
  currentIndex = adjustIndex(currentIndex, '-');
  displayPortfolioItem(currentIndex);
});

listen("click", rightButton, () => {
  currentIndex = adjustIndex(currentIndex, '+');
  displayPortfolioItem(currentIndex);
});


