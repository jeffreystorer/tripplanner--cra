import { useRecoilValue } from 'recoil';
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Container,
  VStack,
} from '@chakra-ui/react';
import Textarea from 'react-expanding-textarea';
import { v4 as uuidv4 } from 'uuid';
import { EditDeleteButtons } from 'components/common';
import * as state from 'store';

export default function Note({ page, data, showModal }) {
  const PERCENT = useRecoilValue(state.screenWidthPercent);
  const columns = useRecoilValue(state.columns);
  const COLS = columns * 1.0;
  const min = PERCENT.toString() + 'vw';
  return data?.map((detail, index) => (
    <AccordionItem key={uuidv4()}>
      <h2>
        <AccordionButton id={`heading${index}`}>
          <AccordionIcon />
          <Container minWidth={min}>
            <Box minWidth={min} flex="1" textAlign="left">
              <Textarea
                cols={COLS}
                readOnly={true}
                value={Object.values(detail)[0]}
              />
            </Box>
          </Container>
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <VStack gap={1}>
          <EditDeleteButtons page={page} index={index} showModal={showModal} />
        </VStack>
      </AccordionPanel>
    </AccordionItem>
  ));
}
