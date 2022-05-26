import { useState } from 'react';
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
  const navigate = useNavigate();
  const [data, setData] = useState(fields[page]);
  const userId = useRecoilValue(state.userId);
  const currentTripKey = useRecoilValue(state.currentTripKey);
  const resetCurrentTripIndex = useResetRecoilState(state.currentTripIndex);
  const refreshTripData = useRecoilRefresher_UNSTABLE(state.tripData);
  const refreshDetailData = useRecoilRefresher_UNSTABLE(state.detailData(page));

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      switch (page) {
        case 'trip':
          addTrip(userId, data);
          resetCurrentTripIndex();
          refreshTripData();
          navigate('/pages/trip');
          break;
        default:
          addDetail(userId, currentTripKey, data, page);
          refreshDetailData();
          break;
      }
      navigate('/pages/' + page);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickCancel = () => {
    navigate('/pages/' + page);
  };

  return (
    <AddEdit
      mode={'New'}
      data={data}
      page={page}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      handleClickCancel={handleClickCancel}
    />
  );
}
