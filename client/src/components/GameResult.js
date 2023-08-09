import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router";

function GameResult({ gameOver, isWinner }) {
    // State for modal visibility
    const [show, setShow] = useState(false);

    // Navigation hook
    const navigate = useNavigate();

    // Handlers for modal open and close
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Handle submission: Close modal and navigate to home
   

    // Automatically show the modal when game is over
    useEffect(() => {
        if (gameOver) {
            handleShow();
        }
    }, [gameOver]);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Game Over</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Use Bootstrap utility classes for text colors */}
                    <p className={isWinner ? "text-success" : "text-danger"}>
                        {isWinner ? "You lose" : "You Win"}
                    </p>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default GameResult;
