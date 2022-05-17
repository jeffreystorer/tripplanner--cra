import { useNavigate } from 'react-router-dom';
import {
  Accordion,
  Container,
  HStack,
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
            <h2 className="text-center">
              <HStack gap={5}>
                <Text>{currentTripName} Trip</Text>
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
        </div>
      </Container>
    </>
  );
}
