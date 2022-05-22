import { useEffect, useState } from 'react';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import {
  useRecoilState,
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
//import { useVisibilityChange } from 'use-visibility-change';
import { Loading } from 'components/common';
//TODO: try bootstrap modal or write a custom one?
import { ConfirmDeleteTripModal } from 'components/trip';
import { getTrips, removeAll, removeTrip } from 'services';
import * as state from 'store';
import { dowMonthDayFromStr } from 'utils';
import 'styles/App.css';

export default function TripPage() {
  /* const onShow = () => {
    window.location.reload();
  };
  useVisibilityChange({ onShow });*/
  const navigate = useNavigate();
  const userId = useRecoilValue(state.userId); //'Fs0wwvxoWwdZPXcVo8NcHYDot1z2'; //JSON.parse(localStorage.getItem('userId'));
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useRecoilState(state.tripData);
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

  useEffect(() => {
    getTrips(userId).then(data => {
      let tripsArray = [];
      for (const [key, value] of Object.entries(data)) {
        tripsArray.push({
          key: key,
          atrip_Name: value.atrip_Name,
          bstart_Date: value.bstart_Date,
          cend_Date: value.cend_Date,
          details: value.details,
        });
      }
      tripsArray.sort((a, b) => (a.atrip_Name > b.atrip_Name ? 1 : -1));
      setData(tripsArray);
      setLoading(false);
    });
  }, [setData, userId]);

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
  }

  //TODO: update the recoil data?
  const handleClickDelete = () => {
    if (allTrips) {
      removeAll(userId);
      navigate('/');
    } else {
      removeTrip(userId, currentTripKey);
      navigate('/');
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

  if (loading) return <Loading />;

  return (
    <>
      <Container>
        <VStack gap={1}>
          {data.length > 0 && (
            <>
              <HStack gap={0}>
                {data.length === 0 ? (
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
                  data.map((item, index) => (
                    <li
                      className={
                        index === currentTripIndex ? 'active_li' : 'li'
                      }
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
            </>
          )}
          <br />
          <br />
          <br />
          <HStack gap={5}>
            {currentTripIndex > -1 && (
              <>
                <Button
                  onClick={() =>
                    navigate(`/pages/edittrip/${currentTripIndex}`)
                  }
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
                <Link as={ReactLink} to={'/pages/note'}>
                  <Button colorScheme="gray">Trip Notes</Button>
                </Link>
                <Link as={ReactLink} to={'/pages/activity'}>
                  <Button colorScheme="gray">Activities</Button>
                </Link>
                <Link as={ReactLink} to={'/pages/car'}>
                  <Button colorScheme="gray">Cars</Button>
                </Link>
                <Link as={ReactLink} to={'/pages/room'}>
                  <Button colorScheme="gray">Rooms</Button>
                </Link>
                <Link as={ReactLink} to={'/pages/travel'}>
                  <Button colorScheme="gray">Travels</Button>
                </Link>
              </HStack>
            </>
          )}
          {/*  {currentTripIndex > -1 && (
            <VStack>
              <Button onClick={() => navigate('/pages/addnote')}>
                Add Note
              </Button>
              <Button onClick={() => navigate('/pages/addactivity')}>
                Add Activity
              </Button>
              <Button onClick={() => navigate('/pages/addcar')}>Add Car</Button>
              <Button onClick={() => navigate('/pages/addroom')}>
                Add Room
              </Button>
              <Button onClick={() => navigate('/pages/addtravel')}>
                Add Travel
              </Button>
            </VStack>
          )} */}
        </VStack>
        <ConfirmDeleteTripModal
          allTrips={allTrips}
          isOpen={isOpen}
          onClose={onClose}
          handleDelete={handleClickDelete}
        />
      </Container>
    </>
  );
}
