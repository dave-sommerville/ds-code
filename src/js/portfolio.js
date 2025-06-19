function select(selector, scope = document) {
  return scope.querySelector(selector);
}
function selectAll(selector, scope = document) {
  return scope.querySelectorAll(selector);
}
function listen(event, element, callback) {
  return element.addEventListener(event, callback);
}

const leftButton = select('.left-btn');
const rightButton = select('.right-btn');
const leftButtonMobile = select('.left-btn-mobile');
const rightButtonMobile = select('.right-btn-mobile');

const cardContainer = select('.card-container');
const cards = cardContainer.querySelectorAll(".card");


const portfolioPreview = select('.portfolio-preview');
const portfolioTitle = select('.portfolio-title');
const portfolioDescription = select('.portfolio-description');

const designButton = select('.design-btn');
const gameButton = select('game-btn');

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
const designItems = [];
const gameItems = [];
const portfolioItems = [];


function displayPortfolioItem(portfolioItems, index) {
  let item = portfolioItems[index];
  portfolioPreview.src= item.imgUrl;
  portfolioDescription.textContent = item.description;
  portfolioTitle.textContent = item.title;
}

let currentIndex = 0;

function adjustIndex(index, operator) {
  if(operator === '+') {
    index++;
  } else if (operator === '-') {
    index--;
  } else {
    console.log("Please enter a + or -");
  }
  return index;
}
/*  When design or game selected, class added to info-display and it gets populated by selected button, releases has class removed if present*/ 
/*  When releases selected class is added to release section and removed from info display if present 

*/
listen("click", designButton, () => portfolioItems = designItems);
listen("click", gameButton, () => portfolioItems = gameItems);


listen("click", leftButton, () => {
  currentIndex = adjustIndex(currentIndex, '-');
  displayPortfolioItem(portfolioItems, currentIndex);
});

listen("click", rightButton, () => {
  currentIndex = adjustIndex(currentIndex, '+');
  displayPortfolioItem(portfolioItems, currentIndex);

});
listen("click", leftButtonMobile, () => {
  currentIndex = adjustIndex(currentIndex, '-');
  displayPortfolioItem(portfolioItems, currentIndex);

});
listen("click", rightButtonMobile, () =>{
  currentIndex = adjustIndex(currentIndex, '+');
  displayPortfolioItem(portfolioItems, currentIndex);

});

