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

const navBar = select(".nav-wrapper");
const heroBanner = select(".hero-banner");
const headerSwitch = heroBanner.offsetHeight;
const burgerMenu = select('.burger');
const linkWrapper = select('.link-wrapper');
const navTitle = select('h3');

/*----------------------------------------------------------->
	Listeners 
<------------------------------------------------------------*/

listen("scroll", window, () => {
	const trigger = window.scrollY;

	if (trigger > headerSwitch) {
		navBar.classList.add("visible");
	} else {
		navBar.classList.remove("visible");
	}
});

listen('click', burgerMenu, () => {
	linkWrapper.classList.toggle("visible");
  navTitle.classList.toggle("visible");
});


