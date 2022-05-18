import { Link as ReactLink } from 'react-router-dom';
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Container,
  Box,
  Button,
  HStack,
  Link,
  ModalFooter,
  VStack,
} from '@chakra-ui/react';
import Textarea from 'react-expanding-textarea';
import { v4 as uuidv4 } from 'uuid';

export default function Activity({ page, data, showModal }) {
  return data?.map((detail, index) => (
    <AccordionItem key={uuidv4()}>
      <h2>
        <AccordionButton id={`heading${index}`}>
          <Container>
            <AccordionIcon />
            <Box flex="1" textAlign="left">
              Activities for{' '}
              {Object.values(detail)[0].replaceAll('T', ' ').substring(5)}
              {':  '}
              <Textarea
                cols="60"
                readOnly={true}
                value={Object.values(detail)[1]}
              />
            </Box>
          </Container>
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <VStack gap={1}>
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
