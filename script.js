"use strict";

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const nav = document.querySelector(".nav");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const header = document.querySelector(".header");

////////////////////////////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// Add a cookie message
const message = document.createElement("div");
message.classList.add("cookie-message");
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!';

// Add as a child
header.append(message);

// Delete element
document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    message.remove();
  });

// Change styles of cookie message
message.style.backgroundColor = "#37383d";
message.style.position = "fixed";
message.style.top = "91.5%";
message.style.zIndex = "999";
message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 30 + "px";

////////////////////////////////////////////////////////////
// Button scrolling

btnScrollTo.addEventListener("click", function (e) {
  section1.scrollIntoView({ behavior: "smooth" });
});

////////////////////////////////////////////////////////////
// Page navigation

// Smooth scrolling on each nav link (not efficient method)
// document.querySelectorAll(".nav__link").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     const id = this.getAttribute("href");
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });

// Event delegation technique
// 1. Add event listener to common parent element
// 2. Determine what element originated the event
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

////////////////////////////////////////////////////////////
// Tabbed component

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
  tabsContent.forEach((content) =>
    content.classList.remove("operations__content--active")
  );

  // Activate tab
  clicked.classList.add("operations__tab--active");

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

////////////////////////////////////////////////////////////
// Menu fade animation

const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// How to pass arguments into event handler function?
// the this keyword is now 0.5 or 1
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

////////////////////////////////////////////////////////////
// Sticky navigation: 'scroll' event

// const initialCoords = section1.getBoundingClientRect();
// // bad practice to use 'scroll' event (bad for performance)
// window.addEventListener("scroll", function () {
//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add("sticky");
//   } else {
//     nav.classList.remove("sticky");
//   }
// });

////////////////////////////////////////////////////////////
// Sticky navigation: Intersection Observer API

// // The callback fn will get called each time that the observed
// // element (target) is intersecting the root element at the defined treshold
// // entries - array of treshold entries
// const obsCallback = function (entries, observer) {
//   entries.forEach((entry) => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   // root - element that the target is intersecting with
//   root: null, // target is intersecting the entire viewport
//   // threshold - % of intersection at which the observer callback will be called
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries; // entry[0]

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`, // pixels 'before' the treshold will be reached (height of the navbar)
});

headerObserver.observe(header);

/*
// EXPERIMENTING

////////////////////////////////////////////////////////////
//////      SELECTING, CREATING & INSERTING ELEMS      /////
////////////////////////////////////////////////////////////

// Selecting elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const allSections = document.querySelectorAll(".section");
console.log(allSections);

document.getElementById("section--1");
const allButtons = document.getElementsByTagName("button");
console.log(allButtons);

console.log(document.getElementsByClassName("btn"));

// Creating and inserting elements
// .insertAjacentHTML

const header = document.querySelector(".header");
const message = document.createElement("div");
message.classList.add("cookie-message");
// message.textContent = "We use cookies for improved functionality and analytics.";
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!';

// header.prepend(message);
header.append(message); // add as a child
// header.append(message.cloneNode(true)); // add copy to the end as a child

// header.before(message); // add as a sibling before .header
// header.after(message);

// Delete elements
document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    message.remove();
    message.parentElement.removeChild(message);
  });
*/

/*
////////////////////////////////////////////////////////////
///////////      STYLES, ATTRIBUTES & CLASSES     //////////
////////////////////////////////////////////////////////////

// Styles
message.style.backgroundColor = "#37383d";
message.style.position = "fixed";
message.style.top = "91.5%";
message.style.zIndex = "999";

// This reads inline styles only
console.log(message.style.height); // got nothing
console.log(message.style.backgroundColor); // got backgroundColor (that inline in the html we added before)

// That's how to read needed style of an element that we didn't define ourselves
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 30 + "px";

// Work with custom properties
// document.documentElement equivalent to :root selector in CSS
document.documentElement.style.setProperty("--color-primary", "orangered");

// Attributes
const logo = document.querySelector(".nav__logo");
console.log(logo.alt);
console.log(logo.className);

// Set attributes
logo.alt = "Beautiful minimalist logo";

// Non-standard -- doesn't work
console.log(logo.designer);
// To get non-standard attribute use
console.log(logo.getAttribute("designer"));
logo.setAttribute("company", "Bankist");

// Get absolute path
console.log(logo.src);
// Get relative path
console.log(logo.getAttribute("src"));

const link = document.querySelector(".nav__link--btn");
console.log(link.href);
console.log(link.getAttribute("href"));

// Data attributes
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add("c", "j");
logo.classList.remove("c", "j");
logo.classList.toggle("c");
logo.classList.contains("c"); // not includes

// Don't use this. This will overwrite all the existing classes
logo.className = "jonas";
*/

/*
////////////////////////////////////////////////////////////
//////////////         SMOOTH SCROLLING        /////////////
////////////////////////////////////////////////////////////

// Smooth scrolling
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", function (e) {
  const s1coords = section1.getBoundingClientRect();

  // console.log(s1coords);

  // console.log(e.target.getBoundingClientRect());

  // console.log("Current scroll (X/Y)", window.pageXOffset, window.pageYOffset);

  // console.log(
  //   "height/width viewport",
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // Scrolling
  // Oldschool way
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: "smooth",
  });

  // Modern way
  section1.scrollIntoView({ behavior: "smooth" });
});

/*
////////////////////////////////////////////////////////////
/////////////////       EVENT HANDLERS      ////////////////
////////////////////////////////////////////////////////////

const h1 = document.querySelector("h1");

const alertH1 = function (e) {
  alert("addEventListener: Great! You are reading the heading :D");
};

h1.addEventListener("mouseenter", alertH1);

setTimeout(() => h1.removeEventListener("mouseenter", alertH1), 5000);

// oldschool (overwrites another property onmouseenter)
// h1.onmouseenter = function (e) {
//   alert("onmouseenter: Great! You are reading the heading :D");
// };
*/

/*
////////////////////////////////////////////////////////////
//////////////       EVENT PROPAGATION       ///////////////
////////////////////////////////////////////////////////////

// rgb(255,255,255)
const randomInt = (min, max) => Math.round(Math.random() * (max - min) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

console.log(randomColor());

document.querySelector(".nav__link").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("LINK", e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  // Stop propagation ()
  // e.stopPropagation();
});

document.querySelector(".nav__links").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("LINKS", e.target, e.currentTarget);
});

document.querySelector(".nav").addEventListener(
  "click",
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log("NAV", e.target, e.currentTarget);
  },
  true // choose capturing phase instead of bubbling phase (optional parameter, noone use it)
);
*/

/*
////////////////////////////////////////////////////////////
///////////////       DOM TRAVERSING        ////////////////
////////////////////////////////////////////////////////////

const h1 = document.querySelector("h1");

// Going downwards: child
console.log(h1.querySelectorAll(".highlight"));
// all child nodes including comments, text nodes, brs etc.
console.log(h1.childNodes);
// only elements, only works for direct children
console.log(h1.children);
h1.firstElementChild.style.color = "white";
h1.lastElementChild.style.color = "crimson";

// Going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);

// closest parent element with class .header
h1.closest(".header").style.background = "var(--gradient-secondary)";
// the h1 element itself
h1.closest("h1").style.background = "var(--gradient-primary)";

// Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

// all siblings not direct
console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = "scale(0.5)";
});
*/
