import Card from "./card";

function importAll(r) {
    return r.keys();
}

const images = importAll(require.context('../images/characters', false, /\.(png|jpe?g|svg)$/));

class Game {
    constructor(scoreBest = 0) {
        this.roundMax = 5;
        this.scoreBest = scoreBest;
        this.populateCards();
    }

    createNewGame() {
        this.roundCurrent = 1;
        this.scoreCurrent = 0;
        this.createNewRound();
    }

    createNewRound() {
        console.log(`Round ${this.roundCurrent} of ${this.roundMax}`);
        this.cardsSelectedInRound = [];
        const numCardsPerRound = parseInt(this.cards.length / this.roundMax) * this.roundCurrent;
        this.cardsInRound = this.getRandomItems(this.cards, numCardsPerRound);
    }

    selectCard(selectedCard) {
        // Return if selectedCard is not even in cardsInRound (invalid card)
        if (!this.cardsInRound.includes(selectedCard)) { return; }

        // If selectedCard is already in cardsSelectedInRound, end game and return
        if (this.cardsSelectedInRound.includes(selectedCard)) {
            this.endGame();
            return;
        }

        // If reach here, selectedCard is valid AND NOT already selected
        
        // Add selectedCard to cardsSelectedInRound array
        this.cardsSelectedInRound.push(selectedCard);

        // Increment current score
        this.scoreCurrent++;

        // Update best score if necessary
        if (this.scoreCurrent >= this.scoreBest) {
            this.scoreBest = this.scoreCurrent;
        }

        // Check if round is complete
        this.checkRoundComplete();
    }

    checkRoundComplete() {
        if (this.cardsInRound.length === this.cardsSelectedInRound.length) {
            if (this.roundCurrent === this.roundMax) {
                this.endGame(true);
            } else {
                this.roundCurrent++;
                this.createNewRound();
            }
        } else {
            // Continue round
            this.randomizeCardsInRound();
        }
    }

    endGame(didWin = false) {
        if (didWin) {

        } else {
            console.log(`Game Over!\nCurrent Score: ${this.scoreCurrent}\nBest Score: ${this.scoreBest}`);
        }
    }

    populateCards() {
        this.cards = images.map((imageUrl) => new Card(imageUrl));
    }

    init() {
        this.createNewGame();
    }

    getRandomItems(arr, nItems) {
        // If arr length is less than or equal to nItems, return all items from arr
        if (arr.length <= nItems) { return [...arr]; }

        let itemArr = [];
        let item;
        while (nItems > 0) {
            item = arr[Math.floor(Math.random() * arr.length)];
            if (!itemArr.includes(item)) {
                itemArr.push(item);
                nItems--;
            }
        }

        return itemArr;
    }

    /** Randomizes cards in current round using the Fisher-Yates (aka Knuth) Shuffle */
    randomizeCardsInRound() {
        let currIndex = this.cardsInRound.length, randomIndex;

        // While there are remaining items to shuffle
        while (currIndex > 0) {
            // Pick random remaining item index
            randomIndex = Math.floor(Math.random() * currIndex);

            // Decrement currIndex
            currIndex--;

            // Swap random item with current item
            [this.cardsInRound[currIndex], this.cardsInRound[randomIndex]] = [
                this.cardsInRound[randomIndex],
                this.cardsInRound[currIndex]
            ];
        }
    }
}

export default Game;
