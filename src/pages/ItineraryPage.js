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
import { getTrip } from 'services';
import * as state from 'store';
import { createAccordionItems } from 'utils';

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
  const [data, setData] = useRecoilState(state.detailData);
  const userId = useRecoilValue(state.userId);
  /*  const sortField = sortFields[page];
   const first = sortField.first;
   const second = sortField.second; */

  useEffect(() => {
    getTrip(userId, currentTripKey).then(data => {
      //let dateArray = [];
      const startDate = data.bstart_Date;
      const start = new Date(startDate);
      const endDate = data.cend_Date;
      const end = new Date(endDate);
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

      /* let detailsArray = [];
      for (const [key, value] of Object.entries(data)) {
        let detailObject = value;
        detailObject.key = key;
        detailsArray.push(detailObject);
      }
      const sortedDetails = detailsArray.sort((a, b) => {
        const result = a[first].localeCompare(b[first]);
        return result !== 0 ? result : a[second].localeCompare(b[second]);
      });
      setData(sortedDetails);
      console.log(
        '🚀 ~ file: DetailsPage.js ~ line 43 ~ getDetails ~ sortedDetails',
        sortedDetails
      );

      setLoading(false); */
    });
  }, []);

  return (
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
  );

  /*   const handleDelete = () => {
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
*/
}
