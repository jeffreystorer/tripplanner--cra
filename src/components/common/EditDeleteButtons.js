import { Link as ReactLink } from 'react-router-dom';
import { Button, HStack, Link, ModalFooter } from '@chakra-ui/react';

export default function EditDeleteButtons({ page, index, showModal }) {
  return (
    <ModalFooter>
      <HStack gap={5}>
        <Link as={ReactLink} to={`/pages/edit${page}/${index}`}>
          <Button colorScheme="blue">Edit</Button>
        </Link>
        <Button colorScheme="gray" onClick={() => showModal(index)}>
          Delete
        </Button>
      </HStack>
    </ModalFooter>
  );
}
