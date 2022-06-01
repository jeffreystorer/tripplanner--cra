import { useRecoilValue } from 'recoil';
import { HStack, Text } from '@chakra-ui/react';
import Textarea from 'react-expanding-textarea';
import { v4 as uuidv4 } from 'uuid';
import { Item } from 'components/accordions/sections';
import * as state from 'store';
import { dowMonthDayFromStr } from 'utils';

export default function Activity({ page, data, showModal }) {
  const COLS = useRecoilValue(state.columns);

  return data?.map((detail, index) => (
    <Item
      key={uuidv4()}
      page={page}
      index={index}
      showModal={showModal}
      button={
        <HStack>
          <Text width="6rem">
            {dowMonthDayFromStr(Object.values(detail)[0], 'short')}
          </Text>
          <Textarea
            cols={COLS}
            readOnly={true}
            value={Object.values(detail)[1]}
          />
        </HStack>
      }
      panel={null}
    />
  ));
}
