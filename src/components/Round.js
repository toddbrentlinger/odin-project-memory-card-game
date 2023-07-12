import React from "react";
import Card from "./Card";
import uniqid from "uniqid";

function Round({ cardsInRound, handleSelectCard }) {
    return (
        <section id="memory-card-round">
            {
                cardsInRound.map((card) => <Card key={uniqid()} card={card} handleSelectCard={handleSelectCard}/>)
            }
        </section>
    );
}

export default Round;
