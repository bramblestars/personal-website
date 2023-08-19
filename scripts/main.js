// body (to add dark theme)
const body = document.getElementById("body");

//toggle switch for dark theme
const themeToggle = document.querySelector('input[type="checkbox"]');

// sections on home page
const aboutSection = document.getElementById("about-section");
const blogSection = document.getElementById("blog-section");
const gamedevSection = document.getElementById("gamedev-section");
const funSection = document.getElementById("fun-section");
const cvSection = document.getElementById("cv-section");

const blogBtn = document.getElementById("blog");
const gamedevBtn = document.getElementById("gamedev");
const funBtn = document.getElementById("fun");
const cvBtn = document.getElementById("cv");

// mobile navigation button
const btnNavEl = document.querySelector(".btn-mobile-nav");
const navEl = document.querySelector(".navigation");

/***********************************************************/ 
/************** Mobile menu button handler *****************/
/***********************************************************/ 
btnNavEl.addEventListener('click', function() {
    navEl.classList.toggle('nav-open');
});

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

$("#blog").click(() => {
    switchToPage(blogSection);
})

$("#gamedev").click(() => {
    switchToPage(gamedevSection);
})

$("#fun").click(() => {
    switchToPage(funSection);
})

$("#cv").click(() => {
    switchToPage(cvSection);
})

/***********************************************************/ 
/************************ Dark theme ***********************/
/***********************************************************/ 
function nightTheme() {
    body.classList.toggle("dark");

    // Save preference to local storage
    if (body.classList.contains("dark")) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

if (localStorage.getItem('theme') && localStorage.getItem('theme') == 'dark') {
    themeToggle.checked = true;
    nightTheme();
} else {
    themeToggle.checked = false;
}

themeToggle.addEventListener('change', nightTheme);