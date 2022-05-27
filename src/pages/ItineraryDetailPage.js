import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil';
import { useDisclosure } from '@chakra-ui/react';
import { ConfirmDeleteDetailModal } from 'components/common';
import { ItineraryDetail } from 'components/screens';
import { removeDetail } from 'services';
import * as state from 'store';

export default function ItineraryDetailsPage() {
  const navigate = useNavigate();
  const currentTrip = useRecoilValue(state.currentTrip);
  const currentTripKey = useRecoilValue(state.currentTripKey);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userId = useRecoilValue(state.userId);
  const itineraryDetail = useRecoilValue(state.itineraryDetail);
  const refreshDetailData = useRecoilRefresher_UNSTABLE(
    state.detailData(itineraryDetail.page)
  );
  const refreshItineraryData = useRecoilRefresher_UNSTABLE(state.itineraryData);
  const COLS = useRecoilValue(state.columns);
  const PERCENT = useRecoilValue(state.screenWidthPercent);

  useEffect(() => {
    refreshItineraryData();
  }, [refreshItineraryData]);

  const handleDelete = () => {
    try {
      removeDetail(
        userId,
        currentTripKey,
        itineraryDetail.page,
        itineraryDetail.key
      );
      refreshDetailData();
      refreshItineraryData();
    } catch (error) {
      console.log(error);
    }
    navigate(`/pages/itinerary`);
  };

  const showModal = () => {
    onOpen();
  };

  return (
    <>
      <ConfirmDeleteDetailModal
        page="itinerary"
        isOpen={isOpen}
        onClose={onClose}
        handleDelete={handleDelete}
      />
      <ItineraryDetail
        PERCENT={PERCENT}
        currentTripName={currentTrip.atrip_Name}
        COLS={COLS}
        itineraryDetail={itineraryDetail}
        showModal={showModal}
      />
    </>
  );
}
