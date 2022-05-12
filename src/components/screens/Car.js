import {
  Button,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Input,
  VStack,
} from '@chakra-ui/react';

export default function Car({
  data,
  handleSubmit,
  handleChange,
  handleClickCancel,
}) {
  return (
    <>
      <Container>
        <VStack gap={1}>
          <h2 className="text-center">New Car</h2>
          <FormControl>
            <FormLabel htmlFor="trip">Trip</FormLabel>
            <Input
              autoComplete="trip"
              name="trip"
              type="text"
              value={data.trip}
              onChange={e => handleChange(e)}
            />
            <FormLabel htmlFor="place">Place</FormLabel>
            <Input
              autoComplete="place"
              name="place"
              type="text"
              value={data.place}
              onChange={e => handleChange(e)}
            />
            <FormLabel htmlFor="shortName">Short Name</FormLabel>
            <Input
              autoComplete="shortName"
              name="shortName"
              type="text"
              value={data.shortName}
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
