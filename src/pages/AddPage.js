import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilValue,
  useResetRecoilState,
} from 'recoil';
import { AddEdit } from 'components/screens';
import { fields } from 'fields';
import { addDetail, addTrip } from 'services';
import * as state from 'store';
import 'styles/App.css';

export default function AddPage({ page }) {
  let isItinerary = false;
  let addedPage = page;
  if (page.includes('itinerary')) {
    isItinerary = true;
    addedPage = page.substring(9);
  }
  const navigate = useNavigate();
  const [data, setData] = useState(fields[addedPage]);
  const userId = useRecoilValue(state.userId);
  const currentTripKey = useRecoilValue(state.currentTripKey);
  const resetCurrentTripIndex = useResetRecoilState(state.currentTripIndex);
  const refreshTripData = useRecoilRefresher_UNSTABLE(state.tripData);
  const refreshDetailData = useRecoilRefresher_UNSTABLE(
    state.detailData(addedPage)
  );
  const refreshItineraryData = useRecoilRefresher_UNSTABLE(state.itineraryData);
  const itineraryDateTime = useRecoilValue(state.itineraryDateTime);
  const itineraryDate = itineraryDateTime.substring(0, 10);

  useEffect(() => {
    if (isItinerary) {
      switch (addedPage) {
        case 'activity':
          setData({ ...data, astart_Date: itineraryDate });
          break;
        case 'car':
          setData({ ...data, astart: itineraryDateTime });
          break;
        case 'room':
          setData({ ...data, astart_Date: itineraryDate });
          break;
        case 'travel':
          setData({ ...data, astart: itineraryDateTime });
          break;
        default:
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addedPage, isItinerary, itineraryDate, itineraryDateTime]);

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      switch (addedPage) {
        case 'trip':
          addTrip(userId, data);
          resetCurrentTripIndex();
          refreshTripData();
          refreshDetailData();
          refreshItineraryData();
          navigate('/pages/trip');
          break;
        default:
          addDetail(userId, currentTripKey, data, addedPage);
          refreshTripData();
          refreshDetailData();
          refreshItineraryData();
          break;
      }
      if (isItinerary) {
        navigate('/pages/itinerary');
      } else {
        navigate('/pages/' + addedPage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickCancel = () => {
    if (isItinerary) {
      navigate('/pages/itinerary');
    } else {
      navigate('/pages/' + page);
    }
  };

  return (
    <AddEdit
      mode={'New'}
      data={data}
      page={addedPage}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      handleClickCancel={handleClickCancel}
    />
  );
}
