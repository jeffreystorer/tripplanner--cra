import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
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
  const currentTripKey = useRecoilValue(state.currentTripKey);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dataLoading, setDataLoading] = useState(true);
  const [rowIndex, setRowIndex] = useState(null);
  const [currentKey, setCurrentKey] = useState(null);
  const [accordionKey, setAccordionKey] = useState(12345);
  const [data, setData] = useRecoilState(state.detailData);
  const userId = useRecoilValue(state.userId);
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const dbRef = ref(db, `/${userId}/${currentTripKey}/details/${page}/`);
  const [snapshots, loading, error] = useList(dbRef);

  useEffect(() => {
    let dataArray = [];
    console.log(
      '🚀 ~ file: DetailsPage.js ~ line 36 ~ useEffect ~ snapshots',
      snapshots
    );
    snapshots.forEach(snapshot => {
      dataArray.push({
        key: snapshot.key,
        values: snapshot.val(),
      });
    });
    dataArray.sort((a, b) => (a.values.date > b.values.date ? 1 : -1));
    console.log(
      '🚀 ~ file: DetailsPage.js ~ line 43 ~ useEffect ~ dataArray',
      dataArray
    );
    setData(dataArray);
    setDataLoading(false);
  }, [setData, snapshots]);

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

  const items = createAccordionItems(data, showModal);

  if (error) {
    console.log('😊😊 error', error);
    return <Navigate to="/" />;
  }

  if (loading || dataLoading) return <Loading />;

  return (
    <>
      <ConfirmDeleteDetailModal
        isOpen={isOpen}
        onClose={onClose}
        handleDelete={handleDelete}
      />
      <Details items={items} accordionKey={accordionKey} />
    </>
  );
}
