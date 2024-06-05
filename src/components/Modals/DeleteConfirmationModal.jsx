import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DeleteConfirmationModal(props) {
  // console.log(props.data);
  const modalClose = () => {
    props.setShow(false);
    props.setPost(null);
  };
  const handleDelete=(postId)=>{
    props.setShow(false);
    props.setPost(null);
    props.deletePost(postId)
  }
  return (
    <Modal show={props.show} onHide={modalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are your really wanto to delete <span className="fw-bold">{props.data.title}</span> post from this site?</Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={modalClose}
        >
          No!
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteConfirmationModal;
