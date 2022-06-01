import { AccordionPanel, VStack } from '@chakra-ui/react';
import { EditDeleteButtons } from 'components/common';

export default function Panel(props) {
  return (
    <AccordionPanel pb={4}>
      <VStack gap={1}>
        {props.children}
        <EditDeleteButtons
          page={props.page}
          index={props.index}
          showModal={props.showModal}
        />
      </VStack>
    </AccordionPanel>
  );
}
