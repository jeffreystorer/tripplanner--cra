import { useRecoilValue } from 'recoil';
import {
  Container,
  Table,
  Tbody,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import * as state from 'store';

export default function Itinerary({ PERCENT, items, currentTripName }) {
  const itineraryData = useRecoilValue(state.itineraryData);
  const FONT_SIZE = '1.2rem';
  const min = PERCENT.toString() + 'vw';
  const innerHeight = window.innerHeight;
  const availableHeight = innerHeight - 67;
  const height = availableHeight.toString() + 'px';
  const daysCount = 32;
  const lineHeight = Math.floor(availableHeight / daysCount).toString() + 'px';
  const fontSize =
    Math.floor(((availableHeight / daysCount) * 2) / 3).toString() + 'px';
  return (
    <Container minWidth={min} centerContent>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, height: height }}>
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
        </div>
        <div style={{ width: 'fit-content' }}>
          <ul
            style={{
              lineHeight: lineHeight,
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
                    {item.slice(5, 10)}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Container>
  );
}
