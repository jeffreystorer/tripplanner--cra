import { useNavigate } from 'react-router-dom';
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
} from '@chakra-ui/react';
import 'styles/App.css';

export default function ConfirmTripDeleteModal({
  allTrips,
  isOpen,
  onClose,
  handleDelete,
}) {
  const navigate = useNavigate();
  let message = 'Are you sure you want to delete this saved trip?';
  if (allTrips) message = 'Are you sure you want to delete all saved trips?';

  return (
    <ChakraProvider>
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={() => {
          onClose();
          navigate('/pages/trip');
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Heads up!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{message}</ModalBody>
          <ModalFooter>
            <HStack gap={5}>
              <Button
                colorScheme="gray"
                onClick={() => {
                  onClose();
                  navigate('/pages/trip');
                }}
              >
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                onClick={() => {
                  onClose();
                  handleDelete();
                }}
              >
                Delete
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
}
