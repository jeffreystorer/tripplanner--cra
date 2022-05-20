import {
  Container,
  Table,
  Tbody,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';

export default function Itinerary({ items, currentTripName }) {
  return (
    <>
      <Container maxW="100%" centerContent>
        <TableContainer>
          <Table size="lg">
            <TableCaption placement="top">{currentTripName}</TableCaption>
            <Tbody>{items}</Tbody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
