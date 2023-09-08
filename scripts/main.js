// header
const header = document.getElementById("header");

// body (to add dark theme)
const body = document.getElementById("body");

//toggle switch for dark theme
const themeToggle = document.querySelector('input[type="checkbox"]');

// sections on home page
const aboutSection = document.getElementById("about-section");
const gamedevSection = document.getElementById("gamedev-section");
const funSection = document.getElementById("fun-section");
const cvSection = document.getElementById("cv-section");

const gamedevBtn = document.getElementById("gamedev");
const funBtn = document.getElementById("fun");
const cvBtn = document.getElementById("cv");

// mobile navigation button
const btnNavEl = document.querySelector(".btn-mobile-nav");
const navEl = document.querySelector(".navigation");

// keyboard event codes
const KEY_SPACE = 32;
const KEY_ENTER = 13;

// focus booleans
let isFocusOnToggle = false;

/***********************************************************/ 
/************** Mobile menu button handler *****************/
/***********************************************************/ 
btnNavEl.addEventListener('click', function() {
    navEl.classList.toggle('nav-open');
});

/***********************************************************/ 
/********************* Sticky header ***********************/
/***********************************************************/ 
// When the user scrolls the page, execute myFunction
window.onscroll = stickyHeader;


// Get the offset position of the navbar
const sticky = $(window).height();

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function stickyHeader() {
  if (window.scrollY > sticky) {
    body.classList.add("sticky-header");
  } else {
    body.classList.remove("sticky-header");
  }
} 

/***********************************************************/ 
/****************** Switch between pages *******************/
/***********************************************************/ 
let currentActivePage = aboutSection;

/**
 * Adds the nodisp class to the current active page and switches the current
 * active page to the new section as specified. Also exits the mobile menu if
 * that was active.
 * @param {any} section the HTML section element to switch to 
 */
function switchToPage(section) {
    currentActivePage.classList.add("nodisp");
    section.classList.remove("nodisp");
    currentActivePage = section;
    currentActivePage.focus();
    navEl.classList.remove('nav-open');
}


$("#gamedev").click(() => {
    switchToPage(gamedevSection);
});

$("#fun").click(() => {
    switchToPage(funSection);
});

$("#cv").click(() => {
    switchToPage(cvSection);
});

/***********************************************************/ 
/************************ Dark theme ***********************/
/***********************************************************/ 
function nightTheme(event) {
    body.classList.toggle("dark");

    // Save preference to local storage
    if (body.classList.contains("dark")) {
        localStorage.setItem('theme', 'dark');
        themeToggle.checked = true;
    } else {
        localStorage.setItem('theme', 'light');
        themeToggle.checked = false;
    }
}

if (localStorage.getItem('theme') && localStorage.getItem('theme') == 'dark') {
    nightTheme();
} 

themeToggle.addEventListener('change', nightTheme);
$("#theme-toggle").keydown((event) => {
    if (isFocusOnToggle && event.keyCode === KEY_ENTER) {
        nightTheme();
    }
});

function setFocusThemeToggle() {
    isFocusOnToggle = true;
}