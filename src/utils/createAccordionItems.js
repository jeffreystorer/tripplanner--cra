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
  Text,
  VStack,
} from '@chakra-ui/react';

export default function createCCAccordionItems(data, showModal) {
  console.log(
    '🚀 ~ file: createAccordionItems.js ~ line 17 ~ createCCAccordionItems ~ data',
    data
  );

  const textItems = data?.values.map((item, index) => {
    if (Object.values(item)[index] !== '') {
      return (
        <Text>
          {Object.keys(item)[index].slice(1).charAt(0).toUpperCase() +
            Object.keys(item)[index].slice(2)}
          {': '}
          {Object.values(item)[index]}
        </Text>
      );
    } else {
      return null;
    }
  });

  return data?.map((item, index) => (
    <AccordionItem>
      <h2>
        <AccordionButton id={`heading${index}`}>
          <Box flex="1" textAlign="left">
            {Object.values(item.values)[0]}
            {'  '}
            {Object.values(item.values)[1]}
            {': '}
            {Object.values(item.values)[2]}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <VStack gap={1}>
          {textItems}
          <ModalFooter>
            <HStack gap={5}>
              <Link as={ReactLink} to={`/pages/editcreditcard/${index}`}>
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
