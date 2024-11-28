'use strict';
/*----------------------------------------------------------->

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

<------------------------------------------------------------*/

const navBar = select(".nav-wrapper");
const heroBanner = select(".hero-banner");
const contactModal = select(".contact");
const showContact = select(".show-contact");
const headerSwitch = heroBanner.offsetHeight;

/*----------------------------------------------------------->

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
	
	// Toggle inner text
	if (contactModal.classList.contains("visible")) {
			showContact.innerText = "Close";  // Change to Close when modal is visible
	} else {
			showContact.innerText = "Contact";  // Change to Contact when modal is hidden
	}
});


