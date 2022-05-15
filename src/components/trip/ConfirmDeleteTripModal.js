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

export default function ConfirmDeleteModal({ isOpen, onClose, handleDelete }) {
  const navigate = useNavigate();
  let message = 'Are you sure you want to delete this item?';

  return (
    <ChakraProvider>
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={() => {
          onClose();
          navigate('/');
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
                  navigate('/');
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
