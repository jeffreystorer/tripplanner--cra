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
  return data?.map((detail, index) => (
    <AccordionItem key={uuidv4()}>
      <h2>
        <AccordionButton id={`heading${index}`}>
          <Box flex="1" textAlign="left">
            {Object.values(detail.values)[0]}
            {'  '}
            {Object.values(detail.values)[1]}
            {': '}
            {Object.values(detail.values)[2]}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <VStack gap={1}>
          <Table variant="simple">
            <Tbody>
              {Object.keys(detail.values).map(key => {
                const detailIndex = index;
                return (
                  <Tr key={uuidv4()}>
                    <Td>
                      {key.slice(1).charAt(0).toUpperCase() +
                        key.slice(2).replaceAll('_', ' ')}
                    </Td>
                    <Td>{data[detailIndex].values[key]}</Td>
                  </Tr>
                );
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
