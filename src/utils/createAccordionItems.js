import { Link as ReactLink } from 'react-router-dom';
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
  HStack,
  Link,
  ModalFooter,
  Table,
  Tbody,
  Tr,
  Td,
  VStack,
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';

export default function createCCAccordionItems(page, data, showModal) {
  console.log(
    '🚀 ~ file: createAccordionItems.js ~ line 21 ~ createCCAccordionItems ~ data',
    data
  );

  return data?.map((detail, index) => (
    <AccordionItem key={uuidv4()}>
      <h2>
        <AccordionButton id={`heading${index}`}>
          <Box flex="1" textAlign="left">
            {Object.values(detail)[0]}
            {'  '}
            {Object.values(detail)[1]}
            {'  '}
            {Object.values(detail)[2]}
            {'  '}
            {Object.values(detail)[3]}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <VStack gap={1}>
          <Table variant="simple">
            <Tbody>
              {Object.keys(detail).map((key, index) => {
                if (key !== 'key') {
                  return (
                    <Tr key={uuidv4()}>
                      <Td>
                        {key.slice(1).charAt(0).toUpperCase() +
                          key.slice(2).replaceAll('_', ' ')}
                      </Td>
                      <Td>{detail[key]}</Td>
                    </Tr>
                  );
                } else {
                  return null;
                }
              })}
            </Tbody>
          </Table>

          <ModalFooter>
            <HStack gap={5}>
              <Link as={ReactLink} to={`/pages/edit${page}/${index}`}>
                <Button colorScheme="blue">Edit</Button>
              </Link>
              <Button colorScheme="gray" onClick={() => showModal(index)}>
                Delete
              </Button>
            </HStack>
          </ModalFooter>
        </VStack>
      </AccordionPanel>
    </AccordionItem>
  ));
}
