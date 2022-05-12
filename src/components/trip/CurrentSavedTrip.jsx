import React, { useState, useEffect } from 'react';
import { useResetRecoilState, useRecoilValue } from 'recoil';
import { Navigate } from 'react-router-dom';
import { ConfirmDeleteModal } from 'components/trip';
//import { useLoadSavedTrip } from 'hooks';
import { deleteTrip } from 'services';
import * as state from 'store';
import 'styles/App.css';

export default function CurrentSavedTrip({ tripSnapshot }) {
  const [modalShow, setModalShow] = useState(false);
  //const loadSavedTrip = useLoadSavedTrip();
  const [loading, setLoading] = useState(true);

  //const resetPlayersInTrip = useResetRecoilState(state.playersInTrip);
  const resetCurrentTripIndex = useResetRecoilState(state.currentTripIndex);
  const resetCurrentTrip = useResetRecoilState(state.currentTrip);
  const currentTripKey = useRecoilValue(state.currentTripKey);
  const resetCurrentTripKey = useResetRecoilState(state.currentTripKey);

  useEffect(() => {
    editTrip();
    //eslint-disable-next-line
  }, [tripSnapshot]);

  const editTrip = () => {
    //resetSortOrder();
    try {
      let aTrip = tripSnapshot.val();
      let name = aTrip.name;
      let savedTrip = aTrip.details;
      savedTrip.name = name;
      //loadSavedTrip(savedTrip);
    } catch (error) {
      console.log('error loading trip from firebase', error);
    }
  };

  const exportTrip = () => {
    editTrip();
    setLoading(false);
  };

  const clearTrip = () => {
    //resetPlayersInTrip();
    resetCurrentTripIndex();
    resetCurrentTripKey();
    resetCurrentTrip();
    window.location.reload();
  };

  const handleDeleteTrip = () => {
    setModalShow(false);
    deleteTrip(currentTripKey);
    clearTrip();
  };

  const handleShowModal = () => {
    setModalShow(true);
  };

  if (loading) {
    return (
      <>
        <div className="div--center">
          {tripSnapshot && (
            <>
              <button className="button stacked" onClick={exportTrip}>
                Export
              </button>
              <button className="button stacked" onClick={clearTrip}>
                Clear
              </button>
              <button className="button stacked" onClick={handleShowModal}>
                Delete
              </button>
              <ConfirmDeleteModal
                allTrips={false}
                show={modalShow}
                setShow={setModalShow}
                handleDelete={handleDeleteTrip}
              />
            </>
          )}
        </div>
      </>
    );
  }

  return <Navigate replace to="/pages/itinerary" />;
}
