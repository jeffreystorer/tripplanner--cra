import { useRecoilValue } from 'recoil';
import { Container, Box } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { ItineraryTable } from 'components/screens';
import * as state from 'store';
import { dowMonthDayFromStr } from 'utils';

export default function Itinerary({ PERCENT, items, currentTripName }) {
  const showScrollList = useRecoilValue(state.showScrollList);
  const itineraryData = useRecoilValue(state.itineraryData);
  const FONT_SIZE = '1.2rem';
  const min = PERCENT.toString() + 'vw';
  const innerHeight = window.innerHeight;
  const availableHeight = innerHeight - 67;
  const daysCount = itineraryData.dates.length;
  let fontSizeValue = Math.floor(((availableHeight / daysCount) * 2) / 3);
  if (fontSizeValue >= 16) fontSizeValue = 16;
  const fontSize = fontSizeValue.toString() + 'px';
  let lineHeightValue = fontSizeValue * 1.5;
  const lineHeight = lineHeightValue.toString() + 'px';
  if (showScrollList) {
    return (
      <div
        style={{
          display: 'flex',
          overflowY: 'hidden',
          marginLeft: '1rem',
        }}
      >
        <div
          style={{
            flex: '1 1 0%',
            height: '91vh',
            width: '75vh',
          }}
        >
          <div
            style={{
              display: 'block',
              height: '100%',
              outline: 'none',
              overflowY: 'auto',
              overflowX: 'hidden',
            }}
          >
            <ItineraryTable
              min={min}
              FONT_SIZE={FONT_SIZE}
              currentTripName={currentTripName}
              items={items}
            />
          </div>
        </div>
        {showScrollList && (
          <ul
            style={{
              display: 'block',
              lineHeight: lineHeight,
              /* fontFamily: 'Courier', */
              fontSize: fontSize,
              marginLeft: '1.0rem',
              marginRight: '1.0rem',
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
        )}
      </div>
    );
  } else {
    return (
      <Container centerContent minWidth="100vw">
        <Box>
          <ItineraryTable
            min={min}
            FONT_SIZE={FONT_SIZE}
            currentTripName={currentTripName}
            items={items}
          />
        </Box>
      </Container>
    );
  }
}
