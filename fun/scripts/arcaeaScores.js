const memoryArchive = new Set(
    [
        "Alexandrite", "Altale", "amygdata", "Astral tale", "AttaqtiA",
        "Aurgelmir", "Auxesia", "Avant Raze", "BADTEK", "BATTLE NO.1",
        "Be There", "BUCHiGiRE Berserker", "Call My Name feat. Yukacco",
        "Can I Friend You on Bassbook? Lol", "Capella", "carmine:scythe",
        "cocoro*cosmetic", "Crimson Throne", "CROSS†SOUL", "DataErr0r",
        "Dot to Dot feat. shully", "Dreadnought", "dropdead", "Einherjar Joker",
        "Empire of Winter","Evening in Scarlet", "Fallensquare", "Feels So Right feat. Renko",
        "Filament", "Free Myself", "Galactic Love", "Galaxy Friends", 
        "GIMME DA BLOOD", "goldenslaughterer", "Head BONK ache", "Heavenly caress",
        "Hiiro Gekka, Kyoushou no Zetsu (nayuta 2017 ver.)", "Impure Bird",
        "init()", "INTERNET OVERDOSE", "INTERNET YAMERO", "IZANA", "Kissing Lucifer",
        "La'qryma of the Wasteland", "lastendconductor", "Libertas", "Lost in the Abyss",
        "Macrocosmic Modulation", "MAHOROBA", "Malicious Mischance", "Manic Jeer",
        "Metallic Punisher",  "Mirzam", "Modelista", "NEO WINGS", "New York Back Raise",
        "NULL APOPHENIA", "Phantasia", "PICO-Pico-Translation!", "PRIMITIVE LIGHTS",
        "PUPA", "Redolent Shape", "REKKA RESONANCE", "SACRIFICE feat. ayame", 
        "SAIKYO STRONGER", "Scarlet Cage", "Sheriruth (Laur Remix)", "Summer Fireworks of Love",
        "Surrender", "Teriqma", "The Survivor (Game Edit)", "THE ULTIMACY", 
        "To the Milky Way", "Xanatos", "Xeraphinite", "Yosakura Fubuki",  
        "Your voice so... feat. Such", "γuarδina", "µ"
    ]);

const arcaea = new Set(
    [
        "Altair (feat. *spiLa*)", "Anökumene", "Babaroque", "Blaster", 
        "Bookmaker (2D Version)", "Brand new world", "Chronostasis", 
        "Clotho and the stargazer", "Cybernecia Catharsis", "Dancin' on a Cat's Paw",
        "Dandelion", "DDD", "Dement ~after legend~", "Dialnote", "Diode",
        "Dreamin' Attraction!!", "Fairytale", "FREEF4LL", "GOODTEK (Arcaea Edit)",
        "Grimheart", "Harutopia ~Utopia of Spring~", "Ignotus", "Illegal Paradise",
        "Infinity Heaven", "inkar-usi", "Kanagawa Cyber Culvert", "Lost Civilization",
        "Lucifer", "LunarOrbit -believe in the Espebranch road-", "Monochrome Princess",
        "Nhelv", "NULCTRL", "Oblivia", "One Last Drive", "Purgatorium",
        "qualia -ideaesthesia-", "Rabbit In The Black Room", "Red and Blue", 
        "Redraw the Colorless World", "Reinvent", "ReviXy", "Rise",
        "Rugie", "Sakura Fubuki", "san skia", "Sayonara Hatsukoi", "Senkyou", 
        "Shades of Light in a Transcendent Realm", "Snow White", "Suomi", 
        "SUPERNOVA", "Syro", "Trap Crow", "VECTOЯ", "Vexaria", "world.execute(me);",
        "Ävril -Flicka i krans-"
    ]);

let songs = [];
let myScores = [];
let ratingList = [];
const songDict = {};

async function parseJSON() {

    await fetch("./scripts/arcaeaConstants.json")
        .then(response => {
            return response.json()
        })
        .then(data => { 
            const constString = JSON.stringify(data);
            const constantObj = JSON.parse(constString);
            Object.assign(songs, constantObj.songs);
        })
        .catch(error => 
            console.log(error)
        );
        
    await fetch("./scripts/myArcaeaScores.json")
        .then(response => {
            return response.json()
        })
        .then(data => { 
            const constString = JSON.stringify(data);
            const constantObj = JSON.parse(constString);
            Object.assign(myScores, constantObj.scores);
        })
        .catch(error => 
            console.log(error)
        );
}

await parseJSON();
for (let i = 0; i < songs.length; i++) {
    songDict[songs[i].name] = songs[i];
}
calculateRatings();


function calculateRatings() {
    let currSong, pstRating, prsRating, ftrRating, bydRating;

    for (let i = 0; i < myScores.length; i++)
    {
        currSong = songDict[myScores[i].name];

        if (myScores[i].pst) {
            pstRating = playRating(currSong.pst, myScores[i].pst);
            ratingList.push({
                "name": currSong.name + " (PST)",
                "rating": pstRating
            });
        }

        if (myScores[i].prs) {
            prsRating = playRating(currSong.prs, myScores[i].prs);
            ratingList.push({
                "name": currSong.name + " (PRS)",
                "rating": prsRating
            });
        }

        if (myScores[i].ftr) {
            ftrRating = playRating(currSong.ftr, myScores[i].ftr);
            ratingList.push({
                "name": currSong.name + " (FTR)",
                "rating": ftrRating
            });
        }

        if (myScores[i].byd) {
            bydRating = playRating(currSong.byd, myScores[i].byd);
            ratingList.push({
                "name": currSong.bydname ? currSong.bydname : currSong.name + " (BYD)",
                "rating": bydRating
            });
        }
    }

    ratingList.sort(function (score1, score2) {
        if (score1.rating < score2.rating) return 1;
        else if (score1.rating > score2.rating) return -1;
        else return 0;
    });
    
}



function getTop30Avg() {
    let accum = 0;
    for (let i = 0; i < 30; i++) {
        accum += ratingList[i].rating;
    }
    return accum / 30;
}

console.log(ratingList);
console.log(getTop30Avg());


function playRating(constant, score) {
    if (score >= 10000000) {
        return constant + 2.0;
    } 

    else if (score >= 9800000) {
        return constant + 1 + (score - 9800000) / 200000;
    }

    else {
        return constant + (score - 9500000) / 300000;
    }
}

