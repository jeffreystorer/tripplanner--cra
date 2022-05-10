import React from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import "styles/App.css"

export default function ConfirmDeleteModal({ show, setShow, handleDelete }) {
  const handleCancel = () => setShow(false)

  let message = "Are you sure you want to delete this password?"

  return (
    <Modal centered show={show} onHide={handleCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Heads up!</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
