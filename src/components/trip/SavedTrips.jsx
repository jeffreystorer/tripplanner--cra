import { useEffect, useState } from 'react';
import {
  useRecoilState,
  useResetRecoilState,
  useSetRecoilState,
  useRecoilValue,
} from 'recoil';
import { Container } from '@chakra-ui/react';
import { ConfirmDeleteModal } from 'components/trip';
import { removeAll } from 'services';
import * as state from 'store';
import 'styles/App.css';

const SavedTrips = ({ snapshots }) => {
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const setCurrentTrip = useSetRecoilState(state.currentTrip);
  const resetCurrentTrip = useResetRecoilState(state.currentTrip);
  const setCurrentTripKey = useSetRecoilState(state.currentTripKey);
  const resetCurrentTripKey = useResetRecoilState(state.currentTripKey);
  const [currentTripIndex, setCurrentTripIndex] = useRecoilState(
    state.currentTripIndex
  );
  const resetCurrentTripIndex = useResetRecoilState(state.currentTripIndex);
  const userId = useRecoilValue(state.userId);

  useEffect(() => {
    console.log('😊😊 currentTripIndex', currentTripIndex);
    debugger;
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

  const handleClickDeleteAll = () => {
    setShowConfirmDeleteModal(false);
    removeAll(userId);
    resetCurrentTripIndex();
    resetCurrentTripKey();
    resetCurrentTrip();
    window.location.reload();
  };

  const handleShowConfirmDeleteModal = () => {
    setShowConfirmDeleteModal(true);
  };

  return (
    <>
      {snapshots && (
        <Container>
          <span className="paragraph--center">
            Click on a trip to edit, export, or delete
          </span>
          <ul className="list--text-align-left">
            {snapshots.map((snapshot, index) => (
              <li
                className={index === currentTripIndex ? 'active_li' : 'li'}
                onClick={() => handleClick(snapshot, index)}
                key={index}
              >
                {snapshot.val().name}
              </li>
            ))}
          </ul>
          <button
            className="button stacked"
            onClick={handleShowConfirmDeleteModal}
          >
            Delete All
          </button>
          <ConfirmDeleteModal
            allTrips={true}
            show={showConfirmDeleteModal}
            setShow={setShowConfirmDeleteModal}
            handleDelete={handleClickDeleteAll}
          />
        </Container>
      )}
    </>
  );
};

export default SavedTrips;
