import { useRef } from 'react';
import { useRecoilState } from 'recoil';
import {
  Button,
  Checkbox,
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
  const [extraColumns, setExtraColumns] = useRecoilState(state.extraColumns);
  const [showScrollList, setShowScrollList] = useRecoilState(
    state.showScrollList
  );

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
                  <Checkbox
                    defaultChecked={showScrollList}
                    onChange={() => {
                      setShowScrollList(!showScrollList);
                      let cols = parseFloat(columns);
                      if (showScrollList) {
                        cols = cols + parseFloat(extraColumns);
                        setColumns(cols);
                      } else {
                        cols = cols - parseFloat(extraColumns);
                        setColumns(cols);
                      }
                    }}
                  >
                    Show Scroll List
                  </Checkbox>
                </div>
                <div>
                  <FormLabel htmlFor="columns">Textarea Columns</FormLabel>
                  <NumberInput
                    precision={0}
                    min={50}
                    max={200}
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
                <div>
                  <FormLabel htmlFor="extraColumns">
                    Extra Columns On Print View
                  </FormLabel>
                  <NumberInput
                    precision={0}
                    min={0}
                    max={20}
                    step={1}
                    value={extraColumns}
                    onChange={value => setExtraColumns(value)}
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
