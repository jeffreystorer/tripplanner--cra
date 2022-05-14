import { Accordion, Container } from '@chakra-ui/react';

export default function Details({ accordionKey, items }) {
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
          <Accordion defaultIndex={[0]} allowMultiple allowToggle>
            {items}
          </Accordion>
        </div>
      </Container>
    </>
  );
}
