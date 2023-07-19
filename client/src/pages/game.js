import React, { useState, useEffect } from 'react';
import clubs2 from '../png/2_of_clubs.png';
import heart9 from '../png/9_of_hearts.png';
import spades8 from '../png/8_of_spades.png';
import IMG from 'react-bootstrap/Image';

const Game = () => {

     const [drawPile1, setDrawPile1] = useState([]);
     const [drawPile2, setDrawPile2] = useState('');
    
    
        const deck1Click = async() => {

            const pileId = "64b35b7372c06695697c7262"; 
            const numberOfCardsToDraw = 2;
               
            try {
                  const response = await fetch(`http://localhost:5050/draw/${pileId}/${numberOfCardsToDraw}`);
                  const data = await response.json();
            
                  if (response.ok) {
                    const cardReference = data.card_list;
                    setDrawPile1(cardReference)
                    console.log(cardReference);
                  } else {
                    console.error('Failed to fetch card_list:', data);
                  }
                } catch (error) {
                  console.error('Error occurred while fetching card_list:', error);
                }
              
            
            
            //setDrawPile1(heart9)
        }
       
    
  
    const deck2Click = async() => {
      
      
      
        //setDrawPile2(spades8)
    }
  
  
    const shuffleClick = async() => {
      setDrawPile1('')
      setDrawPile2('')
    }

    
    return (
        <div className="game">
            <IMG className='drawpile1' src={clubs2} />
            <button type='button' onClick={deck1Click} >Draw</button>
            <IMG src={drawPile1}  />
            <IMG src={drawPile2}  />
            <button type='button' onClick={deck2Click} >Draw</button>
            <IMG className='drawpile2' src={clubs2}  />
            <div>
            <button type='button' onSubmit={shuffleClick} >Shuffle</button>
            </div>
        </div>

      );
}
 
export default Game;