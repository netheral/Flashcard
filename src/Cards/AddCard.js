import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import CardForm from "./CardForm";

function AddCard() {
  // get the deck ID from the URL parameters
  const { deckId } = useParams();

  // set initial state for deck and card
  const [deck, setDeck] = useState({ name: "", description: "", id: "", cards: [] });
  const initialFormState = {
    front: "",
    back: "",
  };
  const [card, setCard] = useState({ ...initialFormState });

  // fetch the deck data from the API when the component mounts
  useEffect(() => {
    const abortController = new AbortController();

    async function getDeck() {
      try {
        // call the API to fetch the deck data
        const response = await readDeck(deckId, abortController.signal);

        // update the state with the deck data
        setDeck(response);
      } catch (error) {
        console.log(error);
      }
    }

    getDeck();

    // cleanup function to abort the API request if the component unmounts
    return () => {
      abortController.abort();
    };
  }, [deckId]);

  // event handler functions for the form input fields
  const frontHandler = ({ target }) => {
    setCard({
      ...card,
      front: target.value,
    });
  };

  const backHandler = ({ target }) => {
    setCard({
      ...card,
      back: target.value,
    });
  };

  // event handler function for the form submit button
  const submitHandler = async () => {
    try {
      // call the API to create a new card for the deck
      await createCard(deckId, card);

      // reset the form input fields to their initial state
      setCard({ ...initialFormState });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* breadcrumb navigation */}
      <nav aria-label="breadcrumb">
        <ul className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active">Add Card</li>
        </ul>
      </nav>

      {/* deck and card form */}
      <h4>
        {deck.name}: Add Card
      </h4>
      <CardForm frontHandler={frontHandler} backHandler={backHandler} card={card} />

      {/* "Done" and "Save" buttons */}
      <Link to={`/decks/${deckId}`} className="btn btn-secondary">
        Done
      </Link>
      <button onClick={submitHandler} type="submit" className="btn btn-primary">
        Save
      </button>
    </div>
  );
}

export default AddCard;
