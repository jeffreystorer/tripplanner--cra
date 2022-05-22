import { useRecoilValue } from 'recoil';
import {
  Container,
  Table,
  Tbody,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import * as state from 'store';

export default function Itinerary({ items, currentTripName }) {
  const PERCENT = useRecoilValue(state.screenWidthPercent);
  const FONT_SIZE = '1.2rem';
  const min = PERCENT.toString() + 'vw';
  return (
    <>
      <Container minWidth={min} centerContent>
        <TableContainer minWidth={min}>
          <Table minWidth={min} fontSize={FONT_SIZE}>
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
