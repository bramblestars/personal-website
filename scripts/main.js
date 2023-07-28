/************ Mobile button handler ************/

const btnNavEl = document.querySelector(".btn-mobile-nav");
const navEl = document.querySelector(".navigation");

btnNavEl.addEventListener('click', function() {
    console.log("hi");
    navEl.classList.toggle('nav-open');
});

