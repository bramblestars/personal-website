const photo = document.getElementById("kiwi-pic");
const newPicButton = document.getElementById("new-pic-button");

// number of pics currently in Kiwi folder
const NUMPICS = 80;

// minimum number of pictures before the user should see a repeat image
const NOREPEAT = 20;

function getRandomPicUrl() {
    picNum = Math.floor(Math.random() * NUMPICS);
    if (picNum < 10) {
        return `../img/kiwi/0${picNum}.jpg`;
    } else {
        return `../img/kiwi/${picNum}.jpg`;
    }
}

function randomizePhoto() {
    let randomUrl = getRandomPicUrl();

    // avoid using same picture twice in a row
    while (randomUrl == photo.src) {
        randomUrl = getRandomPicUrl();
    }

    photo.src = randomUrl;
}

randomizePhoto();

newPicButton.addEventListener('click', randomizePhoto);