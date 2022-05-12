import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Activity, Car, Room, Travel, Trip } from 'components/screens';
import * as dataObject from 'dataObjects';
import { addDetail, addTrip } from 'services';
import * as state from 'store';
import 'styles/App.css';

export default function AddPage({ page }) {
  const navigate = useNavigate();
  const [data, setData] = useState(dataObject[page]);
  const userId = useRecoilValue(state.userId);
  const key = useRecoilValue(state.currentTripKey);

  const handleChange = e => {
    setData({ ...data, name: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      switch (page) {
        case 'trip':
          addTrip(userId, data);
          break;
        default:
          addDetail(userId, key, data, page);
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

  switch (page) {
    case 'activity':
      return (
        <Activity
          data={data}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleClickCancel={handleClickCancel}
        />
      );
    case 'car':
      return (
        <Car
          data={data}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleClickCancel={handleClickCancel}
        />
      );
    case 'room':
      return (
        <Room
          data={data}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleClickCancel={handleClickCancel}
        />
      );
    case 'travel':
      return (
        <Travel
          data={data}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleClickCancel={handleClickCancel}
        />
      );
    case 'trip':
      return (
        <Trip
          data={data}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleClickCancel={handleClickCancel}
        />
      );
    default:
      break;
  }
}
