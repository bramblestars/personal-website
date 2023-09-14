export class arcaeaCalculator {

    #ratingList;
    #songDict;
    /* 
     * ptt: the player's potential
     * songList: an array of song objects with title, artist, and ratings for each difficulty
     * scoreList: an array of score objects consisting of song names and the player's score
     *            for each difficulty
     */
    constructor(ptt, songList, scoreList) {
        this.ptt = ptt;
        this.songList = songList;
        this.scoreList = scoreList;
        this.#ratingList = [];
        this.#songDict = [];
    }

    get ratingList() {
        return this.#ratingList;
    }

    calculateRatings() {
        for (let i = 0; i < this.songList.length; i++) {
            this.#songDict[this.songList[i].name] = this.songList[i];
        }
    
        let currSong, pstRating, prsRating, ftrRating, bydRating;
    
        for (let i = 0; i < this.scoreList.length; i++)
        {
            currSong = this.#songDict[this.scoreList[i].name];
    
            if (this.scoreList[i].pst) {
                pstRating = this.#playRating(currSong.pst, this.scoreList[i].pst);
                this.#ratingList.push({
                    "name": currSong.name + " (PST)",
                    "rating": pstRating
                });
            }
    
            if (this.scoreList[i].prs) {
                prsRating = this.#playRating(currSong.prs, this.scoreList[i].prs);
                this.#ratingList.push({
                    "name": currSong.name + " (PRS)",
                    "rating": prsRating
                });
            }
    
            if (this.scoreList[i].ftr) {
                ftrRating = this.#playRating(currSong.ftr, this.scoreList[i].ftr);
                this.#ratingList.push({
                    "name": currSong.name + " (FTR)",
                    "rating": ftrRating
                });
            }
    
            if (this.scoreList[i].byd) {
                bydRating = this.#playRating(currSong.byd, this.scoreList[i].byd);
                this.#ratingList.push({
                    "name": currSong.bydname ? currSong.bydname : currSong.name + " (BYD)",
                    "rating": bydRating
                });
            }
        }
    
        this.#ratingList.sort(function (score1, score2) {
            if (score1.rating < score2.rating) return 1;
            else if (score1.rating > score2.rating) return -1;
            else return 0;
        });
        
    }
    
    
    getTop30Avg() {
        let accum = 0;
        for (let i = 0; i < 30; i++) {
            accum += this.#ratingList[i].rating;
        }
        return accum / 30;
    }
    
    getRecentAvgFromPtt() {
        
        return (this.ptt * 40 - top30Avg * 30) / 10;
    }
    
    getHighestPttWithoutHiScore() {
        let accum = 0;
        for (let i = 0; i < 10; i++) {
            accum += this.#ratingList[i].rating;
        }
    
        return (this.getTop30Avg() * 30 + accum) / 40;
    }
    
    
    
    #playRating(constant, score) {
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
}