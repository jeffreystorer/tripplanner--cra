import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  VStack,
} from '@chakra-ui/react';
import * as state from 'store';

export default function SettingsPage() {
  const navigate = useNavigate();
  const [screenWidthPercent, setScreenWidthPercent] = useRecoilState(
    state.screenWidthPercent
  );
  const [columns, setColumns] = useRecoilState(state.columns);

  function handleClick() {
    navigate('/pages/itinerary');
  }

  return (
    <Container>
      <FormControl>
        <VStack gap={5}>
          <div>
            <FormLabel htmlFor="screenWidth">Screen Width Percent</FormLabel>
            <NumberInput
              step={1}
              value={screenWidthPercent}
              onChange={value => setScreenWidthPercent(value)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </div>
          <div>
            <FormLabel htmlFor="columns">Textarea Columns</FormLabel>
            <NumberInput
              step={1}
              value={columns}
              onChange={value => setColumns(value)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </div>
          <Button colorScheme="blue" onClick={handleClick}>
            Done
          </Button>
        </VStack>
      </FormControl>
    </Container>
  );
}
