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
  Link,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
//import { useVisibilityChange } from 'use-visibility-change';
import { Loading } from 'components/common';
//TODO: try bootstrap modal or write a custom one?
import { ConfirmDeleteTripModal } from 'components/trip';
import { getTrips, removeAll, removeTrip } from 'services';
import * as state from 'store';
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
      console.log('🚀 ~ file: TripPage.js ~ line 48 ~ getTrips ~ data', data);

      let tripsArray = [];
      for (const [key, value] of Object.entries(data)) {
        tripsArray.push({
          key: key,
          atrip_Name: value.atrip_Name,
          bstart_Date: value.bstart_Date.substring(6),
          cend_Date: value.cend_Date.substring(6),
          details: value.details,
        });
      }
      tripsArray.sort((a, b) => (a.atrip_Name > b.atrip_Name ? 1 : -1));
      setData(tripsArray);
      console.log(
        '🚀 ~ file: TripPage.js ~ line 61 ~ getTrips ~ tripsArray',
        tripsArray
      );
      setLoading(false);
    });
  }, [setData, userId]);

  function handleClick(item, index) {
    setCurrentTripKey(item.key);
    setCurrentTripIndex(index);
    setCurrentTrip({
      key: item.key,
      atrip_Name: item.atrip_Name,
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
              <span className="paragraph--center">
                Click on a trip to edit or delete
              </span>
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
                      {item.atrip_Name} {item.bstart_Date}
                      {' to '}
                      {item.cend_Date}
                    </li>
                  ))}
              </ul>
            </>
          )}
          <HStack gap={3}>
            <Button>
              <Link as={ReactLink} to="/pages/addtrip">
                Add a Trip
              </Link>
            </Button>
            {currentTripIndex > -1 && (
              <Button onClick={handleShowConfirmDeleteCurrentModal}>
                Delete Trip
              </Button>
            )}
            {data.length > 0 && (
              <Button onClick={handleShowConfirmDeleteAllModal}>
                Delete All
              </Button>
            )}
          </HStack>
          {currentTripIndex > -1 && (
            <VStack>
              <Button
                onClick={() =>
                  navigate(`/pages/renametrip/${currentTripIndex}`)
                }
              >
                Rename Trip
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
          )}
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
