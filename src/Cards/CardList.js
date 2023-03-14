import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, deleteCard } from "../utils/api/index";

function CardList({ cards }) {
    const { deckId } = useParams();
    const [deck, setDeck] = useState([]);
    const history = useHistory();

    // get the deck from the API
    useEffect(() => {
        const abortController = new AbortController();
        async function getDeck() {
            const response = await readDeck(deckId, abortController.signal);
            setDeck(response);
        }
        getDeck();
        return () => {
            abortController.abort();
        }
    }, [deckId]);

    // render the list of cards
    return (
        <div>
            {cards.map((card, id) => (
                <div className="card" key={id}>
                    <div className="card-body">
                        <p>{card.front}</p>
                        <p>{card.back}</p>

                        {/* link to the edit card form */}
                        <Link to={`/decks/${deckId}/cards/${card.id}/edit`} className="btn btn-secondary">
                            Edit
                        </Link>

                        {/* button to delete the card */}
                        <button onClick={async () => {
                            if (window.confirm(
                                "Delete this card? You will not be able to recover it."
                            )) {
                                await deleteCard(card.id);
                                // refresh the page after the card is deleted
                                history.go(0);
                            } else {
                                // refresh the page if the user chooses not to delete the card
                                history.go(0);
                            }
                        }} className="btn btn-danger">
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CardList;
