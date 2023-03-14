import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api";
import CardForm from "./CardForm";

function EditCard() {
  const { deckId, cardId } = useParams(); // retrieve `deckId` and `cardId` from URL params
  const [deck, setDeck] = useState({ name: "", description: "", id: "", cards: [] }); // state to hold the deck information
  const [card, setCard] = useState({ front: "", back: "", deckId: "", id: "" }); // state to hold the card information
  const history = useHistory(); // create a history object to navigate between pages

  // fetch the card data from the API when the component mounts
  useEffect(() => {
    const abortController = new AbortController(); // create an abort controller to cancel the API request if necessary
    async function getCard() {
      const response = await readCard(cardId, abortController.signal); // make API request to retrieve the card data
      setCard(response); // update the card state with the retrieved data
    }
    getCard();
    return () => {
      abortController.abort(); // cancel the API request when the component unmounts
    }
  }, [cardId]); // re-run the effect when `cardId` changes

  // fetch the deck data from the API when the component mounts
  useEffect(() => {
    const abortController = new AbortController(); // create an abort controller to cancel the API request if necessary
    async function getDeck() {
      const response = await readDeck(deckId, abortController.signal); // make API request to retrieve the deck data
      setDeck(response); // update the deck state with the retrieved data
    }
    getDeck();
    return () => {
      abortController.abort(); // cancel the API request when the component unmounts
    }
  }, [deckId]); // re-run the effect when `deckId` changes

  // submit the updated card data to the API and navigate back to the deck view
  async function submitHandler(event) {
    event.preventDefault(); // prevent the default form submission behavior
    await updateCard(card); // make API request to update the card data
    history.push(`/decks/${deck.id}`); // navigate to the deck view
  }

  // update the `front` field of the card state
  const frontHandler = ({ target }) => {
    setCard({
      ...card,
      front: target.value,
    })
  }

  // update the `back` field of the card state
  const backHandler = ({ target }) => {
    setCard({
      ...card,
      back: target.value,
    })
  }

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
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>
              Deck {deck.name}
            </Link>
          </li>
          <li className="breadcrumb-item active">
            Edit Card {card.id}
          </li>
        </ul>
      </nav>

      {/* Card form */}
      <div className="card">
        <div className="card-body">
          <div className="card-title">
            <h2>Edit Card</h2>
          </div>
          

                    <CardForm card={card} frontHandler={frontHandler} backHandler={backHandler} />
                </div>
            </div>

                

            <Link to={`/decks/${deckId}`} className="btn btn-secondary">
                Cancel
            </Link>

            <button onClick={submitHandler} type="submit" className="btn btn-primary">
                Submit
            </button>
        </div>
    )
}

export default EditCard;