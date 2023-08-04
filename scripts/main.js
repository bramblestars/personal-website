// sections on home page
const homeSection = document.getElementById("home-section");
const aboutSection = document.getElementById("about-section");
const blogSection = document.getElementById("blog-section");
const gamedevSection = document.getElementById("gamedev-section");

const homeBtn = document.getElementById("home");
const aboutBtn = document.getElementById("about");
const blogBtn = document.getElementById("blog");
const gamedevBtn = document.getElementById("gamedev");
const cvBtn = document.getElementById("cv");

// mobile navigation button
const btnNavEl = document.querySelector(".btn-mobile-nav");
const navEl = document.querySelector(".navigation");

/************ Mobile menu button handler ************/
btnNavEl.addEventListener('click', function() {
    navEl.classList.toggle('nav-open');
});

/*************** Switch between pages ***************/
let currentActivePage = homeSection;

function switchToPage(section) {
    currentActivePage.classList.add("nodisp");
    section.classList.remove("nodisp");
    currentActivePage = section;
}

aboutBtn.addEventListener("click", () => {
    switchToPage(aboutSection);
});

blogBtn.addEventListener("click", () => {
    switchToPage(blogSection);
});

gamedevBtn.addEventListener("click", () => {
    switchToPage(gamedevSection);
})