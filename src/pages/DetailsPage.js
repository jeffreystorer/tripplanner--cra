import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useDisclosure } from '@chakra-ui/react';
import { useVisibilityChange } from 'use-visibility-change';
import { ConfirmDeleteDetailModal, Loading } from 'components/common';
import { Details } from 'components/screens';
import { sortFields } from 'fields';
import { getDetails, removeDetail } from 'services';
import * as state from 'store';
import { createAccordionItems } from 'utils';

export default function DetailsPage({ page }) {
  const onShow = () => {
    setAccordionKey(accordionKey + 1);
  };
  useVisibilityChange({ onShow });
  const currentTrip = useRecoilValue(state.currentTrip);
  const currentTripKey = useRecoilValue(state.currentTripKey);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(true);
  const [rowIndex, setRowIndex] = useState(null);
  const [currentKey, setCurrentKey] = useState(null);
  const [accordionKey, setAccordionKey] = useState(12345);
  const [data, setData] = useRecoilState(state.data);
  const userId = useRecoilValue(state.userId);
  const sortField = sortFields[page];

  useEffect(() => {
    getDetails(userId, currentTripKey, page).then(data => {
      console.log(
        '🚀 ~ file: DetailsPage.js ~ line 30 ~ getDetails ~ data',
        data
      );

      let detailsArray = [];
      for (const [key, value] of Object.entries(data)) {
        let detailObject = value;
        detailObject.key = key;
        detailsArray.push(detailObject);
      }
      detailsArray.sort((a, b) => (a[sortField] > b[sortField] ? 1 : -1));
      setData(detailsArray);
      console.log(
        '🚀 ~ file: DetailsPage.js ~ line 43 ~ getDetails ~ detailsArray',
        detailsArray
      );

      setLoading(false);
    });
  }, [currentTripKey, page, setData, sortField, userId]);

  const handleDelete = () => {
    try {
      removeDetail(userId, currentTripKey, page, currentKey);
      const updatedData = data.filter((_, i) => i !== rowIndex);
      setData(updatedData);
    } catch (error) {
      console.log(error);
    }
    setAccordionKey(accordionKey + 1);
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
      <ConfirmDeleteDetailModal
        isOpen={isOpen}
        onClose={onClose}
        handleDelete={handleDelete}
      />
      <Details
        items={items}
        accordionKey={accordionKey}
        currentTripName={currentTrip.atrip_Name}
      />
    </>
  );
}
