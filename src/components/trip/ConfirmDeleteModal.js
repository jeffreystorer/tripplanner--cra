import {
  Button,
  ChakraProvider,
  HStack,
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
} from '@chakra-ui/react';
import 'styles/App.css';

export default function ConfirmDeleteModal({
  allTrips,
  show,
  setShow,
  handleDelete,
}) {
  const { onClose } = useDisclosure();
  const handleCancel = () => {
    onClose();
    setShow(false);
  };
  let message = 'Are you sure you want to delete this saved trip?';
  if (allTrips) message = 'Are you sure you want to delete all saved trips?';

  return (
    <ChakraProvider>
      <Modal isCentered isOpen={show} onClose={handleCancel}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Heads up!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{message}</ModalBody>
          <ModalFooter>
            <HStack gap={5}>
              <Button colorScheme="gray" onClick={handleCancel}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={handleDelete}>
                Delete
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
}
