import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";

function CreateDeck() {
    // Set the initial state of the form
    const initialFormState = { name: "", description: "" }
    const [newDeck, setNewDeck] = useState({ ...initialFormState });
    const history = useHistory();

    // Function to handle the form submission
    async function submitHandler(event) {
        event.preventDefault();
        const response = await createDeck(newDeck);
        history.push(`/decks/${response.id}`)
    }

    // Function to handle changes to the deck name
    const nameHandler = ({target}) => {
        setNewDeck({
            ...newDeck,
            name: target.value,
        });
    }

    // Function to handle changes to the deck description
    const descriptionHandler = ({target}) => {
        setNewDeck({
            ...newDeck,
            description: target.value,
        });
    }

    // Render the create deck form
    return (
        <div>
            {/* Breadcrumb navigation */}
            <nav aria-label="breadcrumb">
                <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">
                            Home
                        </Link>
                    </li>

                    <li className="breadcrumb-item active">
                        Create Deck
                    </li>
                </ul>
            </nav>

            {/* Deck creation form */}
            <form onSubmit={submitHandler}>
                <h2>Create Deck</h2>

                <div className="form-group">
                    <label>Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        style={{ width: "100%" }}
                        placeholder="Deck Name"
                        onChange={nameHandler}
                    />

                    <br />

                    <label>Description</label>
                    <textarea
                        id="description"
                        name="description"
                        type="textarea"
                        rows="4" 
                        style={{ width: "100%" }}
                        placeholder="Brief description of the deck"
                        onChange={descriptionHandler}
                    />

                    {/* Cancel button */}
                    <Link to="/" className="btn btn-secondary">
                        Cancel
                    </Link>

                    {/* Submit button */}
                    <button onClick={submitHandler} type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateDeck;
