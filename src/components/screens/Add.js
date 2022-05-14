import { useRecoilValue } from 'recoil';
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { fields, inputType } from 'fields';
import * as state from 'store';

export default function Add({
  page,
  data,
  handleSubmit,
  handleChange,
  handleClickCancel,
}) {
  const currentTrip = useRecoilValue(state.currentTrip);

  let header;
  if (page === 'trip') {
    header = <h2 className="text-center">New Trip</h2>;
  } else {
    header = (
      <h2 className="text-center">
        New {page.charAt(0).toUpperCase() + page.slice(1)} for{' '}
        {currentTrip.atrip_Name} Trip
      </h2>
    );
  }

  function formItem(keyItem) {
    if (inputType[keyItem] === 'textarea') {
      return (
        <>
          <FormLabel htmlFor={keyItem}>
            {keyItem.charAt(1).toUpperCase() +
              keyItem.slice(2).replaceAll('_', ' ')}
          </FormLabel>
          <Textarea
            name={keyItem}
            value={data[keyItem]}
            onChange={e => handleChange(e)}
            size="sm"
          />
        </>
      );
    } else {
      return (
        <>
          <FormLabel htmlFor={keyItem}>
            {keyItem.charAt(1).toUpperCase() +
              keyItem.slice(2).replaceAll('_', ' ')}
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

  const inputs = Object.keys(fields[page]).map(keyItem => {
    return formItem(keyItem);
  });

  return (
    <>
      <Container>
        <VStack gap={1}>
          {header}
          <FormControl>{inputs}</FormControl>
          <br />
          <HStack gap={5}>
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
