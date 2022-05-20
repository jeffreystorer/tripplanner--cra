import {
  Container,
  Table,
  Tbody,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';

export default function Itinerary({ items, currentTripName }) {
  const FONT_SIZE = '1.2rem';
  return (
    <>
      <Container minWidth="100vw" centerContent>
        <TableContainer>
          <Table fontSize={FONT_SIZE}>
            <TableCaption
              fontSize={FONT_SIZE}
              fontWeight="bold"
              placement="top"
            >
              {currentTripName}
            </TableCaption>
            <Tbody>{items}</Tbody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
