import React, { useState, useEffect } from "react";
import GameOverMessage from "./GameOverMessage";
import Round from "./Round";
import Scoreboard from "./Scoreboard";
import uniqid from "uniqid";

const images = importAll(require.context('../images/characters', false, /\.(png|jpe?g|svg)$/));

function importAll(r) {
    console.log('Import all images!');
    return r.keys().map((item) => {
        return {
            image: r(item),
            title: item.replace('./', ''),
            id: uniqid(),
        };
    });
}

/**
 * Randomizes array in-place using the Fisher-Yates (aka Knuth) Shuffle.
 * @param {Array} arr 
 * @returns Randomized array
 */
function randomizeArr(arr) {
    let currIndex = arr.length, randomIndex;

    // While there are remaining items to shuffle
    while (currIndex > 0) {
        // Pick random remaining item index
        randomIndex = Math.floor(Math.random() * currIndex);

        // Decrement currIndex
        currIndex--;

        // Swap random item with current item
        [arr[currIndex], arr[randomIndex]] = [
            arr[randomIndex],
            arr[currIndex]
        ];
    }

    return arr;
}

function getRandomItems(arr, nItems) {
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

function Game({ roundMax = 5 }) {
    // State
    const [scoreBest, setScoreBest] = useState(localStorage.getItem('scoreBest') || 0);
    const [scoreCurrent, setScoreCurrent] = useState(0);
    const [roundCurrent, setRoundCurrent] = useState(2);
    const [cardsSelectedInRound, setCardsSelectedInRound] = useState([]);
    const [cardsInRound, setCardsInRound] = useState(() => createCardsInRound());
    const [isGameOver, setIsGameOver] = useState(false);

    // Effects
    useEffect(() => {
        localStorage.setItem('scoreBest', scoreBest);
    }, [scoreBest]);

    // useEffect(() => {
    //     createNewRound();
    // }, [roundCurrent]);

    const createNewGame = () => {
        setRoundCurrent(1);
        setScoreCurrent(0);
        setIsGameOver(false);
        createNewRound();
    };

    const createNewRound = () => {
        setCardsSelectedInRound([]);
        setCardsInRound(createCardsInRound());
    };

    function createCardsInRound() {
        // ISSUE: roundCurrent used is not updated value
        const numCardsPerRound = parseInt(images.length / roundMax) * roundCurrent;
        const newCardsInRound = getRandomItems(images, numCardsPerRound);
        randomizeArr(newCardsInRound);
        return newCardsInRound;
    }

    const checkRoundComplete = () => {
        if (cardsInRound.length === cardsSelectedInRound.length) {
            if (roundCurrent === roundMax) {
                // End Game with win state
                endGame(true);
            } else {
                setRoundCurrent(roundCurrent + 1);
                createNewRound();
            }
        } else { // Continue current round
            setCardsInRound(randomizeArr(cardsInRound));
        }
    };

    const handleSelectCard = (selectedCard) => {
        // Return if selectedCard is not even in cardsInRound (invalid card)
        if (cardsInRound.find((card) => card.id === selectedCard.id) === undefined) { return; }
        
        // If selectedCard is already in cardsSelectedInRound, end game and return
        if (cardsSelectedInRound.find((card) => card.id === selectedCard.id)) {
            // End Game with fail state
            endGame();
            return;
        }
        
        // If reach here, selectedCard is valid AND NOT already selected
        
        // Add selectedCard to cardsSelectedInRound array
        setCardsSelectedInRound([...cardsSelectedInRound, selectedCard]);

        const newScore = scoreCurrent + 1;

        // Increment current score
        setScoreCurrent(newScore);

        // Update best score if necessary
        // TODO: Should use useEffect to update scoreCurrent instead?
        if (newScore >= scoreBest) {
            setScoreBest(newScore);
        }

        // Check if round is complete
        checkRoundComplete();
    };

    const endGame = (didWin = false) => {
        if (didWin) {

        } else {

        }
        setIsGameOver(true);
    };

    const renderGame = () => {
        return (
            <>
                <Scoreboard 
                    scoreCurrent={scoreCurrent} 
                    scoreBest={scoreBest}
                />
                <div id="round-container">
                    <span>Round: </span>
                    <span id="round-number">{`${roundCurrent} of ${roundMax}`}</span>
                </div>
                <Round 
                    cardsInRound={cardsInRound} 
                    handleSelectCard={handleSelectCard}
                />
            </>
        );
    };

    const renderGameOver = () => {
        return (
            <GameOverMessage createNewGame={createNewGame}/>
        );
    };

    return (
        <div id="memory-card-game-container">
            {
                isGameOver ? renderGameOver() : renderGame()
            }
        </div>
    );
}

export default Game;
