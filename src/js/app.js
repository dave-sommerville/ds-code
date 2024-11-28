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
const contactModal = select(".contact");
const showContact = select(".show-contact");
const headerSwitch = heroBanner.offsetHeight;

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

listen('click', showContact, () => {
	contactModal.classList.toggle("visible");
	
	if (contactModal.classList.contains("visible")) {
			showContact.innerText = "Close"; 
	} else {
			showContact.innerText = "Contact";
	}
});


