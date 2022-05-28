import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import { Itinerary } from 'components/screens';
import * as state from 'store';
import { createItineraryItems } from 'utils';

export default function ItineraryPage() {
  const navigate = useNavigate();
  const COLS = useRecoilValue(state.columns);
  const currentTripIndex = useRecoilValue(state.currentTripIndex);
  const currentTrip = useRecoilValue(state.currentTrip);
  const data = useRecoilValue(state.itineraryData);
  const setItineraryDetail = useSetRecoilState(state.itineraryDetail);
  const refreshItineraryData = useRecoilRefresher_UNSTABLE(state.itineraryData);
  const PERCENT = useRecoilValue(state.screenWidthPercent);
  const setItineraryDateTime = useSetRecoilState(state.itineraryDateTime);

  useEffect(() => {
    if (currentTripIndex === -1) navigate('/pages/trip');
  }, [currentTripIndex, navigate]);

  useEffect(() => {
    refreshItineraryData();
  }, [refreshItineraryData]);

  function onClick(e) {
    e.preventDefault();
    let detail = {
      page: e.target.name,
      key: e.target.id,
      value: e.target.value,
    };
    setItineraryDetail(detail);
    navigate('/pages/itinerarydetail');
  }

  function handleDetailClick(date, page, e) {
    e.preventDefault();
    setItineraryDateTime(date + 'T00:00');
    navigate('/pages/additinerary' + page);
  }

  const items = createItineraryItems(COLS, data, onClick, handleDetailClick);

  return (
    <Itinerary
      PERCENT={PERCENT}
      items={items}
      currentTripName={currentTrip.atrip_Name}
    />
  );
}
