import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useDisclosure } from '@chakra-ui/react';
import { useVisibilityChange } from 'use-visibility-change';
import { ConfirmDeleteDetailModal } from 'components/common';
import { Details } from 'components/screens';
import { removeDetail } from 'services';
import * as state from 'store';
import { createAccordionItems } from 'utils';

export default function DetailsPage({ detailArray, page }) {
  console.log(
    '🚀 ~ file: DetailsPage.js ~ line 13 ~ DetailsPage ~ detailArray',
    detailArray
  );
  console.log('🚀 ~ file: DetailsPage.js ~ line 13 ~ DetailsPage ~ page', page);
  const onShow = () => {
    setAccordionKey(accordionKey + 1);
  };
  useVisibilityChange({ onShow });
  const navigate = useNavigate();
  const currentTrip = useRecoilValue(state.currentTrip);
  const currentTripKey = useRecoilValue(state.currentTripKey);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [rowIndex, setRowIndex] = useState(null);
  const [currentKey, setCurrentKey] = useState(null);
  const [accordionKey, setAccordionKey] = useState(12345);
  const [data, setData] = useRecoilState(state.detailData);
  const userId = useRecoilValue(state.userId);

  useEffect(() => {
    if (detailArray.length > 0) {
      switch (page) {
        case 'activity':
          detailArray.sort(function (a, b) {
            let x = a.astart_Date.toLowerCase();
            let y = b.astart_Date.toLowerCase();
            if (x < y) {
              return -1;
            }
            if (x > y) {
              return 1;
            }
            return 0;
          });
          break;
        case 'car':
          detailArray.sort((a, b) => {
            const result = a.astart.localeCompare(b.astart);
            return result !== 0 ? result : a.bend.localeCompare(b.bend);
          });
          break;
        case 'note':
          break;
        case 'room':
          detailArray.sort((a, b) => {
            const result = a.astart_Date.localeCompare(b.astart_Date);
            return result !== 0
              ? result
              : a.bend_Date.localeCompare(b.bend_Date);
          });
          break;
        case 'travel':
          detailArray.sort((a, b) => {
            const result = a.astart.localeCompare(b.astart);
            return result !== 0 ? result : a.bend.localeCompare(b.bend);
          });
          break;
        default:
          break;
      }
      setData(detailArray);
    }
  }, [detailArray, page, setData]);

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

  return (
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
  );
}
