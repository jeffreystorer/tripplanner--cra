import { useEffect, useState } from 'react';
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
      console.log(
        '🚀 ~ file: ItineraryPage.js ~ line 39 ~ getTrip ~ data',
        data
      );
      let activityArray = [];
      for (const [key, value] of Object.entries(data.details.activity)) {
        let activityObject = value;
        activityObject.key = key;
        activityArray.push(activityObject);
      }
      console.log(
        '🚀 ~ file: ItineraryPage.js ~ line 44 ~ getTrip ~ activityArray',
        activityArray
      );

      let carArray = [];
      for (const [key, value] of Object.entries(data.details.car)) {
        let carObject = value;
        carObject.key = key;
        carArray.push(carObject);
      }
      console.log(
        '🚀 ~ file: ItineraryPage.js ~ line 44 ~ getTrip ~ carArray',
        carArray
      );

      let roomArray = [];
      for (const [key, value] of Object.entries(data.details.room)) {
        let roomObject = value;
        roomObject.key = key;
        roomArray.push(roomObject);
      }
      console.log(
        '🚀 ~ file: ItineraryPage.js ~ line 44 ~ getTrip ~ roomArray',
        roomArray
      );

      let travelArray = [];
      for (const [key, value] of Object.entries(data.details.travel)) {
        let travelObject = value;
        travelObject.key = key;
        travelArray.push(travelObject);
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
