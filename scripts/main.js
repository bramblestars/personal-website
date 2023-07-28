/************ Mobile button handler ************/

const btnNavEl = document.querySelector(".btn-mobile-nav");
const navEl = document.querySelector(".navigation");
const badInspoEl = document.querySelector(".bad-inspo");

btnNavEl.addEventListener('click', function() {
    navEl.classList.toggle('nav-open');
});
