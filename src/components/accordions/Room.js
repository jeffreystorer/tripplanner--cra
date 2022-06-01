import { useRecoilValue } from 'recoil';
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
  VStack,
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { EditDeleteButtons } from 'components/common';
import { labels } from 'fields';
import * as state from 'store';
import { dowMonthDayFromStr, stayDates } from 'utils';

export default function Room({ page, data, showModal }) {
  const PERCENT = useRecoilValue(state.screenWidthPercent);
  const min = PERCENT.toString() + 'vw';

  function stayItems(detail, index) {
    let stays = 0;
    if (
      detail.hasOwnProperty('astart_Date') &&
      detail.hasOwnProperty('bend_Date')
    ) {
      stays = stayDates(detail.astart_Date, detail.bend_Date).length;
    }
    if (stays > 0) {
      return stayDates(detail.astart_Date, detail.bend_Date).map(date => (
        <AccordionItem key={uuidv4()}>
          <h2>
            <AccordionButton>
              <AccordionIcon />
              <Container minWidth={min}>
                <Box flex="1" textAlign="left">
                  <Text>
                    Stay: {dowMonthDayFromStr(date, 'short')}{' '}
                    {Object.values(detail)[2]}
                  </Text>
                </Box>
              </Container>
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <VStack gap={1}>
              <Table variant="simple">
                <Tbody>
                  {Object.keys(detail).map((key, index) => {
                    let formLabel = '';
                    if (!labels[page].hasOwnProperty(key)) {
                      formLabel =
                        key.charAt(1).toUpperCase() +
                        key.slice(2).replaceAll('_', ' ');
                    } else {
                      formLabel =
                        labels[page][key].charAt(1).toUpperCase() +
                        labels[page][key].slice(2).replaceAll('_', ' ');
                    }
                    if (key !== 'key') {
                      if (key.includes('start') || key.includes('end')) {
                        return (
                          <Tr key={uuidv4()}>
                            <Td>{formLabel}</Td>
                            <Td>{detail[key].replaceAll('T', ' ')}</Td>
                          </Tr>
                        );
                      } else {
                        return (
                          <Tr key={uuidv4()}>
                            <Td>{formLabel}</Td>
                            <Td>{detail[key]}</Td>
                          </Tr>
                        );
                      }
                    } else {
                      return null;
                    }
                  })}
                </Tbody>
              </Table>
              <EditDeleteButtons
                page={page}
                index={index}
                showModal={showModal}
              />
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      ));
    } else {
      return null;
    }
  }

  return data?.map((detail, index) => (
    <div key={uuidv4()}>
      <AccordionItem key={uuidv4()}>
        <h2>
          <AccordionButton>
            <AccordionIcon />
            <Container minWidth={min}>
              <Box flex="1" textAlign="left">
                <Text>
                  Check In:{' '}
                  {dowMonthDayFromStr(Object.values(detail)[0], 'short')}{' '}
                  {Object.values(detail)[2]}
                  {', '}
                  {Object.values(detail)[3]}
                </Text>
              </Box>
            </Container>
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <VStack gap={1}>
            <Table variant="simple">
              <Tbody>
                {Object.keys(detail).map((key, index) => {
                  let formLabel = '';
                  if (!labels[page].hasOwnProperty(key)) {
                    formLabel =
                      key.charAt(1).toUpperCase() +
                      key.slice(2).replaceAll('_', ' ');
                  } else {
                    formLabel =
                      labels[page][key].charAt(1).toUpperCase() +
                      labels[page][key].slice(2).replaceAll('_', ' ');
                  }
                  if (key !== 'key') {
                    if (key.includes('start') || key.includes('end')) {
                      return (
                        <Tr key={uuidv4()}>
                          <Td>{formLabel}</Td>
                          <Td>{detail[key].replaceAll('T', ' ')}</Td>
                        </Tr>
                      );
                    } else {
                      return (
                        <Tr key={uuidv4()}>
                          <Td>{formLabel}</Td>
                          <Td>{detail[key]}</Td>
                        </Tr>
                      );
                    }
                  } else {
                    return null;
                  }
                })}
              </Tbody>
            </Table>
            <EditDeleteButtons
              page={page}
              index={index}
              showModal={showModal}
            />
          </VStack>
        </AccordionPanel>
      </AccordionItem>
      {stayItems(detail, index)}
      <AccordionItem key={uuidv4()}>
        <h2>
          <AccordionButton>
            <AccordionIcon />
            <Container minWidth={min}>
              <Box flex="1" textAlign="left">
                <Text>
                  Check Out:{' '}
                  {dowMonthDayFromStr(Object.values(detail)[1], 'short')}{' '}
                  {Object.values(detail)[2]}
                </Text>
              </Box>
            </Container>
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <VStack gap={1}>
            <Table variant="simple">
              <Tbody>
                {Object.keys(detail).map((key, index) => {
                  let formLabel = '';
                  if (!labels[page].hasOwnProperty(key)) {
                    formLabel =
                      key.charAt(1).toUpperCase() +
                      key.slice(2).replaceAll('_', ' ');
                  } else {
                    formLabel =
                      labels[page][key].charAt(1).toUpperCase() +
                      labels[page][key].slice(2).replaceAll('_', ' ');
                  }
                  if (key !== 'key') {
                    if (key.includes('start') || key.includes('end')) {
                      return (
                        <Tr key={uuidv4()}>
                          <Td>{formLabel}</Td>
                          <Td>{detail[key].replaceAll('T', ' ')}</Td>
                        </Tr>
                      );
                    } else {
                      return (
                        <Tr key={uuidv4()}>
                          <Td>{formLabel}</Td>
                          <Td>{detail[key]}</Td>
                        </Tr>
                      );
                    }
                  } else {
                    return null;
                  }
                })}
              </Tbody>
            </Table>
            <EditDeleteButtons
              page={page}
              index={index}
              showModal={showModal}
            />
          </VStack>
        </AccordionPanel>
      </AccordionItem>
    </div>
  ));
}
