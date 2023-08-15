import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner'

export default function WaitingModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Waiting for other player....
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button onClick={props.handleClose} >
          Close
        </Button>
        <Button disabled={true}>
          Waiting
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        </Button>          
      </Modal.Footer>
    </Modal>
  );
}