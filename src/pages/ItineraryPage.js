import { useRecoilValue } from 'recoil';
import { Box, Container, Center, Heading } from '@chakra-ui/react';
import * as state from 'store';

export default function ItineraryPage() {
  const currentTrip = useRecoilValue(state.currentTrip);
  return (
    <Box>
      <Container>
        <Center>
          <Heading>Itinerary for {currentTrip.name}</Heading>
        </Center>
      </Container>
    </Box>
  );
}
