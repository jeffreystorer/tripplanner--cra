import { Table, Tbody, TableCaption, TableContainer } from '@chakra-ui/react';

export default function Itinerary({ items, currentTripName }) {
  return (
    <>
      <TableContainer>
        <Table size="lg">
          <TableCaption placement="top">{currentTripName}</TableCaption>
          <Tbody>{items}</Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
