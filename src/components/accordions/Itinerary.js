import { Box, Container, Center, Heading, VStack } from '@chakra-ui/react';

export default function Itinerary() {
  return (
    <>
      {currentTripIndex > -1 ? (
        <Box>
          <Container>
            <Center>
              <VStack gap={5}>
                <Heading>Itinerary for {currentTrip.atrip_Name}</Heading>
                <Heading>Under Construction</Heading>
              </VStack>
            </Center>
          </Container>
        </Box>
      ) : (
        <Navigate to="/pages/trip" />
      )}
    </>
  );
}
