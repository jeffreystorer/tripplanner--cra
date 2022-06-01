import { useRecoilValue } from 'recoil';
import Textarea from 'react-expanding-textarea';
import { v4 as uuidv4 } from 'uuid';
import { Item } from 'components/accordions';
import * as state from 'store';

export default function Note({ page, data, showModal }) {
  const COLS = useRecoilValue(state.columns);

  return data?.map((detail, index) => (
    <Item
      key={uuidv4()}
      page={page}
      index={index}
      showModal={showModal}
      button={
        <Textarea
          cols={COLS}
          readOnly={true}
          value={Object.values(detail)[0]}
        />
      }
      panel={null}
    ></Item>
  ));
}
