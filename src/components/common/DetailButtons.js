import { Link as ReactLink, useNavigate } from 'react-router-dom';
import { Button, HStack, Link, IconButton, VStack } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

export default function DetailButtons() {
  const navigate = useNavigate();

  return (
    <HStack gap={5}>
      <VStack gap={1}>
        <IconButton
          onClick={() => navigate('/pages/addnote')}
          icon={<AddIcon />}
        />
        <Link as={ReactLink} to={'/pages/note'}>
          <Button colorScheme="gray">Trip Notes</Button>
        </Link>
      </VStack>
      <VStack gap={1}>
        <IconButton
          onClick={() => navigate('/pages/addactivity')}
          icon={<AddIcon />}
        />
        <Link as={ReactLink} to={'/pages/activity'}>
          <Button colorScheme="gray">Activities</Button>
        </Link>
      </VStack>
      <VStack gap={1}>
        <IconButton
          onClick={() => navigate('/pages/addcar')}
          icon={<AddIcon />}
        />
        <Link as={ReactLink} to={'/pages/car'}>
          <Button colorScheme="gray">Cars</Button>
        </Link>
      </VStack>
      <VStack gap={1}>
        <IconButton
          onClick={() => navigate('/pages/addroom')}
          icon={<AddIcon />}
        />
        <Link as={ReactLink} to={'/pages/room'}>
          <Button colorScheme="gray">Rooms</Button>
        </Link>
      </VStack>
      <VStack gap={1}>
        <IconButton
          onClick={() => navigate('/pages/addtravel')}
          icon={<AddIcon />}
        />
        <Link as={ReactLink} to={'/pages/travel'}>
          <Button colorScheme="gray">Travels</Button>
        </Link>
      </VStack>
    </HStack>
  );
}
