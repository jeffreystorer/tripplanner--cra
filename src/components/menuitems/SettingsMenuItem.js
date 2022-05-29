import { useRef } from 'react';
import { useRecoilState } from 'recoil';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import * as state from 'store';

export default function SettingsPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const firstField = useRef();
  const [screenWidthPercent, setScreenWidthPercent] = useRecoilState(
    state.screenWidthPercent
  );
  const [columns, setColumns] = useRecoilState(state.columns);

  return (
    <>
      <Button as={Text} ref={btnRef} onClick={onOpen}>
        Settings
      </Button>
      <Drawer
        size="xs"
        isOpen={isOpen}
        placement="top"
        onClose={onClose}
        initialFocusRef={firstField}
        finalFocusRef={btnRef}
        closeOnEsc
        closeOnOverlayClick
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader textAlign="center">Screen Settings</DrawerHeader>

          <DrawerBody>
            <FormControl>
              <VStack gap={5}>
                <div>
                  <FormLabel htmlFor="columns">Textarea Columns</FormLabel>
                  <NumberInput
                    step={1}
                    value={columns}
                    onChange={value => setColumns(value)}
                  >
                    <NumberInputField ref={firstField} />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </div>
                <div>
                  <FormLabel htmlFor="screenWidth">
                    Screen Width Percent
                  </FormLabel>
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
              </VStack>
            </FormControl>
          </DrawerBody>
          <DrawerFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Done
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
