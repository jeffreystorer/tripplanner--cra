import { Link as ReactLink } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Container,
  HStack,
  Link,
  ModalFooter,
  Text,
  VStack,
} from '@chakra-ui/react';
import Textarea from 'react-expanding-textarea';
import { v4 as uuidv4 } from 'uuid';
import * as state from 'store';
import { dowMonthDayFromStr } from 'utils';

export default function Activity({ page, data, showModal }) {
  const PERCENT = useRecoilValue(state.screenWidthPercent);
  const columns = useRecoilValue(state.columns);
  const COLS = columns * 1.2;
  const min = PERCENT.toString() + 'vw';
  return data?.map((detail, index) => (
    <AccordionItem key={uuidv4()}>
      <h2>
        <AccordionButton id={`heading${index}`}>
          <Container minWidth={min}>
            <Box minWidth={min} flex="1" textAlign="left">
              <AccordionIcon />
              <Text fontWeight="bold">
                Activities for{' '}
                {dowMonthDayFromStr(Object.values(detail)[0], 'short')}
                {':  '}
              </Text>
              <Textarea
                cols={COLS}
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
