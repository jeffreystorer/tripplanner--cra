import { Table, Tbody, Td, Text, Tr } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { Item } from 'components/accordions/sections';
import { labels } from 'fields';
import { dowMonthDayFromStr, stayDates } from 'utils';

export default function Room({ page, data, showModal }) {
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
        <Item
          key={uuidv4()}
          page={page}
          index={index}
          showModal={showModal}
          button={
            <Text>
              Stay: {dowMonthDayFromStr(date, 'short')}{' '}
              {Object.values(detail)[2]}
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
      ));
    } else {
      return null;
    }
  }

  return data?.map((detail, index) => (
    <div key={uuidv4()}>
      <Item
        key={uuidv4()}
        page={page}
        index={index}
        showModal={showModal}
        button={
          <Text>
            Check In: {dowMonthDayFromStr(Object.values(detail)[0], 'short')}{' '}
            {Object.values(detail)[2]}
            {', '}
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
      {stayItems(detail, index)}
      <Item
        key={uuidv4()}
        page={page}
        index={index}
        showModal={showModal}
        button={
          <Text>
            Check Out: {dowMonthDayFromStr(Object.values(detail)[1], 'short')}{' '}
            {Object.values(detail)[2]}
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
