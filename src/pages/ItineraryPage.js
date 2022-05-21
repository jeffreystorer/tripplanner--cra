import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Loading } from 'components/common';
import { Itinerary } from 'components/screens';
import { getTrip } from 'services';
import * as state from 'store';
import { createItineraryItems, stayDates, tripDates } from 'utils';

export default function ItineraryPage() {
  const navigate = useNavigate();
  const currentTrip = useRecoilValue(state.currentTrip);
  const currentTripKey = useRecoilValue(state.currentTripKey);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const userId = useRecoilValue(state.userId);
  const setItineraryDetailToEdit = useSetRecoilState(
    state.itineraryDetailToEdit
  );
  if (!currentTripKey) navigate('/pages/trip');

  useEffect(() => {
    getTrip(userId, currentTripKey).then(data => {
      //dates
      let dateArray = tripDates(data.bstart_Date, data.cend_Date);
      //activities
      let activityArray = [];
      for (const [key, value] of Object.entries(data.details.activity)) {
        let detailObject = value;
        detailObject.key = key;
        detailObject.type = 'activity';
        activityArray.push(detailObject);
      }
      //cars
      let carArray = [];
      for (const [key, value] of Object.entries(data.details.car)) {
        let detailObject = value;
        detailObject.key = key;
        detailObject.type = 'car';
        carArray.push(detailObject);
      }
      //notes
      let noteArray = [];
      for (const [key, value] of Object.entries(data.details.note)) {
        let detailObject = value;
        detailObject.key = key;
        detailObject.type = 'note';
        noteArray.push(detailObject);
      }
      //rooms
      let roomArray = [];
      for (const [key, value] of Object.entries(data.details.room)) {
        let detailObject = value;
        detailObject.key = key;
        detailObject.type = 'room';
        detailObject.fstay_Dates = stayDates(
          detailObject.astart_Date,
          detailObject.bend_Date
        );
        roomArray.push(detailObject);
      }
      //travels
      let travelArray = [];
      for (const [key, value] of Object.entries(data.details.travel)) {
        let detailObject = value;
        detailObject.key = key;
        detailObject.type = 'travel';
        detailObject.dovernight_Arrival_Date = '';
        if (
          detailObject.astart.substring(0, 10) !==
          detailObject.bend.substring(0, 10)
        ) {
          detailObject.dovernight_Arrival_Date = detailObject.bend.substring(
            0,
            10
          );
        }
        travelArray.push(detailObject);
      }
      //set data
      setData({
        dates: dateArray,
        activities: activityArray,
        cars: carArray,
        notes: noteArray,
        rooms: roomArray,
        travels: travelArray,
      });
      setLoading(false);
    });
  }, [currentTripKey, setData, userId]);

  function onClick(e) {
    e.preventDefault();
    let detail = {
      page: e.target.name,
      key: e.target.id,
    };
    setItineraryDetailToEdit(detail);
    navigate('/pages/edititinerary');
  }

  if (loading) return <Loading />;

  const items = createItineraryItems(data, onClick);

  return (
    <>
      <Itinerary items={items} currentTripName={currentTrip.atrip_Name} />
    </>
  );
}
