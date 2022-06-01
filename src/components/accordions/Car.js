import { Table, Tbody, Td, Text, Tr } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { Item } from 'components/accordions/sections';
import { labels } from 'fields';
import { dowMonthDayFromStr } from 'utils';

export default function Car({ page, data, showModal }) {
  return data?.map((detail, index) => (
    <div key={uuidv4()}>
      <Item
        key={uuidv4()}
        page={page}
        index={index}
        showModal={showModal}
        button={
          <Text>
            Pick Up: {dowMonthDayFromStr(Object.values(detail)[0], 'short')}
            {'  '}
            {Object.values(detail)[0].substring(11)}
            {'  '}
            {Object.values(detail)[2]}
            {',  '}
            {Object.values(detail)[3]}
          </Text>
        }
        panel={
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
        }
      />
      <Item
        key={uuidv4()}
        page={page}
        index={index}
        showModal={showModal}
        button={
          <Text>
            Drop Off: {dowMonthDayFromStr(Object.values(detail)[1], 'short')}
            {'  '}
            {Object.values(detail)[1].substring(11)}
            {'  '}
            {Object.values(detail)[2]}
            {',  '}
            {Object.values(detail)[5]}
          </Text>
        }
        panel={
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
        }
      />
    </div>
  ));
}
