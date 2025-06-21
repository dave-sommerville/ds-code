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
const portfolioWrapper = select('.portfolio-wrapper');
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
  #linkUrl = '';
  constructor(img, title, desc,link) {
    this.imgUrl = img;
    this.title = title;
    this.description = desc;
    this.linkUrl = link;
  }
  set imgUrl(img) {
    this.#imgUrl = img;
  }
  set title(name) {
    this.#title = name;
  }
  set description(desc) {
    this.#description = desc;
  }
  set linkUrl(link) {
    this.#linkUrl = link;
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
  get linkUrl() {
    return this.#description;
  }
}
const blackjack = new Portfolio(
  "./src/img/blackjack-dave-sommerville-github.jpg", 
  "Blackjack", 
  "My online version of the popular card game Blackjack. It features deal animations and a persistant player bank.", 
  "https://dave-sommerville.github.io/blackjack/"
);

const scriptScavengers = new Portfolio(
  "./src/img/script-scavengers-dave-sommerville-github.jpg", 
  "Script Scavengers", 
  "Fast typing game with a desert scavenger theme. Including a highscore list.", 
  "https://dave-sommerville.github.io/script-scavengers/"
);

const codeBreaker = new Portfolio(
  "./src/img/code-breaker-dave-sommerville-github.jpg",
  "Code Breaker",
  "Based on the game Mastermind, players can test their logical deducation skills and track their times.", 
  "https://dave-sommerville.github.io/code-breaker/"
);

const booogle = new Portfolio(
  "./src/img/boogle-dave-sommerville-github.jpg",
  "Booogle", 
  "A handy online Boggle display for large groups or travelling."
  + "Letter probabilities reflect the physical version.", 
  "https://dave-sommerville.github.io/boogle/"
);

const meMyself = new Portfolio(
  "./src/img/me-myself-and-eye-dave-sommerville-github.jpg", 
  "Me, Myself, and Eye", 
  "A solipistic social media site where who you are is up to you.", 
  "https://dave-sommerville.github.io/social-media-app/"
);

const opalOnyx = new Portfolio(
  "./src/img/opal-and-onyx-dave-sommerville-github.jpg",
  "Opal & Onyx",
  "Collaboration project exploring luxury ecommerce design.",
  "https://dave-sommerville.github.io/opal-and-onyx/"
);

const hiveMind = new Portfolio(
  "./src/img/hivemind-dave-sommerville-github.jpg", 
  "HiveMind", 
  "Collaboration project creating our own version of a social media site. Also where the obsession with hexagons started for me.", 
  "https://dave-sommerville.github.io/hivemind/"
);

const designItems = [opalOnyx, hiveMind, meMyself];
const gameItems = [blackjack, scriptScavengers, codeBreaker, booogle];
let portfolioItems;

function displayPortfolioItem(index) {
  let item = portfolioItems[index];
  portfolioPreview.src= item.imgUrl;
  portfolioDescription.textContent = item.description;
  portfolioTitle.textContent = item.title;
}

let currentIndex = 0;

portfolioItems = designItems;
displayPortfolioItem(currentIndex);

function adjustIndex(index, operator, entryLimit) {
  if (operator === '+') {
    index++;
  } else if (operator === '-') {
    index--;
  } else {
    console.log("Please enter a + or -");
  }

  if (index >= entryLimit) {
    index = 0;
  }
  if (index < 0) {
    index = entryLimit - 1;
  }
  return index;
}

function switchView() {
    if(releasesSection.classList.contains('expanded')) {
    removeClass(releasesSection, 'expanded');
  }
  if(!infoDisplay.classList.contains('expanded')) {
    addClass(infoDisplay, 'expanded');
  }
}


listen("click", gameButton, () => {
  addClass(portfolioWrapper, 'fade-out');
  setTimeout(() => {
  switchView();
  portfolioItems = gameItems;
  displayPortfolioItem(currentIndex);
    displayPortfolioItem(currentIndex);
    removeClass(portfolioWrapper, 'fade-out');
  }, 300);
  return portfolioItems;
});

listen("click", designButton, () => {
  addClass(portfolioWrapper, 'fade-out');
  setTimeout(() => {
  switchView();
  portfolioItems = designItems;
  displayPortfolioItem(currentIndex);
    displayPortfolioItem(currentIndex);
    removeClass(portfolioWrapper, 'fade-out');
  }, 300);
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
  addClass(portfolioWrapper, 'fade-out');
  currentIndex = adjustIndex(currentIndex, '-', portfolioItems.length);
  setTimeout(() => {
    displayPortfolioItem(currentIndex);
    removeClass(portfolioWrapper, 'fade-out');
  }, 300);
});

listen("click", rightButton, () => {
  addClass(portfolioWrapper, 'fade-out');
  currentIndex = adjustIndex(currentIndex, '+', portfolioItems.length);
  setTimeout(() => {
    displayPortfolioItem(currentIndex);
    removeClass(portfolioWrapper, 'fade-out');
  }, 300);
});


