import {
  Button,
  Container,
  HStack,
  TableContainer,
  Table,
  TableCaption,
  Tbody,
  Td,
  Tr,
  VStack,
} from '@chakra-ui/react';
import Textarea from 'react-expanding-textarea';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { dowMonthDayFromStr } from 'utils';

export default function ItineraryDetail({
  PERCENT,
  currentTripName,
  COLS,
  itineraryDetail,
  showModal,
}) {
  const navigate = useNavigate();
  const LINE_HEIGHT = '1.2';
  const FONT_SIZE = '1.2rem';
  const min = PERCENT.toString() + 'vw';
  const padding = '.5rem 0 1rem .5rem';

  function handleClickCancel() {
    navigate('/pages/itinerary');
  }

  return (
    <Container key={uuidv4()} minWidth={min} centerContent>
      <VStack gap={1}>
        <TableContainer key={uuidv4()} minWidth={min}>
          <Table key={uuidv4()} minWidth={min} fontSize={FONT_SIZE}>
            <TableCaption
              fontSize={FONT_SIZE}
              fontWeight="bold"
              placement="top"
            >
              {currentTripName}
              <br />
              <br />
              {itineraryDetail.page.charAt(0).toUpperCase() +
                itineraryDetail.page.slice(1)}
              {' for '}
              {dowMonthDayFromStr(itineraryDetail.date, 'short')}
            </TableCaption>
            <Tbody>
              <Tr>
                <Td border="none" padding={padding}>
                  <Textarea
                    id={`${itineraryDetail.key}`}
                    name={`${itineraryDetail.page}`}
                    style={{
                      lineHeight: LINE_HEIGHT,
                      outline: 'none',
                      border: 'none',
                      backgroundColor: 'transparent',
                    }}
                    cols={COLS}
                    readOnly={true}
                    value={itineraryDetail.value}
                  />
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
        <br />
        <HStack key={uuidv4()} gap={5}>
          <Button
            colorScheme="blue"
            onClick={() => navigate('/pages/edititinerary')}
          >
            Edit
          </Button>
          <Button colorScheme="gray" onClick={() => showModal()}>
            Delete
          </Button>
          <Button colorScheme="gray" onClick={handleClickCancel}>
            Cancel
          </Button>
        </HStack>
      </VStack>
    </Container>
  );
}
