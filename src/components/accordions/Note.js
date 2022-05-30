import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Container,
} from '@chakra-ui/react';
import Textarea from 'react-expanding-textarea';
import { v4 as uuidv4 } from 'uuid';
import { EditDeleteButtons } from 'components/common';

export default function Note({ page, data, showModal }) {
  return data?.map((detail, index) => (
    <AccordionItem key={uuidv4()}>
      <h2>
        <AccordionButton id={`heading${index}`}>
          <Container>
            <AccordionIcon />
            <Box flex="1" textAlign="left">
              <Textarea
                cols="60"
                readOnly={true}
                value={Object.values(detail)[0]}
              />
            </Box>
          </Container>
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <EditDeleteButtons page={page} index={index} showModal={showModal} />
      </AccordionPanel>
    </AccordionItem>
  ));
}
