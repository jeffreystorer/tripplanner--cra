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
        <HStack gap={5}>
          <Link as={ReactLink} to={'/pages/addnote'}>
            <Button colorScheme="gray">Add Trip Note</Button>
          </Link>
          <Link as={ReactLink} to={'/pages/addactivity'}>
            <Button colorScheme="gray">Add Activity</Button>
          </Link>
          <Link as={ReactLink} to={'/pages/addcar'}>
            <Button colorScheme="gray">Add Car</Button>
          </Link>
          <Link as={ReactLink} to={'/pages/addroom'}>
            <Button colorScheme="gray">Add Room</Button>
          </Link>
          <Link as={ReactLink} to={'/pages/addtravel'}>
            <Button colorScheme="gray">Add Travel</Button>
          </Link>
        </HStack>
        {/* <HStack gap={5}>
          <Link as={ReactLink} to={'/pages/note'}>
            <Button colorScheme="gray">Trip Notes</Button>
          </Link>
          <Link as={ReactLink} to={'/pages/activity'}>
            <Button colorScheme="gray">Activities</Button>
          </Link>
          <Link as={ReactLink} to={'/pages/car'}>
            <Button colorScheme="gray">Cars</Button>
          </Link>
          <Link as={ReactLink} to={'/pages/room'}>
            <Button colorScheme="gray">Rooms</Button>
          </Link>
          <Link as={ReactLink} to={'/pages/travel'}>
            <Button colorScheme="gray">Travels</Button>
          </Link>
        </HStack> */}
        <h2 className="text-center">
          <HStack gap={5}>
            <Text>
              {labels[page]}
              {' for '}
              {currentTripName}
            </Text>
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
