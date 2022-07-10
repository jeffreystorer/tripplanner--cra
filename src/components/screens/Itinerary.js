import { useRecoilValue } from 'recoil';
import {
  Box,
  Container,
  Flex,
  HStack,
  Table,
  Tbody,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import * as state from 'store';
import { dowMonthDayFromStr } from 'utils';

export default function Itinerary({ PERCENT, items, currentTripName }) {
  const itineraryData = useRecoilValue(state.itineraryData);
  const FONT_SIZE = '1.2rem';
  const min = PERCENT.toString() + 'vw';
  const innerHeight = window.innerHeight;
  const availableHeight = innerHeight - 67;
  const daysCount = itineraryData.dates.length;
  const lineHeight = Math.floor(availableHeight / daysCount).toString() + 'px';
  const fontSize =
    Math.floor(((availableHeight / daysCount) * 2) / 3).toString() + 'px';
  return (
    <Container centerContent minWidth="100vw">
      <Flex>
        <Box>
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
        </Box>
        <Box ml="87%" position="fixed">
          <ul
            style={{
              lineHeight: lineHeight,
              /* fontFamily: 'Courier', */
              fontSize: fontSize,
              marginLeft: '1.0rem',
              paddingLeft: '0',
              listStyle: 'none',
              width: 'fit-content',
            }}
          >
            {itineraryData.dates.map(item => {
              return (
                <li key={uuidv4()}>
                  {/*eslint-disable-next-line*/}
                  <a
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      const node = document.getElementById(item);
                      node.scrollIntoView({
                        behavior: 'auto',
                        block: 'start',
                        inline: 'nearest',
                      });
                    }}
                  >
                    {dowMonthDayFromStr(item, 'short')}
                  </a>
                </li>
              );
            })}
          </ul>
        </Box>
      </Flex>
    </Container>
  );
}
