import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { useDisclosure } from '@chakra-ui/react';
import { useVisibilityChange } from 'use-visibility-change';
import { ConfirmDeleteDetailModal } from 'components/common';
import { Details } from 'components/screens';
import { removeDetail } from 'services';
import * as state from 'store';
import { createAccordionItems } from 'utils';

export default function DetailsPage({ detailArray, page }) {
  const onShow = () => {
    setAccordionKey(accordionKey + 1);
  };
  useVisibilityChange({ onShow });
  const navigate = useNavigate();
  const currentTrip = useRecoilValue(state.currentTrip);
  const currentTripKey = useRecoilValue(state.currentTripKey);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentKey, setCurrentKey] = useState(null);
  const [accordionKey, setAccordionKey] = useState(12345);
  const data = useRecoilState(state.detailData(page));
  const userId = useRecoilValue(state.userId);
  const refreshDetailData = useRecoilRefresher_UNSTABLE(state.detailData(page));

  const handleDelete = () => {
    try {
      removeDetail(userId, currentTripKey, page, currentKey);
      refreshDetailData();
    } catch (error) {
      console.log(error);
    }
    setAccordionKey(accordionKey + 1);
    navigate(`/pages/${page}`);
  };

  const showModal = i => {
    setCurrentKey(data[0][i].key);
    onOpen();
  };
  const items = createAccordionItems(page, data[0], showModal);

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
