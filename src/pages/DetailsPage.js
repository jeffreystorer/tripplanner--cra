import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useDisclosure } from '@chakra-ui/react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref } from 'firebase/database';
import { firebaseConfig } from 'firebaseConfig';
import { useList } from 'react-firebase-hooks/database';
import { useVisibilityChange } from 'use-visibility-change';
import { ConfirmDeleteDetailModal, Loading } from 'components/common';
import { Details } from 'components/screens';
import { removeDetail } from 'services';
import * as state from 'store';
import { createAccordionItems } from 'utils';

export default function DetailsPage({ page }) {
  const onShow = () => {
    setAccordionKey(accordionKey + 1);
  };
  useVisibilityChange({ onShow });
  const navigate = useNavigate();
  const currentTrip = useRecoilValue(state.currentTrip);
  const currentTripKey = useRecoilValue(state.currentTripKey);
  const currentTripIndex = useRecoilValue(state.currentTripIndex);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [rowIndex, setRowIndex] = useState(null);
  const [currentKey, setCurrentKey] = useState(null);
  const [accordionKey, setAccordionKey] = useState(12345);
  const [activityData, setActivityData] = useRecoilState(state.activityData);
  const [carData, setCarData] = useRecoilState(state.carData);
  const [noteData, setNoteData] = useRecoilState(state.noteData);
  const [roomData, setRoomData] = useRecoilState(state.roomData);
  const [travelData, setTravelData] = useRecoilState(state.travelData);
  const userId = useRecoilValue(state.userId);
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const dbRef = ref(db, `/${userId}/${currentTripKey}/details/${page}/`);
  const [snapshots, loading, error] = useList(dbRef);

  useEffect(() => {
    if (!loading) {
      let detailsArray = [];
      snapshots.forEach(snapshot => {
        let detailObject = snapshot.val();
        detailObject.key = snapshot.key;
        detailsArray.push(detailObject);
      });
      let sortedDetails = detailsArray;
      switch (page) {
        case 'activity':
          sortedDetails = detailsArray.sort((a, b) => {
            const result = a.astart_Date.localeCompare(b.astart_Date);
            return result !== 0 ? result : a.bdetails.localeCompare(b.bdetails);
          });
          setActivityData(sortedDetails);
          break;
        case 'car':
          sortedDetails = detailsArray.sort((a, b) => {
            const result = a.astart.localeCompare(b.astart);
            return result !== 0 ? result : a.bend.localeCompare(b.bend);
          });
          setCarData(sortedDetails);
          break;
        case 'note':
          setNoteData(sortedDetails);
          break;
        case 'room':
          sortedDetails = detailsArray.sort((a, b) => {
            const result = a.astart_Date.localeCompare(b.astart_Date);
            return result !== 0
              ? result
              : a.bend_Date.localeCompare(b.bend_Date);
          });
          setRoomData(sortedDetails);
          break;
        case 'travel':
          sortedDetails = detailsArray.sort((a, b) => {
            const result = a.astart.localeCompare(b.astart);
            return result !== 0 ? result : a.bend.localeCompare(b.bend);
          });
          setTravelData(sortedDetails);
          break;
        default:
          break;
      }
    }
  }, [
    loading,
    page,
    setActivityData,
    setCarData,
    setNoteData,
    setRoomData,
    setTravelData,
    snapshots,
  ]);

  const handleDelete = () => {
    try {
      removeDetail(userId, currentTripKey, page, currentKey);
      const updatedData = data.filter((_, i) => i !== rowIndex);
      setData(updatedData);
    } catch (error) {
      console.log(error);
    }
    setAccordionKey(accordionKey + 1);
    navigate('/');
  };

  const showModal = i => {
    setCurrentKey(data[i].key);
    setRowIndex(i);
    onOpen();
  };

  if (error) navigate('/');
  if (loading) return <Loading />;
  const items = createAccordionItems(page, data, showModal);

  console.log('🚀 ~ file: DetailsPage.js ~ line 82 ~ DetailsPage ~ page', page);
  console.log('🚀 ~ file: DetailsPage.js ~ line 82 ~ DetailsPage ~ data', data);

  return (
    <>
      {currentTripIndex > -1 ? (
        <>
          <ConfirmDeleteDetailModal
            isOpen={isOpen}
            onClose={onClose}
            handleDelete={handleDelete}
          />
          {!loading && (
            <Details
              page={page}
              items={items}
              accordionKey={accordionKey}
              currentTripName={currentTrip.atrip_Name}
            />
          )}
        </>
      ) : (
        <Navigate to="/pages/trip" />
      )}
    </>
  );
}
