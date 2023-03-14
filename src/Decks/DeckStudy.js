import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Study from "../Layout/Study";
import { readDeck } from "../utils/api";

function DeckStudy() {
    const [deck, setDeck] = useState("");
    const { deckId } = useParams();

    useEffect(() => {
        // Create an AbortController instance to cancel any ongoing fetch requests
        const abortController = new AbortController();
        
        async function getDeck() {
            try {
                // Fetch the deck by its ID
                const response = await readDeck(deckId, abortController.signal);
                setDeck(response);
            } catch (error) {
                // Log any errors that occur during the fetch request
                console.error(error);
            }
        }

        // Call the getDeck function to fetch the deck
        getDeck();

        // Abort the fetch request when the component unmounts or when a new fetch is initiated
        return () => {
            abortController.abort();
        }
    }, [deckId]);

    if (deck) {
        return (
            <div>
                {/* Breadcrumb navigation */}
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/">
                                Home
                            </Link>
                        </li>

                        <li className="breadcrumb-item">
                            <Link to={`/decks/${deckId}`}>
                                {deck.name}
                            </Link>
                        </li>

                        <li className="breadcrumb-item active">
                            Study
                        </li>
                    </ol>
                </nav>

                {/* Display the deck name and Study component */}
                <h1>{deck.name}: Study</h1>

                <Study deck={deck} />
            </div>
        );
    } else {
        // Display a loading message if the deck is still being fetched
        return (
            <h3>Loading...</h3>
        );
    }
}

export default DeckStudy;
