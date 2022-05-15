import React, { useState, useRef, useEffect } from 'react';
import StartWindow from './StartWindow';
import ResultModal from './ResultModal';
import { useDisclosure } from '@chakra-ui/hooks';

const GameCounter = ({ endOfGameTime, getResults, result, clicked }) => {
  const [elapsedTime, setElapsedTime] = useState(endOfGameTime);
  const [isActive, setIsActive] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const {
    isOpen: isOpenReportModal,
    onOpen: onOpenReportModal,
    onClose: onCloseReportModal,
  } = useDisclosure();
  const countRef = useRef(null);
  useEffect(() => {
    setElapsedTime(endOfGameTime);
  }, [endOfGameTime]);

  useEffect(() => {
    if (elapsedTime < 1) {
      getResults();
      clearInterval(countRef.current);
      setIsActive(false);
      onOpenReportModal();
      // window.removeEventListener("click", countNumberOfClicks())
    }
    // return () => {window.removeEventListener("click", countNumberOfClicks)}
  }, [elapsedTime]);

  const handleStart = () => {
    if (isActive === true) {
      clearInterval(countRef.current);
      setIsActive(false);
    } else if (elapsedTime > 1) {
      setIsActive(true);
      countRef.current = setInterval(() => {
        setElapsedTime(elapsedTime => elapsedTime - 1);
      }, 1000);
    }
  };

  return (
    <>
      <StartWindow
        isOpen={isOpen}
        onClose={onClose}
        handleStart={handleStart}
      />
      <ResultModal
        onOpen={onOpenReportModal}
        isOpen={isOpenReportModal}
        result={result}
        clicked={clicked}
        handleStart={handleStart}
      />
    </>
  );
};

export default GameCounter;
