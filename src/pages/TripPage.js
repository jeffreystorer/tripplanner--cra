import { useState } from 'react';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import {
  useRecoilState,
  useRecoilRefresher_UNSTABLE,
  useResetRecoilState,
  useSetRecoilState,
  useRecoilValue,
} from 'recoil';
import {
  Button,
  Container,
  HStack,
  IconButton,
  Link,
  VStack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { ConfirmDeleteTripModal } from 'components/trip';
import { removeAll, removeTrip } from 'services';
import * as state from 'store';
import { dowMonthDayFromStr } from 'utils';
import 'styles/App.css';

export default function TripPage() {
  const navigate = useNavigate();
  const userId = useRecoilValue(state.userId);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const data = useRecoilState(state.tripData);
  const [allTrips, setAllTrips] = useState(false);
  const setCurrentTrip = useSetRecoilState(state.currentTrip);
  const resetCurrentTrip = useResetRecoilState(state.currentTrip);
  const [currentTripKey, setCurrentTripKey] = useRecoilState(
    state.currentTripKey
  );
  const resetCurrentTripKey = useResetRecoilState(state.currentTripKey);
  const [currentTripIndex, setCurrentTripIndex] = useRecoilState(
    state.currentTripIndex
  );
  const resetCurrentTripIndex = useResetRecoilState(state.currentTripIndex);
  const refreshTripData = useRecoilRefresher_UNSTABLE(state.tripData);

  function handleClick(item, index) {
    setCurrentTripKey(item.key);
    setCurrentTripIndex(index);
    setCurrentTrip({
      key: item.key,
      atrip_Name:
        item.atrip_Name +
        ' ' +
        dowMonthDayFromStr(item.bstart_Date, 'long') +
        ' to ' +
        dowMonthDayFromStr(item.cend_Date, 'long'),
    });
    navigate('/pages/itinerary');
  }

  const handleClickDelete = () => {
    if (allTrips) {
      removeAll(userId);
      refreshTripData();
      navigate('/pages/trip');
    } else {
      removeTrip(userId, currentTripKey);
      refreshTripData();
      navigate('/pages/trip');
    }
    resetCurrentTripIndex();
    resetCurrentTripKey();
    resetCurrentTrip();
  };
  const handleShowConfirmDeleteCurrentModal = () => {
    setAllTrips(false);
    onOpen();
  };

  const handleShowConfirmDeleteAllModal = () => {
    setAllTrips(true);
    onOpen();
  };

  return (
    <Container>
      <VStack gap={1}>
        <HStack gap={0}>
          {data[0].length === 0 ? (
            <Text>Add a trip</Text>
          ) : (
            <Text>Click on a trip below or add a trip</Text>
          )}
          <IconButton
            onClick={() => navigate(`/pages/addtrip`)}
            icon={<AddIcon />}
          />
        </HStack>
        <ul className="list--text-align-left">
          {data.length > 0 &&
            data[0].map((item, index) => (
              <li
                className={index === currentTripIndex ? 'active_li' : 'li'}
                onClick={() => handleClick(item, index)}
                key={index}
              >
                {item.atrip_Name}{' '}
                {dowMonthDayFromStr(item.bstart_Date, 'short')}
                {' to '}
                {dowMonthDayFromStr(item.cend_Date, 'short')}
              </li>
            ))}
        </ul>
        <br />
        <HStack gap={5}>
          {currentTripIndex > -1 && (
            <>
              <Button
                onClick={() => navigate(`/pages/edittrip/${currentTripIndex}`)}
              >
                Edit Trip
              </Button>
              <Button onClick={handleShowConfirmDeleteCurrentModal}>
                Delete Trip
              </Button>
            </>
          )}
          {data.length > 0 && (
            <Button onClick={handleShowConfirmDeleteAllModal}>
              Delete All
            </Button>
          )}
        </HStack>
        <br />
        {currentTripIndex > -1 && (
          <>
            <HStack gap={5}>
              <VStack gap={1}>
                <IconButton
                  onClick={() => navigate('/pages/addnote')}
                  icon={<AddIcon />}
                />
                <Link as={ReactLink} to={'/pages/note'}>
                  <Button colorScheme="gray">Trip Notes</Button>
                </Link>
              </VStack>
              <VStack gap={1}>
                <IconButton
                  onClick={() => navigate('/pages/addactivity')}
                  icon={<AddIcon />}
                />
                <Link as={ReactLink} to={'/pages/activity'}>
                  <Button colorScheme="gray">Activities</Button>
                </Link>
              </VStack>
              <VStack gap={1}>
                <IconButton
                  onClick={() => navigate('/pages/addcar')}
                  icon={<AddIcon />}
                />
                <Link as={ReactLink} to={'/pages/car'}>
                  <Button colorScheme="gray">Cars</Button>
                </Link>
              </VStack>
              <VStack gap={1}>
                <IconButton
                  onClick={() => navigate('/pages/addroom')}
                  icon={<AddIcon />}
                />
                <Link as={ReactLink} to={'/pages/room'}>
                  <Button colorScheme="gray">Rooms</Button>
                </Link>
              </VStack>
              <VStack gap={1}>
                <IconButton
                  onClick={() => navigate('/pages/addtravel')}
                  icon={<AddIcon />}
                />
                <Link as={ReactLink} to={'/pages/travel'}>
                  <Button colorScheme="gray">Travels</Button>
                </Link>
              </VStack>
            </HStack>
          </>
        )}
      </VStack>
      <ConfirmDeleteTripModal
        allTrips={allTrips}
        isOpen={isOpen}
        onClose={onClose}
        handleDelete={handleClickDelete}
      />
    </Container>
  );
}
