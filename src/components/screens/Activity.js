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
import * as state from 'store';

export default function Activity({
  data,
  handleSubmit,
  handleChange,
  handleClickCancel,
}) {
  const currentTrip = useRecoilValue(state.currentTrip);

  return (
    <>
      <Container>
        <VStack gap={1}>
          <h2 className="text-center">
            New Activity for {currentTrip.name} Trip
          </h2>
          <FormControl>
            <FormLabel htmlFor="place">Place</FormLabel>
            <Input
              autoComplete="place"
              name="place"
              type="text"
              value={data.place}
              onChange={e => handleChange(e)}
            />
            <FormLabel htmlFor="date">Date</FormLabel>
            <Input
              autoComplete="date"
              name="date"
              type="datetime-local"
              value={data.date}
              onChange={e => handleChange(e)}
            />
            <FormLabel htmlFor="notes">Notes</FormLabel>
            <Input
              autoComplete="notes"
              name="notes"
              type="textarea"
              value={data.notes}
              onChange={e => handleChange(e)}
            />
          </FormControl>
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
