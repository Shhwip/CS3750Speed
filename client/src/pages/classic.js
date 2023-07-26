import Container from 'react-bootstrap/Container';
import Card from "../png/2_of_clubs.png";
import cardBack from "../png/cardBack.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


const Classic = () => {
  return (
    <>
    <Container className='container'>
    <div className="cards">
        <Row xs={6}>
          <Col>
            <div className="card">
                <img src={cardBack} alt="back of card" />
                <div className="textOverlay">10</div>
            </div>
          </Col>
          <Col>
            <div className="card">
                <img src={Card} alt="black 2_of_clubs" />
            </div>
          </Col>
          <Col>
            <div className="card">
                <img src={Card} alt="black 2_of_clubs" />
            </div>
          </Col>
          <Col>
            <div className="card">
                <img src={Card} alt="black 2_of_clubs" />
            </div>
          </Col>
          <Col>
            <div className="card">
                <img src={Card} alt="black 2_of_clubs" />
            </div>
          </Col>
          <Col>
            <div className="card">
                <img src={Card} alt="black 2_of_clubs" />
            </div>
          </Col>
        </Row>
      </div>
      <div className="cards">
        <Row xs={6} sm={6} md={6} lg={6} className="row"> 
          <Col>
          <div className="card">
                <img src={cardBack} alt="back of card" />
                <div className="textOverlay">10</div>
            </div>
          </Col>
          <Col>
            <div className="card">
                <img src={Card} alt="black 2_of_clubs" />
            </div>
          </Col>
          <Col>
            <div className="card">
                <img src={Card} alt="black 2_of_clubs" />
            </div>
          </Col>
          <Col>
          <div className="card">
                <img src={cardBack} alt="back of card" />
                <div className="textOverlay">10</div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="cards">
        <Row xs={6} sm={6} md={6} lg={6}>
          <Col>
            <div className="card">
                <img src={Card} alt="black 2_of_clubs" />
            </div>
          </Col>
          <Col>
            <div className="card">
                <img src={Card} alt="black 2_of_clubs" />
            </div>
          </Col>
          <Col>
            <div className="card">
                <img src={Card} alt="black 2_of_clubs" />
            </div>
          </Col>
          <Col>
            <div className="card">
                <img src={Card} alt="black 2_of_clubs" />
            </div>
          </Col>
          <Col>
            <div className="card">
                <img src={Card} alt="black 2_of_clubs" />
            </div>
          </Col>
          <Col>
          <div className="card">
                <img src={cardBack} alt="back of card" />
                <div className="textOverlay">10</div>
            </div>
          </Col>
        </Row>
      </div>
    </Container> 
    </>
  );
};

export default Classic;
