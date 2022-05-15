import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import * as _ from 'lodash';
import { AddEdit } from 'components/screens';
import { fields } from 'fields';
import { updateDetail, updateTrip } from 'services';
import * as state from 'store';
import 'styles/App.css';

export default function EditPage({ page }) {
  const navigate = useNavigate();
  const { rowIndex } = useParams();
  const [data, setData] =  useRecoilValue(state.data);
  const userId = useRecoilValue(state.userId);
  const tripKey = useRecoilValue(state.currentTripKey);
  const setCurrentTrip = useSetRecoilState(state.currentTrip);

   const handleChange = e => {
    let newValue = e.target.value;
    if (!newValue) newValue = '';
    let newData = _.cloneDeep(data);
    newData.values[e.target.name] = newValue;
    setData(newData);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('😊😊 data', data);
    try {
      switch (page) {
        case 'trip':
          updateTrip(userId, tripKey, data.values);
          const { atrip_Name } = data.values;
          setCurrentTrip({ key: tripKey, atrip_Name });
          break;
        default:
          updateDetail(userId, tripKey, data, page, data[rowIndex].key);
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
      mode={'Edit'}
      page={page}
      data={data[rowIndex]}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      handleClickCancel={handleClickCancel}
    />
  );
}
