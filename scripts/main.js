// header
const header = document.getElementById("header");

// body (to add dark theme)
const body = document.getElementById("body");

//toggle switch for dark theme
const themeToggle = document.querySelector('input[type="checkbox"]');

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

let offset = $("#header").offset();
let stickyTop = offset.top;
let windowTop = $(window).scrollTop();
$(window).scroll(function() {
    windowTop = $(window).scrollTop();
    if (windowTop > stickyTop) {
        $("#header").css({
            position: 'fixed',
            top: 0
        });

        $("#hero").css({
            marginTop: "118px"
        });

        if (!body.classList.contains("dark")) {
            $("#header").css({
                backgroundColor: "#b5ebffA8"
            })
        } else {
            $("#header").css({
                backgroundColor: "#252346A8"
            })
        }

    }
    else {
        $("#header").css({
            position: '',
            top: '',
            backgroundColor: ''
        });

        $("#hero").css({
            marginTop: ""
        });
    }
});
/***********************************************************/ 
/***************** Scroll between sections *****************/
/***********************************************************/ 
$("#home").click(() => {
    $([document.documentElement, document.body]).animate({
        scrollTop: 0
    }, 750);
})

$("#about").click(() => {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#about-section").offset().top - 90
    }, 750);
})

$("#gamedev").click(() => {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#gamedev-section").offset().top - 90
    }, 750);
});

$("#fun").click(() => {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#fun-section").offset().top - 90
    }, 750);
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