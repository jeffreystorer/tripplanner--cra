import { useRecoilValue } from 'recoil';
import {
  AccordionButton,
  AccordionIcon,
  Box,
  Container,
} from '@chakra-ui/react';
import * as state from 'store';

export default function Button(props) {
  const PERCENT = useRecoilValue(state.screenWidthPercent);
  const min = PERCENT.toString() + 'vw';

  return (
    <AccordionButton id={`heading${props.index}`}>
      <AccordionIcon />
      <Container minWidth={min}>
        <Box minWidth={min} flex="1" textAlign="left">
          {props.children}
        </Box>
      </Container>
    </AccordionButton>
  );
}
