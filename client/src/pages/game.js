import React, { useState, useEffect } from "react";
import clubs2 from "../png/2_of_clubs.png";
import IMG from "react-bootstrap/Image";

const Game = () => {
  const [drawPile1, setDrawPile1] = useState("");
  const [drawPile2, setDrawPile2] = useState("");
  const [deckId, setDeckId] = useState("");
  const [pileId1, setPileId1] = useState("");
  const [pileId2, setPileId2] = useState("");
  const [render, setRender] = useState(false);
  const [temp, setTemp] = useState(false);
  var numberOfCardsToDraw = 1;
  
  /*
    Creates a new deck when user clicks Create Deck button.
    Saves the new Deck ID information
  */
  const NewDeckClick = async () => {
    await fetch(`http://localhost:5050/deck/new`, {
      method: "POST",
    })
      .then((response) => {
        if (!response.ok) {
          throw Error("Could not fetch Data");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.insertedId);
        setDeckId(data.insertedId);
        setRender(true);
        setTemp(true);
        window.alert("Created Deck");
      })
      .catch((error) => {
        window.alert(error);
        return;
      });
  };

  /*
    When user clicks the Create Deck button, It will grab the
    New Deck ID and create two piles of 26 cards each.
    **
  */

  useEffect(() => {
    if(!render){return}
    const fetchPiles1 = async () => {
        const deckPile1 = { pile_name: "pile_1", number_of_cards: 26 };
        await fetch(`http://localhost:5050/new_pile/${deckId}/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(deckPile1),
        })
          .then((res) => {
            if (!res.ok) {
              throw Error("Could not fetch Data");
            }
            return res.json();
          })
          .then((data) => {
            setPileId1(data.new_pile._id);
            console.log(data.new_pile._id)
          })
          .catch((error) => {
            window.alert(error);
            return;
          });
    };
    const fetchPiles2 = async () => { 
        const deckPile2 = { pile_name: "pile_2", number_of_cards: 26 };
        await fetch(`http://localhost:5050/new_pile/${deckId}/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(deckPile2),
        })
          .then((res) => {
            if (!res.ok) {
              throw Error("Could not fetch Data");
            }
            return res.json();
          })
          .then((data) => {
            setPileId2(data.new_pile._id);
            console.log(data.new_pile._id)
          })
          .catch((error) => {
            window.alert(error);
            return;
          });
    };
    
    fetchPiles1();
    fetchPiles2();

  },[deckId]);

  /*
    Fetches image reference from mongodb to display image after draw is clicked. Using pileId1 
  */
  const deck1Click = async () => {
    await fetch(`http://localhost:5050/draw/${pileId1}/${numberOfCardsToDraw}`, {
      method: "PATCH",
    })
      .then((response) => {
        if (!response.ok) {
          throw Error("Could not fetch Data");
        }
        return response.json();
      })
      .then((data) => {
        setDrawPile1(require(`../png/${data.cards[0].reference}.png`));
        console.log(data.cards[0].reference);
      });
  };

  
  /*
    Fetches image reference from mongodb to display image after draw is clicked. Using pileId2 
  */
  const deck2Click = async () => {
    
    await fetch(`http://localhost:5050/draw/${pileId2}/${numberOfCardsToDraw}`, {
      method: "PATCH",
    })
      .then((response) => {
        if (!response.ok) {
          throw Error("Could not fetch Data");
        }
        return response.json();
      })
      .then((data) => {
        setDrawPile2(require(`../png/${data.cards[0].reference}.png`));
        console.log(data.cards[0].reference);
      });
  };

  /*
    Shuffles two piles and shuffles them. 
    **Not Finished
  */
  const shuffleClick = async () => {
    setDrawPile1("");
    setDrawPile2("");
    const shuffledDeck = {piles: {pileId1,pileId2}};
    await fetch(`http://localhost:5050/combine/shuffledDeck`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(shuffledDeck),
        })
    .then((response) => {
      if (!response.ok) {
        throw Error("Could not fetch Data");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      setDeckId(data.pile_id);
      window.alert("Deck Shuffled");
    })
    .catch((error) => {
      window.alert(error);
      return;
    });
  };

  return (
    <div className="game">
      <IMG className="drawpile1" src={clubs2} />
      <button type="button" onClick={deck1Click}>
        Draw
      </button>
      <IMG className="drawPile1" src={drawPile1} />
      
      <button type="button" onClick={deck2Click}>
        Draw
      </button>
      <IMG className="drawpile2" src={drawPile2} />
      <IMG className="drawpile2" src={clubs2} />
      <div>
        <button type="button" onClick={NewDeckClick}>
          Create Deck
        </button>
      </div>
      <div>
        <button type="button" onClick={shuffleClick}>
          Shuffle
        </button>
      </div>
    </div>
  );
};

export default Game;
