import { Link as ReactLink, useNavigate } from 'react-router-dom';
import {
  Accordion,
  Button,
  Container,
  HStack,
  Link,
  IconButton,
  Text,
  VStack,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

export default function Details({
  accordionKey,
  items,
  currentTripName,
  page,
}) {
  const navigate = useNavigate();
  const labels = {
    activity: 'Activities',
    car: 'Cars',
    note: 'Trip Notes',
    room: 'Rooms',
    travel: 'Travels',
  };
  return (
    <Container
      key={accordionKey}
      style={{
        minWidth: '100vw',
      }}
    >
      <VStack gap={1}>
        <br />
        <Text>
          <strong>{currentTripName}</strong>
        </Text>
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
        <h2 className="text-center">
          <HStack gap={5}>
            <Text>{labels[page]}</Text>
            <IconButton
              onClick={() => navigate(`/pages/add${page}`)}
              icon={<AddIcon />}
            />
          </HStack>
        </h2>
        ;
        <Accordion defaultIndex={[]} allowMultiple allowToggle>
          {items}
        </Accordion>
      </VStack>
    </Container>
  );
}
