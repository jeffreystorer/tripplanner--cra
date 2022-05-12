import {
  Button,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Input,
  VStack,
} from '@chakra-ui/react';

export default function Trip({
  data,
  handleSubmit,
  handleChange,
  handleClickCancel,
}) {
  return (
    <>
      <Container>
        <VStack gap={1}>
          <h2 className="text-center">New Trip</h2>
          <FormControl>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              autoComplete="name"
              name="name"
              type="text"
              value={data.name}
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
