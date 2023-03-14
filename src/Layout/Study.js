import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";




function Study({deck}) {
    const history = useHistory(); // for navigating to different pages
    const { deckId } = useParams(); // for getting deck ID from the URL
    const [count, setCount] = useState(0); // for keeping track of the current card index
    const [cardFront, setCardFront] = useState(true); // for keeping track of whether the front or back of the card is showing
    const [currentCard, setCurrentCard] = useState(deck.cards[0]); // for keeping track of the current card object
    const cardList = deck.cards; // for storing the array of cards in the deck

    // update the current card when the count or card list changes
    useEffect(() => {
        setCurrentCard(cardList[count]);
    }, [cardList, count]);

    // flip button handler for toggling between the front and back of the current card
    const handleFlip = () => {
        setCardFront(!cardFront);
    };

    // next button handler for advancing to the next card or restarting if at the end
    const nextButton = () => {
        if (cardList.length === count + 1) {
            // ask user if they want to restart or go back to home page
            window.confirm(
                "Restart cards? Click 'cancel' to return to the home page."
            ) ? setCount(0) : history.push("/");
        } else {
            // advance to the next card and show the front
            setCount(count + 1);
            setCardFront(true);
        }
    };

    // display the card and buttons
    if (cardList.length > 2) {
        return (
            <div className="card">
                <div className="card-body">
                    <div className="card-title">
                        <h5>Card {count + 1} of {cardList.length}</h5>
                        <div className="card-text">
                            <p>{cardFront ? currentCard.front : currentCard.back}</p>
                            <button 
                            style={{marginRight: "10px"}}
                            className="btn btn-secondary" onClick={handleFlip}>
                                Flip
                            </button>
                            {!cardFront ? <button className="btn btn-primary" onClick={nextButton}>
                                Next
                            </button> : null}
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        // display a message and link to add more cards if there aren't enough cards to study
        return (
            <div>
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">
                            <h3>{deck.name}: Study</h3>

                            <h5>Not enough cards.</h5>
                            
                            <div className="card-text">
                                <p>You need at least 3 cards to study. There are {cardList.length} cards in this deck.</p>

                                <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
                                    + Add Cards
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Study;
