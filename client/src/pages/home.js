import React, { useEffect } from "react";
import { useState } from "react";



const HomePage = () => {
  const [classicSpeed, setClassicSpeed] = useState(true);
  
  function ShowRules() {
    if (classicSpeed){
      return (
        <div className="rules">
          <h4 className="title-rules">Classic Speed Gameplay and Rules</h4>
          <ul className="list-rules">
            <li>The goal of the game is to get rid of all your cards.</li>
            <li>Each player keeps 5 cards in their hands, drawing from their respective draw piles to maintain 5 cards.</li>
            <li>The center of the game contains 4 piles, 2 discard piles in the center (face up), 
              with 2 draw piles on the outside (face down).</li>
            <li>There are no turns. Players may play their cards on either discard pile at any time.</li>
            <li>To play a card from your hand, your card must either be equal to, one more, 
              or one less in rank than one of the two cards from the discard piles.</li>
            <li>Suit does not matter, only the value on the card.</li>
            <li>If neither player can play a card in their hand, each player draws one card from the center draw piles, 
              and simultaneously places it on the discard pile to resume play.
            </li>
            <li>If the center draw piles are empty, and neither player can place a card, the two piles are joined, shuffled,
               and placed into four new piles in the center.</li>
          </ul>
        </div>
      )
    }
    else {
      return (
        <div className="rules">
          <h4 className="title-rules">California Speed Gameplay and Rules</h4>
          <ul className="list-rules">
            <li>The goal of the game is to get rid of all your cards.</li>
            <li>After the deck is shuffled, it is dealt evenly between 2 players.</li>
            <li>Each player places 4 cards in front of them, resulting in 8 total discard piles.</li>
            <li>To play a card, there must be duplicate cards on the discard piles. Players cover duplicate cards
              by drawing from their respective piles and placing on top of the duplicated discard piles.</li>
            <li>Suit and value do not matter.</li>
            <li>If no cards can be played on any of the 8 piles, the 4 piles directly in front of the player are picked up 
              and placed on the bottom of the player's pile. 4 new discard piles are created for each player and play resumes.</li>
          </ul>
          <h5>Tips:</h5>
          <ul className="list-rules">
            <li>If there are three cards that match, you (and your opponent) may cover all three.</li>
            <li>If you cover a card with another card that matches it (say, you are covering a 2 and you play another 2 on top of it),
               you can consider that a match and cover it again with a new card.</li>
            <li>It’s a good idea to play as much as possible on the cards in front of your opponent, so he or she will have more cards to 
              pick up when there are no more matches. However, you also want to play on the cards in front of you in order to prevent 
              your opponent playing on them.</li>
          </ul>
        </div>
      )
    }
  }

  return <>
    <div className="row py-5">
      <div className="col-md-2">
        <button className="btn btn-primary" type="button" onClick={()=> setClassicSpeed(true)}>Classic</button>
      </div>
      <div className="col-md-2">
        <button className="btn btn-success" type="button" onClick={()=> setClassicSpeed(false)}>California</button>
      </div>
    </div>
    <div className="rules col-md-6 mx-auto border">
      < ShowRules />
    </div>

    </>;
};

export default HomePage;