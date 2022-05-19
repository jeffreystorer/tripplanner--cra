import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  Box,
  Center,
  Container,
  Heading,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useVisibilityChange } from 'use-visibility-change';
import { ConfirmDeleteDetailModal, Loading } from 'components/common';
import { Details } from 'components/screens';
import { sortFields } from 'fields';
import { getTrip, removeDetail } from 'services';
import * as state from 'store';
import { createItineraryItems, tripDates } from 'utils';

export default function ItineraryPage() {
  const onShow = () => {
    setAccordionKey(accordionKey + 1);
  };
  useVisibilityChange({ onShow });
  const currentTrip = useRecoilValue(state.currentTrip);
  const currentTripKey = useRecoilValue(state.currentTripKey);
  const currentTripIndex = useRecoilValue(state.currentTripIndex);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(true);
  const [rowIndex, setRowIndex] = useState(null);
  const [currentKey, setCurrentKey] = useState(null);
  const [accordionKey, setAccordionKey] = useState(12345);
  const [data, setData] = useRecoilState(state.itineraryData);
  const userId = useRecoilValue(state.userId);
  /*  const sortField = sortFields[page];
   const first = sortField.first;
   const second = sortField.second; */

  useEffect(() => {
    getTrip(userId, currentTripKey).then(data => {
      let dateArray = tripDates(data.bstart_Date, data.cend_Date);
      console.log(
        '🚀 ~ file: ItineraryPage.js ~ line 42 ~ getTrip ~ dateArray',
        dateArray
      );
      let activityArray = [];
      for (const [key, value] of Object.entries(data.details.activity)) {
        let detailObject = value;
        detailObject.key = key;
        detailObject.type = 'activity';
        activityArray.push(detailObject);
      }
      console.log(
        '🚀 ~ file: ItineraryPage.js ~ line 44 ~ getTrip ~ activityArray',
        activityArray
      );

      let carArray = [];
      for (const [key, value] of Object.entries(data.details.car)) {
        let detailObject = value;
        detailObject.key = key;
        detailObject.type = 'car';
        carArray.push(detailObject);
      }
      console.log(
        '🚀 ~ file: ItineraryPage.js ~ line 44 ~ getTrip ~ carArray',
        carArray
      );

      let noteArray = [];
      for (const [key, value] of Object.entries(data.details.note)) {
        let detailObject = value;
        detailObject.key = key;
        detailObject.type = 'note';
        carArray.push(detailObject);
      }
      console.log(
        '🚀 ~ file: ItineraryPage.js ~ line 44 ~ getTrip ~ noteArray',
        noteArray
      );

      let roomArray = [];
      for (const [key, value] of Object.entries(data.details.room)) {
        let detailObject = value;
        detailObject.key = key;
        detailObject.type = 'room';
        roomArray.push(detailObject);
      }
      console.log(
        '🚀 ~ file: ItineraryPage.js ~ line 44 ~ getTrip ~ roomArray',
        roomArray
      );

      let travelArray = [];
      for (const [key, value] of Object.entries(data.details.travel)) {
        let detailObject = value;
        detailObject.key = key;
        detailObject.type = 'travel';
        travelArray.push(detailObject);
      }
      console.log(
        '🚀 ~ file: ItineraryPage.js ~ line 44 ~ getTrip ~ travelArray',
        travelArray
      );
      setData([
        [dateArray],
        [activityArray],
        [carArray],
        [noteArray],
        [roomArray],
        [travelArray],
      ]);
      setLoading(false);
    });
  }, [currentTripKey, setData, userId]);

  /* return (
    <>
      {currentTripIndex > -1 ? (
        <Box>
          <Container>
            <Center>
              <VStack gap={5}>
                <Heading>Itinerary for {currentTrip.atrip_Name}</Heading>
                <Heading>Under Construction</Heading>
              </VStack>
            </Center>
          </Container>
        </Box>
      ) : (
        <Navigate to="/pages/trip" />
      )}
    </>
  ); */

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

  const items = createItineraryItems(data, showModal);

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
