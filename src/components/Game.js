import React, { useState, useEffect } from "react";
import GameOverMessage from "./GameOverMessage";
import Round from "./Round";
import Scoreboard from "./Scoreboard";
import game, { GameState } from "../scripts/game";

game.play();

function Game({ roundMax = game.roundMax }) {
    // State
    const [scoreBest, setScoreBest] = useState(Number(localStorage.getItem('scoreBest')) || 0);
    const [score, setScore] = useState(0);
    const [round, setRound] = useState(1);
    const [cardsInRound, setCardsInRound] = useState(game.cardsInRound);
    const [isGameOver, setIsGameOver] = useState(false);
    const [gameState, setGameState] = useState(GameState.PLAYING);

    // Effects
    useEffect(() => {
        localStorage.setItem('scoreBest', scoreBest);
    }, [scoreBest]);

    const createNewGame = () => {
        game.play();

        setScore(game.score);
        setScoreBest(game.scoreBest);
        setRound(game.round);
        setCardsInRound([...game.cardsInRound]);
        setIsGameOver(false);
        setGameState(game.gameState);
    };

    const handleSelectCard = (selectedCardId) => {
        game.selectCard(selectedCardId);
        
        switch(game.gameState) {
            case GameState.LOST:
            case GameState.WON:
                setIsGameOver(true);
                setGameState(game.gameState);
                break;
            case GameState.PLAYING:
            default:
                setScore(game.score);
                setScoreBest(game.scoreBest);
                setRound(game.round);
                setCardsInRound([...game.cardsInRound]);
                setIsGameOver(false);
                setGameState(game.gameState);
        }
    };

    const renderGame = () => {
        return (
            <>
                <Scoreboard 
                    scoreCurrent={score} 
                    scoreBest={scoreBest}
                />
                <div id="round-container">
                    <span>Round: </span>
                    <span id="round-number">{`${round} of ${roundMax}`}</span>
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
            <GameOverMessage 
                didWin={gameState === GameState.WIN} 
                score={score}
                scoreBest={scoreBest}
                createNewGame={createNewGame}
            />
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
