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