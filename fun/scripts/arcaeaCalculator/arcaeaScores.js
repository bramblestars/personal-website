import { arcaeaCalculator } from "./arcaeaCalculator.js";

let songs = [];
let myScores = [];

await parseJSON();

async function parseJSON() {

    await fetch("./scripts/arcaeaCalculator/arcaeaConstants.json")
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
        
    await fetch("./scripts/arcaeaCalculator/myArcaeaScores.json")
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

let calculator = new arcaeaCalculator(12.03, songs, myScores);
calculator.calculateRatings();

console.log(calculator.ratingList);
console.log("highest without high score: " + calculator.getHighestPttWithoutHiScore());
console.log("top 30 avg: " + calculator.getTop30Avg());

