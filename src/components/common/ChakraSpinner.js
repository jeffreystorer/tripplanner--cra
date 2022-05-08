import { Center, Spinner } from '@chakra-ui/react';

export default function ChakraSpinner() {
  return (
    <Center ml="12rem">
      <Spinner
        thickness=".25rem"
        speed="0.65s"
        //emptyColor="#E6B862"
        emptyColor="#7283fe"
        //color="#964800"
        color="#0b0c3a"
        size="xl"
      />
    </Center>
  );
}
