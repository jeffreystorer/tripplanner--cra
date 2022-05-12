import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import 'styles/App.css';

export default function ConfirmDeleteModal({
  allTrips,
  show,
  setShow,
  handleDelete,
}) {
  const handleCancel = () => setShow(false);

  let message = 'Are you sure you want to delete this saved trip?';
  if (allTrips) message = 'Are you sure you want to delete all saved trips?';

  return (
    <Modal centered show={show} onHide={handleCancel}>
      <ModalHeader closeButton>Heads up!</ModalHeader>
      <ModalBody>{message}</ModalBody>
      <ModalFooter>
        <Button colorScheme="gray" onClick={handleCancel}>
          Cancel
        </Button>
        <Button colorScheme="blue" onClick={handleDelete}>
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
}
