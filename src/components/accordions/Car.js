import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
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
import { dowMonthDayFromStr } from 'utils';

export default function Car({ page, data, showModal }) {
  return data?.map((detail, index) => (
    <div key={uuidv4()}>
      <AccordionItem key={uuidv4()}>
        <h2>
          <AccordionButton id={`heading${index}`}>
            <Box flex="1" textAlign="left">
              <Text>
                Pick Up: {dowMonthDayFromStr(Object.values(detail)[0], 'short')}
                {'  '}
                {Object.values(detail)[0].substring(11)}
                {'  '}
                {Object.values(detail)[2]}
                {',  '}
                {Object.values(detail)[3]}
              </Text>
            </Box>
            <AccordionIcon />
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
      <AccordionItem key={uuidv4()}>
        <h2>
          <AccordionButton id={`heading${index}`}>
            <Box flex="1" textAlign="left">
              <Text>
                Drop Off:{' '}
                {dowMonthDayFromStr(Object.values(detail)[1], 'short')}
                {'  '}
                {Object.values(detail)[1].substring(11)}
                {'  '}
                {Object.values(detail)[2]}
                {',  '}
                {Object.values(detail)[5]}
              </Text>
            </Box>
            <AccordionIcon />
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
