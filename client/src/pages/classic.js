import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import cardBack from "../png/cardBack.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import socket from "../socket";
import GameResult from "../components/GameResult";

//Note: what I still miss and test: reshuffle when the pile out of card, allow to click the pile when the cardIndex is 20 even there is empty card.

//function help drag the card
const DraggableCard = ({ cardRef, onDrop }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: { cardRef },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }} className="card">
      {cardRef && cardRef !== "" && cardRef !== "no-card" ? (
        <img src={require(`./../png/${cardRef}`)} alt={cardRef} />
      ) : null}
    </div>
  );
};

//function help drop the card
const DroppableArea = ({ onDrop, cardRef, isValidDrop }) => {
  const [, drop] = useDrop({
    accept: "CARD",
    drop: (item) => onDrop(item.cardRef),
    canDrop: (item, monitor) => {
      return isValidDrop(item.cardRef, cardRef); // Pass the current card of the DroppableArea to the validation function
    },
  });

  return (
    <div ref={drop} className="card">
      {cardRef ? (
        <img src={require(`./../png/${cardRef}`)} alt={cardRef} />
      ) : null}
    </div>
  );
};

const Classic = ({ numPlayer, room, setShowClassic, userName  }) => {
  console.log("username: ")
  console.log(userName)
  const [cards, setCards] = useState([]);
  const [opponentCard, setOponentCard] = useState([]);
  const [cardIndex, setCardIndex] = useState(5);
  const [pileIndex, setPileIndex] = useState(1);
  const [leftPile, setLeftPile] = useState(room.leftPile);
  const [rightPile, setRightPile] = useState(room.rightPile);
  const [leftCard, setLeftCard] = useState(room.leftPile[0]);
  const [rightCard, setRightCard] = useState(room.rightPile[0]);
  const [card1, setFirstCard] = useState("");
  const [card2, setSecondCard] = useState("");
  const [card3, setThirdCard] = useState("");
  const [card4, setFourthCard] = useState("");
  const [card5, setFifthCard] = useState("");
  const [isGameOver, setGameOver] = useState(false);
  const [isWinner, setWinner] = useState(false);
  const [usedCard, setUsedCard] = useState([]);

  //set all card ready
  useEffect(() => {
    let selectedCards = numPlayer === 1 ? room.user1Cards : room.user2Cards;
    setCards(selectedCards);
    setFirstCard(selectedCards[0]);
    setSecondCard(selectedCards[1]);
    setThirdCard(selectedCards[2]);
    setFourthCard(selectedCards[3]);
    setFifthCard(selectedCards[4]);

    setUsedCard([
      ...room.leftPile.map((item) => item),
      ...room.rightPile.map((item) => item),
    ]);
    
    const emitEvent = () => {
      let opponentCards = [
        selectedCards[0],
        selectedCards[1],
        selectedCards[2],
        selectedCards[3],
        selectedCards[4],
      ];
      socket.emit("classic_play", {
        id: room._id,
        leftCard,
        rightCard,
        pileIndex: pileIndex,
        opponentCard: opponentCards,
        gameOver: isGameOver,
      });
    };

    emitEvent();
  }, []);

  //compare player vs current opponent array
  const checkOpponentArray = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] === arr2[i] && arr1[i] != "no-card") return true;
    }
    return false;
  };

  //----------------receive data from websocket--------------
  useEffect(() => {
    const moveHandler = (data) => {
      if (data.leftCard && data.rightCard) {
        setLeftCard(data.leftCard);
        setRightCard(data.rightCard);

        // Check if the arrays are not equal and then set opponent cards
        if (
          !checkOpponentArray(data.opponentCard, [
            card1,
            card2,
            card3,
            card4,
            card5,
          ])
        ) {
          setOponentCard(data.opponentCard);
        }
        if (data.leftPile && data.leftPile.length !== 0) {
          setLeftPile(data.leftPile);
          setRightPile(data.rightPile);
        }
        
        setPileIndex(data.pileIndex);
        setGameOver(data.gameOver);
      }
    };
    socket.on("classic_play", moveHandler);

    return () => {
      socket.off("classic_play", moveHandler);
    };
  }, [socket, leftCard, rightCard]);
  //-----------------------------------------------

  //functions assist to check if a card is valid to drop ------------------------------
  const getCardRank = (cardRef) => {
    if (cardRef === "no-card") return -1;
    const rank = cardRef.split("_")[0];
    switch (rank) {
      case "king":
        return 13;
      case "queen":
        return 12;
      case "jack":
        return 11;
      case "ace":
        return 1;
      default:
        return parseInt(rank, 10); // For numerical values
    }
  };

  const isValidDrop = (droppedCardRef, currentCardRef) => {
    const droppedRank = getCardRank(droppedCardRef);
    if (droppedRank === -1) return false;
    const currentRank = getCardRank(currentCardRef);

    const difference = Math.abs(droppedRank - currentRank);
    if ((droppedRank === 1 && currentRank === 13) || (droppedRank === 13 && currentRank === 1)) {
      return true;
  }
    return difference === 1; // Return true if ranks differ by 1, else false
  };

  const removeDroppedCard = (droppedCardRef) => {
    let cardList = [card1, card2, card3, card4, card5];
    const cardSetters = [
      setFirstCard,
      setSecondCard,
      setThirdCard,
      setFourthCard,
      setFifthCard,
    ];
    cardList.forEach((card, index) => {
      if (droppedCardRef === card) {
        if (cardIndex === 20) {
          cardSetters[index]("no-card");
          cardList[index] = "no-card";
        } else {
          cardSetters[index]("");
          cardList[index] = "";
        }
      }
    });
    return cardList;
  };
  //----------------------------------------------------------------

  //-------------------------check game over---------------------------------------
  const checkWinner = (currentHandCard) => {
   
    // Check if all cards are empty and cardIndex is 20
    if (
      currentHandCard.every((card) => card === "" || card === "no-card") &&
      cardIndex === 20
    ) {
      setWinner(true);
      setGameOver(true);
      return true;
    }

    return false;
  };

  //-----------------------------------------------------------------

  //--------------------function for left and right card drop ------------------------------------
  const handleLeftCardDrop = async (droppedCardRef) => {
    // Logic for when a card is dropped on the left card
    setUsedCard((prevArray) => [...prevArray, droppedCardRef]);

    setLeftCard(droppedCardRef);
    const currentHandCard = await removeDroppedCard(droppedCardRef);
    
    const emitEvent = () => {
      socket.emit("classic_play", {
        id: room._id,
        leftCard: droppedCardRef,
        rightCard: rightCard,
        pileIndex: pileIndex,
        opponentCard: currentHandCard,
        gameOver: checkWinner(currentHandCard),
      });
    };

    emitEvent();
  };

  const handleRightCardDrop = async (droppedCardRef) => {
    // Logic for when a card is dropped on the right card
    setUsedCard((prevArray) => [...prevArray, droppedCardRef]);
    setRightCard(droppedCardRef);
    const currentHandCard = await removeDroppedCard(droppedCardRef);
    const emitEvent = () => {
      socket.emit("classic_play", {
        id: room._id,
        leftCard: leftCard,
        rightCard: droppedCardRef,
        pileIndex: pileIndex,
        opponentCard: currentHandCard,
        gameOver: checkWinner(currentHandCard),
      });
    };

    emitEvent();
  };
  //----------------------------------------------------------

  //-------------------------handle card click ---------------------------------

  const handleCardClick = () => {
    let tempCardIndex = cardIndex;

    if (tempCardIndex === 20) {
      return;
    }

    const cardSetters = [
      setFirstCard,
      setSecondCard,
      setThirdCard,
      setFourthCard,
      setFifthCard,
    ];
    const cardValues = [card1, card2, card3, card4, card5];
    let opponentCards = [card1, card2, card3, card4, card5];

    for (let i = 0; i < cardSetters.length; i++) {
      if (cardValues[i] === "" && tempCardIndex !== 20) {
        opponentCards[i] = cards[tempCardIndex];
        cardSetters[i](cards[tempCardIndex]);
        tempCardIndex++;
      } else if (cardValues[i] === "" && tempCardIndex === 20) {
        cardSetters[i]("no-card");
      }
    }

    setCardIndex(tempCardIndex);

    const emitEvent = () => {
      socket.emit("classic_play", {
        id: room._id,
        leftCard: leftCard,
        rightCard: rightCard,
        pileIndex: pileIndex,
        opponentCard: opponentCards,
        gameOver: isGameOver,
      });
    };

    emitEvent();
  };

  //---------------------------------------------------------------------------------

  //---------------------------these function assist handle pile click-----------------
  const checkValidity = (card, left, right) => {
    return !(isValidDrop(card, left) || isValidDrop(card, right));
  };

  const areAllCardsInvalid = (cardsList, left, right) => {
    return cardsList.every((card) => checkValidity(card, left, right));
  };
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      // Generate a random index between 0 and i (inclusive)
      const j = Math.floor(Math.random() * (i + 1));

      // Swap elements at indices i and j
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const handlePileClick = () => {
    let tempIndex = pileIndex;
    if ([card1, card2, card3, card4, card5].some((card) => card === "")) return;
    if (opponentCard.some((card) => card === "")) return;

    const cardsList = [card1, card2, card3, card4, card5];
    console.log("pile click")
    console.log("opponent: ")
    console.log(opponentCard)
    console.log("Card: ")
    console.log(cardsList)

    if (areAllCardsInvalid(cardsList, leftCard, rightCard) && areAllCardsInvalid(opponentCard, leftCard, rightCard)) {
      setLeftCard(leftPile[tempIndex]);
      setRightCard(rightPile[tempIndex]);
      tempIndex += 1;

      let tempLeftPile = [];
      let tempRightPile = [];

      if (tempIndex == leftPile.length - 1 || tempIndex == rightPile.length - 1) {
     
        const cardShuffle = shuffleArray(usedCard);
        const halfwayPoint = Math.ceil(cardShuffle.length / 2);
        tempLeftPile = cardShuffle.slice(0, halfwayPoint);
        tempRightPile = cardShuffle.slice(halfwayPoint);
        tempIndex = 0;
       

        setLeftPile(tempLeftPile);
        setRightPile(tempRightPile);
      }

      setPileIndex(tempIndex);
      const emitEvent = () => {
        let opponentCards = [card1, card2, card3, card4, card5];
        socket.emit("classic_play", {
          id: room._id,
          leftCard: leftPile[tempIndex],
          rightCard: rightPile[tempIndex],
          leftPile: tempLeftPile,
          rightPile: tempRightPile,
          pileIndex: tempIndex,
          opponentCard: opponentCards,
          gameOver: isGameOver,
          
        });
      };

      emitEvent();
    }
  };

  //-----------------------Leave room handle------------------------
  const leaveRoomClick = async () => {
    const roomId = { id: room._id };
    try {
      const response = await fetch(
        `http://localhost:5050/api/room/deleteRoom/${room._id}`,
        {
          method: "DELETE",
          body: JSON.stringify({ _id: roomId }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch room");
      } else {
        // altered from navigate to socket.emit
        socket.emit("leave_room", roomId);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //-----------------------------------------------------------------------------------

  return (
    <DndProvider backend={HTML5Backend}>
      <GameResult gameOver={isGameOver} isWinner={isWinner} id = {room._id} setShowClassic = {setShowClassic} userName={userName}/>
      <Container className="container-classic">
        <div className="cards">
          <Row xs={6} sm={6} md={6} lg={6}>
            <Col>
              <div className="card">
                <img src={require(`./../png/cardBack.png`)} alt={"cardBack"} />
              </div>
            </Col>
            <Col>
              <div className="card">
                <img src={require(`./../png/cardBack.png`)} alt={"cardBack"} />
              </div>
            </Col>
            <Col>
              <div className="card">
                <img src={require(`./../png/cardBack.png`)} alt={"cardBack"} />
              </div>
            </Col>
            <Col>
              <div className="card">
                <img src={require(`./../png/cardBack.png`)} alt={"cardBack"} />
              </div>
            </Col>
            <Col>
              <div className="card">
                <img src={require(`./../png/cardBack.png`)} alt={"cardBack"} />
              </div>
            </Col>
            <Col>
              <div className="card">
                <img src={cardBack} alt="back of card" />
                {/*
                  <div className="textOverlay">{cards.length}</div>
                */}
              </div>
            </Col>
          </Row>
        </div>
        <div className="cards">
          <Row xs={6} sm={6} md={6} lg={6} className="row">
            <Col>
              <div className="card" onClick={handlePileClick}>
                <img src={require(`./../png/cardBack.png`)} alt={"cardBack"} />
                {/*
                <div className="textOverlay">{leftPile.length - pileIndex}</div>
                */}
              </div>
            </Col>
            <Col>
              <DroppableArea
                onDrop={handleLeftCardDrop}
                cardRef={leftCard}
                isValidDrop={isValidDrop}
              />
            </Col>
            <Col>
              <DroppableArea
                onDrop={handleRightCardDrop}
                cardRef={rightCard}
                isValidDrop={isValidDrop}
              />
            </Col>
            <Col>
              <div className="card" onClick={handlePileClick}>
                <img src={require(`./../png/cardBack.png`)} alt={"cardBack"} />
                {/*<div className="textOverlay">
                  {rightPile.length - pileIndex}
                </div>*/}
              </div>
            </Col>
          </Row>
        </div>

        <div className="cards">
          <Row xs={6}>
            <Col>
              <DraggableCard cardRef={card1} />
            </Col>
            <Col>
              <DraggableCard cardRef={card2} />
            </Col>
            <Col>
              <DraggableCard cardRef={card3} />
            </Col>
            <Col>
              <DraggableCard cardRef={card4} />
            </Col>
            <Col>
              <DraggableCard cardRef={card5} />
            </Col>
            <Col>
              <div className="card" onClick={handleCardClick}>
                <img src={require(`./../png/cardBack.png`)} alt={"cardBack"} />
                <div className="textOverlay">{cards.length - cardIndex}</div>
              </div>
            </Col>
          </Row>
        </div>
        <Col>
          <div>
            <button onClick={leaveRoomClick}>Leave Room</button>
          </div>
        </Col>
      </Container>
    </DndProvider>
  );
};

export default Classic;
