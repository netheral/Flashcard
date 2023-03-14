import React from "react";

function CardForm({ frontHandler, backHandler, card={} }) {
    // Set the default value of the front and back fields to the current value of the card
    function cardFront() {
        return card.front ? card.front : "";
    }

    function cardBack() {
        return card.back ? card.back : "";
    }

    // Render the form with two textareas for the front and back fields
    return (
        <div>
            <form>
                <div>
                    <label>Front</label>
                    <textarea
                        id="front"
                        name="front"
                        type="text"
                        style={{ width: "100%" }}
                        onChange={frontHandler}
                        value={cardFront()}
                        placeholder="Front side of card"
                    />

                    <label>Back</label>
                    <textarea
                        id="back"
                        name="back"
                        type="text"
                        style={{ width: "100%" }}
                        onChange={backHandler}
                        value={cardBack()}
                        placeholder="Back side of card"
                    />
                </div>
            </form>
        </div>
    );
}

export default CardForm;
