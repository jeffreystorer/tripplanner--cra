import { useEffect, useState } from 'react';
import { Link as ReactLink, Navigate, useNavigate } from 'react-router-dom';
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
import { initializeApp } from 'firebase/app';
import { getDatabase, ref } from 'firebase/database';
import { firebaseConfig } from 'firebaseConfig';
import { useList } from 'react-firebase-hooks/database';
//import { useVisibilityChange } from 'use-visibility-change';
import { Loading } from 'components/common';
import { ConfirmDeleteTripModal } from 'components/trip';
import { removeAll, removeTrip } from 'services';
import * as state from 'store';
import 'styles/App.css';

export default function TripPage() {
  /* const onShow = () => {
    window.location.reload();
  };
  useVisibilityChange({ onShow }); */
  const navigate = useNavigate();
  const userId = useRecoilValue(state.userId); //'Fs0wwvxoWwdZPXcVo8NcHYDot1z2'; //JSON.parse(localStorage.getItem('userId'));
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const dbRef = ref(db, `/${userId}/`);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [snapshots, loading, error] = useList(dbRef);
  const [dataLoading, setDataLoading] = useState(true);
  const setData = useSetRecoilState(state.data);
  const [allSnapshots, setAllSnapshots] = useState();
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
    setAllSnapshots(snapshots);
  }, [snapshots]);

  useEffect(() => {
    let dataArray = [];
    snapshots.forEach(snapshot => {
      dataArray.push({
        key: snapshot.key,
        values: snapshot.val(),
      });
    });
    setData(dataArray);
    console.log(
      '🚀 ~ file: TripPage.js ~ line 68 ~ useEffect ~ dataArray',
      dataArray
    );
    setDataLoading(false);
  }, [setData, snapshots]);

  function handleClick(tripSnapshot, index) {
    setCurrentTripKey(tripSnapshot.key);
    setCurrentTripIndex(index);
    const { atrip_Name } = tripSnapshot.val();
    setCurrentTrip({
      key: tripSnapshot.key,
      atrip_Name,
    });
  }

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

  if (error) {
    console.log('😊😊 error', error);
    return <Navigate to="/" />;
  }

  if (loading || dataLoading) return <Loading />;
  return (
    <>
      <Container>
        <VStack gap={1}>
          <span className="paragraph--center">
            Click on a trip to edit or delete
          </span>
          <ul className="list--text-align-left">
            {allSnapshots.length > 0 &&
              allSnapshots.map((snapshot, index) => (
                <li
                  className={index === currentTripIndex ? 'active_li' : 'li'}
                  onClick={() => handleClick(snapshot, index)}
                  key={index}
                >
                  {snapshot.val().atrip_Name}
                </li>
              ))}
          </ul>
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
            {allSnapshots.length > 0 && (
              <Button onClick={handleShowConfirmDeleteAllModal}>
                Delete All
              </Button>
            )}
          </HStack>
          {currentTripIndex > -1 && (
            <VStack>
              <Button
                onClick={() => navigate(`/pages/editTrip/${currentTripIndex}`)}
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
