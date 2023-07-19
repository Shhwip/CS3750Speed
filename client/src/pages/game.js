import React, { useState, useEffect } from "react";
import clubs2 from "../png/2_of_clubs.png";
import heart9 from "../png/9_of_hearts.png";
import spades8 from "../png/8_of_spades.png";
import IMG from "react-bootstrap/Image";

const Game = () => {
  const [drawPile1, setDrawPile1] = useState("");
  const [drawPile2, setDrawPile2] = useState("");

  const deck1Click = async () => {
    const pileId = "64b35b7372c06695697c7262";
    const numberOfCardsToDraw = 1;

    const response = await fetch(
      `http://localhost:5050/draw/${pileId}/${numberOfCardsToDraw}`,
      {
        method: "PATCH",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw Error("Could not fetch Data");
        }
        return response.json();
      })
      .then((data) => {
        setDrawPile1(data.cards[0].reference);
        console.log(data.cards[0].reference);
      });

    //setDrawPile1(heart9)
  };

  const deck2Click = async () => {
    //setDrawPile2(spades8)
  };

  const shuffleClick = async () => {
    setDrawPile1("");
    setDrawPile2("");
  };

  return (
    <div className="game">
      <IMG className="drawpile1" src={clubs2} />
      <button type="button" onClick={deck1Click}>
        Draw
      </button>

      <IMG  src={`../png/${drawPile1}.png`} />
      <IMG src={drawPile2} />
      <button type="button" onClick={deck2Click}>
        Draw
      </button>
      <IMG className="drawpile2" src={clubs2} />
      <div>
        <button type="button" onSubmit={shuffleClick}>
          Shuffle
        </button>
      </div>
    </div>
  );
};

export default Game;
