import { forwardRef } from 'react';
import {
  Container,
  Table,
  Tbody,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';

const Itinerary = forwardRef(({ items, currentTripName }, ref) => {
  const FONT_SIZE = '1.2rem';
  return (
    <div ref={ref}>
      <Container minWidth="100vw" centerContent>
        <TableContainer minWidth="100vw">
          <Table minWidth="100vw" fontSize={FONT_SIZE}>
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
    </div>
  );
});

export default Itinerary;
