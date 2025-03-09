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
const heroBanner = select("header");
const headerSwitch = heroBanner.offsetHeight;
const burgerMenu = select('.burger');
const linkWrapper = select('.link-wrapper');
const navTitle = select('h3');

/*----------------------------------------------------------->
	Listeners 
<-----------------------------------------------------------*/

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

/*----------------------------------------------------------->
	Preview Blurb Storage 
<----------------------------------------------------------*/

const blurbs = {
  codeBreaker:
  `This website introduces, "Code Breaker", a logic puzzle where players attempt to guess a secret code composed of four numbers, between one and six. After each guess, feedback is provided with colored indicators showing how many pegs are in the correct position (red) or correct color but incorrect position (white). Players continue guessing until they correctly identify the code or run out of turns. It's a fun, interactive challenge that tests pattern recognition and deduction skills.`,

  opalAndOnyx:
  `This website introduces "Opal & Onyx," a mock e-commerce platform specializing in elegant jewelry. Users can explore a curated selection of items, including pearl rings, amethyst pearl sets, jade earrings, and garnet neckpieces. The site features a clean and intuitive interface, allowing visitors to browse products, view pricing, and consider subscription plans labeled as Basic, Standard, and Premium. While the platform is a demonstration, it effectively showcases the design and functionality typical of online jewelry stores, emphasizing user experience and aesthetic appeal.`,

  hiveMind:
  `This website showcases "HiveMind," a mock professional social media platform. Users can explore profiles, view posts, and interact with simulated content, mimicking networking site features. Key highlights include detailed user profiles, posts with interactive elements, and examples of media sharing like articles and announcements. The platform emphasizes connections and professional networking. \nWith its clean design and intuitive interface, HiveMind serves as a tool to explore how professional social media functions, offering insights into content sharing, user interaction, and networking dynamics.`,

  meMyself:
  `This website features a mock social media platform designed to simulate the experience of navigating and interacting with a modern social feed. Users can explore dynamically generated posts, switch between different profiles, and interact with a simulated timeline, mimicking the core features of popular social media platforms. \n The design focuses on simplicity and accessibility, providing a clean interface that makes it easy for users to engage with the content. Profiles can be switched seamlessly, giving a unique perspective on how users interact with their personalized feeds. The project highlights key elements of social media functionality, from user feeds to profile switching, in a controlled and educational setting.\nAs a browser-based demonstration, the site offers an intuitive and lightweight experience, making it a creative exploration of how social media frameworks operate. This platform serves as a showcase of essential web development skills, combining dynamic data rendering, responsive design, and user interactivity.`,

  scriptScavengers:
  `This website offers an engaging typing game called "Script Scavenger." Players are prompted to type words accurately and swiftly to collect virtual items within a limited timeframe. The game features a straightforward interface with a "Start" button to begin gameplay and displays high scores to encourage competition. Its minimalist design ensures focus on typing skills, making it both entertaining and educational for users seeking to improve their typing speed and accuracy.`,

  blackjack:
  `This website provides a simple and accessible online version of the classic card game Blackjack. Players can deal cards, hit, hold (stand), double down, or reset the game, with betting options of 10, 50, or 100 units. \nThe goal is to get a hand value as close to 21 as possible without exceeding it, while beating the dealer. The interface updates in real-time, displaying both the player's and dealer's hands. \nThe minimalist design ensures easy navigation, and the game runs directly in a browser without downloads, offering a smooth and enjoyable experience for casual play or practice.`
}

document.addEventListener('DOMContentLoaded', function () {
  // Get all expandable headers
  const headers = document.querySelectorAll('.expandable-header');

  headers.forEach(header => {
      header.addEventListener('click', function () {
          // Toggle the expanded class on the parent element
          const expandable = this.parentElement;
          expandable.classList.toggle('expanded');

          // Close other expanded sections (optional)
          headers.forEach(otherHeader => {
              if (otherHeader !== header) {
                  otherHeader.parentElement.classList.remove('expanded');
              }
          });
      });
  });
});