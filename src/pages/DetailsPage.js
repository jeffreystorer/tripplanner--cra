import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useDisclosure } from '@chakra-ui/react';
import { useVisibilityChange } from 'use-visibility-change';
import { ConfirmDeleteDetailModal } from 'components/common';
import { Details } from 'components/screens';
import { removeDetail } from 'services';
import * as state from 'store';
import { createAccordionItems } from 'utils';

export default function DetailsPage({ snapshots, page }) {
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
  const [data, setData] = useRecoilState(state.detailData);
  const userId = useRecoilValue(state.userId);

  useEffect(() => {
    let detailsArray = [];
    snapshots.forEach(snapshot => {
      let detailObject = snapshot.val();
      detailObject.key = snapshot.key;
      detailsArray.push(detailObject);
    });
    let sortedDetails = detailsArray;
    if (sortedDetails.length > 0) {
    switch (page) {
      case 'activity':
        sortedDetails = detailsArray.sort((a,b) => (a.astart_Date > b.astart_Date) ? 1 : ((b.astart_Date > a.astart_Date) ? -1 : 0));
        break;
      case 'car':
        sortedDetails = detailsArray.sort((a, b) => {
          const result = a.astart.localeCompare(b.astart);
          return result !== 0 ? result : a.bend.localeCompare(b.bend);
        });
        break;
      case 'note':
        break;
      case 'room':
        sortedDetails = detailsArray.sort((a, b) => {
          const result = a.astart_Date.localeCompare(b.astart_Date);
          return result !== 0 ? result : a.bend_Date.localeCompare(b.bend_Date);
        });
        break;
      case 'travel':
        sortedDetails = detailsArray.sort((a, b) => {
          const result = a.astart.localeCompare(b.astart);
          return result !== 0 ? result : a.bend.localeCompare(b.bend);
        });
        break;
      default:
        break;
    }
    setData(sortedDetails)
  }    
  }, [page, setData, snapshots]);

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
          <Details
            page={page}
            items={items}
            accordionKey={accordionKey}
            currentTripName={currentTrip.atrip_Name}
          />
        </>
      ) : (
        <Navigate to="/pages/trip" />
      )}
    </>
  );
}
