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
  function textItem(keyItem) {
      return (
        <>
          <FormLabel htmlFor={keyItem}>
            {keyItem.charAt(1).toUpperCase() +
              keyItem.slice(2).replaceAll('_', ' ')}
          </FormLabel>
          <Input
            autoComplete={keyItem}
            name={keyItem}
            type={inputType[keyItem.slice(1)]}
            value={data[keyItem]}
            onChange={e => handleChange(e)}
          />
        </>
      );
    
  }

  const textItems = Object.keys(data.values).map(keyItem => {
    return textItem(keyItem);
  });

  function textItem(keyItem){
    if (data[keyItem] !== '') {
      return (
        <Text>
          {keyItem.slice(1).charAt(0).toUpperCase() +
            keyItem.slice(2)}
          {': '}
          {data[keyItem]}
        </Text>
      );
    } else {
      return null;
    }
  };

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
