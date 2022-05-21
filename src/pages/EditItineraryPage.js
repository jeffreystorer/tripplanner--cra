import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import * as _ from 'lodash';
import { Loading } from 'components/common';
import { AddEdit } from 'components/screens';
import { updateDetail } from 'services';
import * as state from 'store';
import 'styles/App.css';

export default function EditItineraryPage() {
  const navigate = useNavigate();
  const detail = useRecoilValue(state.itineraryDetailToEdit);
  const tripData = useRecoilValue(state.tripData);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const userId = useRecoilValue(state.userId);
  const currentTripKey = useRecoilValue(state.currentTripKey);

  console.log('😊😊 tripData[0]', tripData[0]);
  console.log('😊😊 detail', detail);

  useEffect(() => {
    setData(tripData[0].details[detail.page][detail.key]);
    setLoading(false);
  }, [detail.key, detail.page, tripData]);

  const handleChange = e => {
    let newValue = e.target.value;
    if (!newValue) newValue = '';
    setData({ ...data, [e.target.name]: newValue });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const newData = _.cloneDeep(data);
      delete newData.key;
      updateDetail(userId, currentTripKey, newData, detail.page, detail.key);
      navigate('/pages/itinerary');
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickCancel = () => {
    navigate('/pages/itinerary');
  };

  if (loading) return <Loading />;

  return (
    <AddEdit
      mode={'Edit'}
      page={detail.page}
      data={data}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      handleClickCancel={handleClickCancel}
    />
  );
}
