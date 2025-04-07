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


/*----------------------------------------------------------->
	Preview Blurb Storage 
<----------------------------------------------------------*/

const parallaxLayers = [
  {selector: ".hex-one", speed: 0.2},
  {selector: ".hex-two", speed: 0.4},
  {selector: ".hex-three", speed: 0.6},
  {selector: ".hex-four", speed: 0.8}
];

listen("scroll", window, () => {
  const scrollTop = window.pageYOffset;
  parallaxLayers.forEach(({selector, speed}) => {
    const layer = select(selector);
    const yPos = -(scrollTop * speed);
    layer.style.transform = `translateY(${yPos}px)`;
  });
});


