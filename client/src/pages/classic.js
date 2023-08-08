import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import cardBack from "../png/cardBack.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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
      {cardRef ? (
        <img src={require(`./../png/${cardRef}`)} alt={cardRef} />
      ) : null}
    </div>
  );
};

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

const Classic = ({ numPlayer, room }) => {
  const [cards, setCards] = useState([]);
  const [leftPile, setLeftPile] = useState(room.leftPile);
  const [rightPile, setRightPile] = useState(room.rightPile);
  const [leftCard, setLeftCard] = useState(room.leftPile[0].reference);
  const [rightCard, setRightCard] = useState(room.rightPile[0].reference);
  const [card1, setFirstCard] = useState("");
  const [card2, setSecondCard] = useState("");
  const [card3, setThirdCard] = useState("");
  const [card4, setFourthCard] = useState("");
  const [card5, setFifthCard] = useState("");

  useEffect(() => {
    let selectedCards = numPlayer === 1 ? room.user1Cards : room.user2Cards;
    setCards(selectedCards);

    setFirstCard(selectedCards[0].reference);
    setSecondCard(selectedCards[1].reference);
    setThirdCard(selectedCards[2].reference);
    setFourthCard(selectedCards[3].reference);
    setFifthCard(selectedCards[4].reference);
  }, []);

  const handleLeftCardDrop = (droppedCardRef) => {
    // Logic for when a card is dropped on the left card
    setLeftCard(droppedCardRef);
  };

  const getCardRank = (cardRef) => {
    // Assuming cardRef format is like "2_of_hearts.png"
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
    const currentRank = getCardRank(currentCardRef);

    const difference = Math.abs(droppedRank - currentRank);

    return difference === 1; // Return true if ranks differ by 1, else false
  };

  const handleRightCardDrop = (droppedCardRef) => {
    // Logic for when a card is dropped on the right card
    setRightCard(droppedCardRef);
  };

  return (
    <DndProvider backend={HTML5Backend}>
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
                <div className="textOverlay">{cards.length}</div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="cards">
          <Row xs={6} sm={6} md={6} lg={6} className="row">
            <Col>
              <div className="card">
                <img src={require(`./../png/cardBack.png`)} alt={"cardBack"} />
                <div className="textOverlay">{leftPile.length - 1}</div>
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
              <div className="card">
                <img src={require(`./../png/cardBack.png`)} alt={"cardBack"} />
                <div className="textOverlay">{rightPile.length - 1}</div>
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
              <div className="card">
                <img src={require(`./../png/cardBack.png`)} alt={"cardBack"} />
                <div className="textOverlay">{cards.length}</div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </DndProvider>
  );
};

export default Classic;
