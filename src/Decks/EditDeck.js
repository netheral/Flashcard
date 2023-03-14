import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";

function EditDeck() {
    const { deckId } = useParams(); // Extract the deckId parameter from the URL
    const [deck, setDeck] = useState({ name: "", description: "", id: "", cards: [] }); // Create a state for the deck
    const history = useHistory(); // Create a history object to navigate to other pages

    // Fetch the deck from the API and update the state when component mounts
    useEffect(() => {
        const abortController = new AbortController(); // Create an abort controller to cancel the fetch request if the component unmounts
        async function getDeck() {
            const response = await readDeck(deckId, abortController.signal); // Fetch the deck with the deckId and the abort controller
            setDeck(response); // Update the deck state with the response from the API
        }
        getDeck(); // Call the getDeck function
        return () => {
            abortController.abort(); // Abort the fetch request if the component unmounts
        }
    }, [deckId]); // Run the effect only when the deckId parameter changes

    // Handle the form submission
    async function submitHandler(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        const response = await updateDeck(deck); // Update the deck on the server with the new values
        history.push(`/decks/${response.id}`); // Navigate to the deck view page after updating the deck
    }

    // Handle changes to the name input
    const nameHandler = ({target}) => {
        setDeck({
            ...deck,
            name: target.value,
        });
    }

    // Handle changes to the description input
    const descriptionHandler = ({target}) => {
        setDeck({
            ...deck,
            description: target.value,
        });
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ul className="breadcrumb">
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
                        Edit deck
                    </li>
                </ul>
            </nav>
            <form onSubmit={submitHandler}>
                <h2>Edit Deck</h2>

                <div className="form-group">
                    <label>Name</label>

                    <input
                        id="name"
                        name="name"
                        type="text"
                        style={{ width: "100%" }}
                        value={deck.name}
                        onChange={nameHandler}
                        className="form-control"
                    />

                    <label>Description</label>

                    <textarea
                        id="description"
                        name="description"
                        type="text"
                        style={{ width: "100%" }}
                        value={deck.description}
                        onChange={descriptionHandler}
                        className="form-control"
                    />

                    <Link to={`/decks/${deckId}`} className="btn btn-secondary">
                        Cancel
                    </Link>

                    <button 
                    style={{marginLeft: "10px"}}
                    onClick={submitHandler} type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditDeck;
