import { useRecoilValue } from 'recoil';
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Input,
  VStack,
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import Textarea from 'react-expanding-textarea';
import { inputType, labels } from 'fields';
import * as state from 'store';

export default function AddEdit({
  mode,
  data,
  page,
  handleSubmit,
  handleChange,
  handleClickCancel,
}) {
  const currentTrip = useRecoilValue(state.currentTrip);

  let header;
  if (page === 'trip') {
    header = (
      <h2 key={uuidv4()} className="text-center">
        {mode} Trip
      </h2>
    );
  } else {
    header = (
      <h2 key={uuidv4()} className="text-center">
        {mode} {page.charAt(0).toUpperCase() + page.slice(1)} for{' '}
        {currentTrip.atrip_Name} Trip
      </h2>
    );
  }

  function formItem(keyItem) {
    let inputLabel = '';
    if (!labels[page].hasOwnProperty(keyItem)) {
      inputLabel =
        keyItem.charAt(1).toUpperCase() + keyItem.slice(2).replaceAll('_', ' ');
    } else {
      inputLabel =
        labels[page][keyItem].charAt(1).toUpperCase() +
        labels[page][keyItem].slice(2).replaceAll('_', ' ');
    }

    if (inputType[keyItem.slice(1)] === 'textarea') {
      return (
        <>
          <FormLabel key={uuidv4()} htmlFor={keyItem}>
            {inputLabel}
          </FormLabel>
          <Textarea
            style={{ border: '1px solid rgb(226, 232, 240)' }}
            cols="60"
            name={keyItem}
            value={data[keyItem]}
            onChange={e => handleChange(e)}
          />
        </>
      );
    } else {
      return (
        <>
          <FormLabel key={uuidv4()} htmlFor={keyItem}>
            {inputLabel}
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
  }

  const inputs = Object.keys(data).map(keyItem => {
    if (keyItem !== 'key' && keyItem !== 'details') {
      return formItem(keyItem);
    } else {
      return null;
    }
  });

  return (
    <>
      <Container>
        <VStack gap={1}>
          {header}
          <FormControl key={uuidv4()}>{inputs}</FormControl>
          <br />
          <HStack key={uuidv4()} gap={5}>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Save
            </Button>
            <Button colorScheme="gray" onClick={handleClickCancel}>
              Cancel
            </Button>
          </HStack>
        </VStack>
      </Container>
      <br />
      <br />
    </>
  );
}
