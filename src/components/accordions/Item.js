import { AccordionItem } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { Button, Panel } from 'components/accordions';

export default function Item(page, index, showModal, button, panel) {
  return (
    <AccordionItem key={uuidv4()}>
      <h2>
        <Button index={index}>{button}</Button>
      </h2>
      <Panel page={page} index={index} showModal={showModal}>
        {panel}
      </Panel>
    </AccordionItem>
  );
}
