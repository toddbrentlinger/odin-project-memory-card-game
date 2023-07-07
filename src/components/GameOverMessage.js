import React from "react";

function GameOverMessage(props) {
    const { didWin = false, createNewGame } = props;

    const displayWinMessage = () => {
        return (
            <p>Game Over! You Win!</p>
        );
    };

    const displayLoseMessage = () => {
        return (
            <p>Game Over! You Lose!</p>
        );
    };

    return (
        <section id="game-over-message-container">
            {
                didWin ? displayWinMessage() : displayLoseMessage()
            }
            <button onClick={createNewGame}>Start New Game</button>
        </section>
    );
}

export default GameOverMessage;
