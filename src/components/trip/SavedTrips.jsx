import { useEffect, useState } from 'react';
import {
  useRecoilState,
  useResetRecoilState,
  useSetRecoilState,
  useRecoilValue,
} from 'recoil';
import { Button, Container, HStack, Link, VStack } from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';
import { ConfirmDeleteModal } from 'components/trip';
import { removeAll, removeTrip } from 'services';
import * as state from 'store';
import 'styles/App.css';

const SavedTrips = ({ snapshots }) => {
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
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
  const userId = useRecoilValue(state.userId);

  useEffect(() => {
    if (currentTripIndex > -1) {
      const tripSnapshot = snapshots[currentTripIndex];
      setCurrentTripKey(tripSnapshot.key);
      const { name } = tripSnapshot.val();
      setCurrentTrip({
        key: tripSnapshot.key,
        name,
      });
    }
    //eslint-disable-next-line
  }, [snapshots]);

  function handleClick(tripSnapshot, index) {
    setCurrentTripKey(tripSnapshot.key);
    setCurrentTripIndex(index);
    const { name } = tripSnapshot.val();
    setCurrentTrip({
      key: tripSnapshot.key,
      name,
    });
  }

  const handleClickDelete = () => {
    setShowConfirmDeleteModal(false);
    if (allTrips) {
      removeAll(userId);
    } else {
      removeTrip(userId, currentTripKey);
    }
    resetCurrentTripIndex();
    resetCurrentTripKey();
    resetCurrentTrip();
    window.location.reload();
  };
  const handleShowConfirmDeleteCurrentModal = () => {
    setAllTrips(false);
    setShowConfirmDeleteModal(true);
  };

  const handleShowConfirmDeleteAllModal = () => {
    setAllTrips(true);
    setShowConfirmDeleteModal(true);
  };

  return (
    <>
      <Container>
        <VStack gap={1}>
          <span className="paragraph--center">
            Click on a trip to edit or delete
          </span>
          <ul className="list--text-align-left">
            {snapshots &&
              snapshots.map((snapshot, index) => (
                <li
                  className={index === currentTripIndex ? 'active_li' : 'li'}
                  onClick={() => handleClick(snapshot, index)}
                  key={index}
                >
                  {snapshot.val().name}
                </li>
              ))}
          </ul>
          <HStack gap={3}>
            <Button>
              <Link as={ReactLink} to="/pages/addtrip">
                Add a Trip
              </Link>
            </Button>
            <Button onClick={handleShowConfirmDeleteCurrentModal}>
              Delete Current Trip
            </Button>
            <Button onClick={handleShowConfirmDeleteAllModal}>
              Delete All
            </Button>
          </HStack>
        </VStack>
        <ConfirmDeleteModal
          allTrips={allTrips}
          show={showConfirmDeleteModal}
          setShow={setShowConfirmDeleteModal}
          handleDelete={handleClickDelete}
        />
      </Container>
    </>
  );
};

export default SavedTrips;
