import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Itinerary } from 'components/screens';
import * as state from 'store';
import { createItineraryItems } from 'utils';

const ItineraryPage = () => {
  const navigate = useNavigate();
  const COLS = useRecoilValue(state.columns);
  const currentTripIndex = useRecoilValue(state.currentTripIndex);
  const currentTrip = useRecoilValue(state.currentTrip);
  const data = useRecoilValue(state.itineraryData);
  const setItineraryDetailToEdit = useSetRecoilState(
    state.itineraryDetailToEdit
  );

  useEffect(() => {
    if (currentTripIndex === -1) navigate('/pages/trip');
  }, [currentTripIndex, navigate]);

  function onClick(e) {
    e.preventDefault();
    let detail = {
      page: e.target.name,
      key: e.target.id,
    };
    setItineraryDetailToEdit(detail);
    navigate('/pages/edititinerary');
  }

  const items = createItineraryItems(COLS, data, onClick);

  return <Itinerary items={items} currentTripName={currentTrip.atrip_Name} />;
};

export default ItineraryPage;
