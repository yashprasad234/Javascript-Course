'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');

///////////////////////////////////////
// Modal window

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////////////////////////////
// Button Scrolling

btnScrollTo.addEventListener('click', e => {
  const s1Coords = section1.getBoundingClientRect();
  console.log(s1Coords);

  console.log(e.target.getBoundingClientRect());

  console.log('Current Scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
  // Scrolling
  // window.scrollTo(
  //   s1Coords.left + window.pageXOffset,
  //   s1Coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1Coords.left + window.pageXOffset,
  //   top: s1Coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

//////////////////////////////////////
// Page Navigation

// document.querySelectorAll('.nav__link').forEach(link => {
//   link.addEventListener('click', e => {
//     e.preventDefault();
//     document
//       .querySelector(e.currentTarget.getAttribute('href'))
//       .scrollIntoView({ behavior: 'smooth' });
//   });
// });

// Event delegation
// 1. Add event listener to the common parent of all the childs
// 2. Determine which element trigerred the event

document.querySelector('.nav__links').addEventListener('click', e => {
  e.preventDefault();
  // console.log(e.target);

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    // console.log('LINK');
    document
      .querySelector(e.target.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed component

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);
  const active = +clicked.dataset.tab;
  // Gaurd clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(el => el.classList.remove('operations__tab--active'));
  tabsContent.forEach(el => el.classList.remove('operations__content--active'));

  // Active tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  tabsContent[active - 1].classList.add('operations__content--active');
});

// **** Difference b/w mouseover and mouseenter is that mouseenter does not bubble whereas mouseover does

// Menu fade animation

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(sib => {
      if (sib !== link) {
        sib.style.opacity = this;
      }
      logo.style.opacity = this;
    });
  }
};

// nav.addEventListener('mouseover', e => handleHover(e, '0.5'));

// nav.addEventListener('mouseout', e => handleHover(e, '1'));

nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky navigation

// const initialCoords = section1.getBoundingClientRect();

// It is not recommended to use the scroll event as it happens all the time and it is really bad for performance, loading the site on an older device, this will be very noticeable
// window.addEventListener('scroll', () => {
//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// Sticky navigation: Intersection Observer API

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickNav = entries => {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickNav, {
  root: null,
  threshold: 0,
  rootMargin: `${-navHeight}px`,
});
headerObserver.observe(header);

// Reveal Sections
const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  sectionObserver.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(sec => {
  sectionObserver.observe(sec);
  sec.classList.add('section--hidden');
});

// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');
const laodImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', () =>
    entry.target.classList.remove('lazy-img')
  );
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(laodImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px', // To make sure the images start loading before we reach them  (improves performance)
});

imgTargets.forEach(img => imgObserver.observe(img));

// Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let currSlide = 0;
  const maxSlides = slides.length;

  // const slider = document.querySelector('.slider');
  // slider.style.transform = `scale(0.2) translateX(-1200px)`;
  // slider.style.overflow = `visible`;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"  ></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${(i - slide) * 100}%)`;
    });
    activateDot(slide);
  };

  // Next slide
  const nextSlide = function () {
    if (currSlide === maxSlides - 1) {
      currSlide = 0;
    } else {
      currSlide++;
    }
    goToSlide(currSlide);
  };

  const prevSlide = function () {
    if (currSlide === 0) {
      currSlide = maxSlides - 1;
    } else {
      currSlide--;
    }
    goToSlide(currSlide);
  };

  const init = function () {
    createDots();
    goToSlide(0);
  };
  init();

  // Event handlers

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    e.key === 'ArrowRight' && nextSlide();
    e.key === 'ArrowLeft' && prevSlide();
    // if(e.key)
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) console.log('DOT');
    const { slide } = e.target.dataset;
    goToSlide(slide);
  });
};
slider();

/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////

/*
///////////////////////////////////////
// Selecting, Creating and Deleting Elements

// Selecting
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

// Creating

// .insertAdjacentHTML
const message = document.createElement('div');
// console.log(message);
message.classList.add('cookie-message');
// message.textContent =
// 'We use cookies for improved functionality and analytics.';
message.innerHTML = `We use cookies for improved functionality and analytics. <button class="btn btn--close--cookie" >Got it!</button>`;

// Inserting

// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true)) // Creates a copy of the selected element so it can be at two places at the same time

// header.before(message);
// header.after(message);

// Deleting
document.querySelector('.btn--close--cookie').addEventListener('click', () => {
  message.remove();
  // message.parentElement.removeChild(message); // Old way of doing it
});

////////////////////////////////////////
// Styles, Attributes and Classes

// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.height); // wont output anything since this only reads inline styles (also writes inline styles) and styles that we might have added using JS.
console.log(message.style.backgroundColor);

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
const logo = document.querySelector('.nav__logo');
// console.log(logo);
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

logo.alt = 'Beautiful minimalist logo';

// Non-standard
console.log(logo.designer);
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');

console.log(logo.src); // absolute url
console.log(logo.getAttribute('src')); // relative url (if we entered the relative url)

const link = document.querySelector('.nav__link--btn');
// same as src, with getAttribute we get the relative url and with . notation we get absolute url
console.log(link.href);
console.log(link.getAttribute('href'));

// Data Attributes
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('c');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c');

// DON'T USE
logo.className = 'jonas'; // This will remove all the classes that logo contains and replace them with one class 'jonas' and it can only replace all those classes with one class that is why it is not recommended to be used
*/

/*
///////////////////////////
// types of events and event handlers

const h1 = document.querySelector('h1');

const alertH1 = () => {
  console.log('addEventListener: You are reading the heading :D');
  h1.removeEventListener('mouseenter', alertH1);
};

h1.addEventListener('mouseenter', alertH1);

h1.onmouseenter = e =>
  console.log('onmouseenter: You are reading the heading :D');

h1.onclick = e => console.log('onclick: You just clicked the heading :D');
*/

/*
//////////////////////////////////
// Event Propagation

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
console.log(randomColor());

document.querySelector('.nav__link').addEventListener('click', e => {
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.currentTarget === this);
  e.currentTarget.style.backgroundColor = randomColor();

  // Stop propagation
  // e.stopPropagation();
});

// document.querySelector('.nav__link').addEventListener('click', e => {
//   console.log(this);
//   // this.style.backgroundColor = randomColor();
// });

document.querySelector('.nav__links').addEventListener('click', e => {
  console.log('CONTAINER', e.target, e.currentTarget);
  e.currentTarget.style.backgroundColor = randomColor();
});

document.querySelector('.nav').addEventListener('click', e => {
  console.log('NAV', e.target, e.currentTarget);
  e.currentTarget.style.backgroundColor = randomColor();
});

// By adding a third parameter to our event handler and setting it to true the event will no longer listen to bubbling events but to capturing events
// document.querySelector('.nav').addEventListener(
//   'click',
//   e => {
//     console.log('NAV', e.target, e.currentTarget);
//     e.currentTarget.style.backgroundColor = randomColor();
//   },
//   true
// );
*/

/*
/////////////////////////////
// DOM Traversal

const h1 = document.querySelector('h1');

// Going downwards: child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// Going upwards: parent
console.log(h1.parentNode);
// console.log(document.querySelector('.prac-link').parentNode);
console.log(h1.parentElement);
// console.log(document.querySelector('.prac-link').parentElement);

console.log(h1.closest('header'));
h1.closest('header').style.background = 'var(--gradient-secondary)';
// document.querySelector('.prac-link').closest('.prac-class').style.background =
//   'var(--gradient-secondary)';

// Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(el => {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
*/

document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

window.addEventListener('load', function (e) {
  console.log('Page fully loaded :D', e);
});

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = 'fd';
// });
