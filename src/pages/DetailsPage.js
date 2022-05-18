import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useDisclosure } from '@chakra-ui/react';
import { useVisibilityChange } from 'use-visibility-change';
import { ConfirmDeleteDetailModal, Loading } from 'components/common';
import { Details } from 'components/screens';
import { getDetails, removeDetail } from 'services';
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
  const [loading, setLoading] = useState(true);
  const [rowIndex, setRowIndex] = useState(null);
  const [currentKey, setCurrentKey] = useState(null);
  const [accordionKey, setAccordionKey] = useState(12345);
  const [data, setData] = useRecoilState(state.detailData);
  const userId = useRecoilValue(state.userId);

  useEffect(() => {
    getDetails(userId, currentTripKey, page).then(data => {
      let detailsArray = [];
      for (const [key, value] of Object.entries(data)) {
        let detailObject = value;
        detailObject.key = key;
        detailsArray.push(detailObject);
      }
      let sortedDetails = detailsArray;
      if (page !== 'note' && page !== 'activity') {
        sortedDetails = detailsArray.sort((a, b) => {
          const result = a.astart.localeCompare(b.astart);
          return result !== 0 ? result : a.bend.localeCompare(b.bend);
        });
      }
      if (page === 'activity') {
        sortedDetails = detailsArray.sort((a, b) => {
          const result = a.astart_Date.localeCompare(b.astart_Date);
          return result !== 0 ? result : a.bdetails.localeCompare(b.bdetails);
        });
      }
      setData(sortedDetails);

      setLoading(false);
    });
  }, [currentTripKey, page, setData, userId]);

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

  if (loading) return <Loading />;

  const items = createAccordionItems(page, data, showModal);

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
