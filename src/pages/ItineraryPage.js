import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
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
  const [itineraryDetail, setItineraryDetail] = useRecoilState(
    state.itineraryDetail
  );
  const refreshItineraryData = useRecoilRefresher_UNSTABLE(state.itineraryData);
  const PERCENT = useRecoilValue(state.screenWidthPercent);
  const setItineraryDateTime = useSetRecoilState(state.itineraryDateTime);

  useEffect(() => {
    if (currentTripIndex === -1) navigate('/pages/trip');
  }, [currentTripIndex, navigate]);

  useEffect(() => {
    refreshItineraryData();
  }, [refreshItineraryData]);

  useEffect(() => {
    try {
      const node = document.getElementById(itineraryDetail.key);
      node.scrollIntoView({
        behavior: 'auto',
        block: 'start',
        inline: 'nearest',
      });
    } catch (error) {}
  });

  function onClick(item, e) {
    e.preventDefault();
    let detail = {
      page: e.target.name,
      key: e.target.id,
      value: e.target.value,
      date: Object.values(item)[0].substring(0, 10),
    };
    setItineraryDetail(detail);
    navigate('/pages/itinerarydetail');
  }

  function handleDetailClick(date, page, e) {
    e.preventDefault();
    let detail = {
      key: date,
    };
    setItineraryDetail(detail);
    setItineraryDateTime(date + 'T00:00');
    navigate('/pages/additinerary' + page);
  }

  function handleDateClick(e) {
    console.log(
      '🚀 ~ file: ItineraryPage.js ~ line 64 ~ handleDateClick ~ e',
      e
    );
  }

  const items = createItineraryItems(
    COLS,
    data,
    onClick,
    handleDetailClick,
    handleDateClick
  );

  return (
    <Itinerary
      PERCENT={PERCENT}
      items={items}
      currentTripName={currentTrip.atrip_Name}
    />
  );
}
