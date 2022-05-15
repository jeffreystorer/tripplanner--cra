import { Accordion, Container, VStack } from '@chakra-ui/react';

export default function Details({ accordionKey, items, currentTripName }) {
  return (
    <>
      <br />
      <Container>
        <div
          key={accordionKey}
          style={{
            minWidth: '350px',
          }}
        >
          <VStack gap={1}>
            <h2 className="text-center">{currentTripName} Trip</h2>;
            <Accordion defaultIndex={[]} allowMultiple allowToggle>
              {items}
            </Accordion>
          </VStack>
        </div>
      </Container>
    </>
  );
}
