import { Table, Tbody, TableCaption } from '@chakra-ui/react';

export default function ItineraryTable({
  min,
  FONT_SIZE,
  currentTripName,
  items,
}) {
  return (
    <Table minWidth={min} fontSize={FONT_SIZE}>
      <TableCaption fontSize={FONT_SIZE} fontWeight="bold" placement="top">
        {currentTripName}
      </TableCaption>
      <Tbody>{items}</Tbody>
    </Table>
  );
}
