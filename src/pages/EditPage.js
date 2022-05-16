import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import * as _ from 'lodash';
import { Loading } from 'components/common';
import { AddEdit } from 'components/screens';
import { fields } from 'fields';
import { updateDetail, updateTrip } from 'services';
import * as state from 'store';
import 'styles/App.css';

export default function EditPage({ page }) {
  const navigate = useNavigate();
  const { rowIndex } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(fields[page]);
  console.log('🚀 ~ file: EditPage.js ~ line 12 ~ EditPage ~ data', data);
  const detailData = useRecoilValue(state.detailData);
  const tripData = useRecoilValue(state.tripData);
  const userId = useRecoilValue(state.userId);
  const currentTripKey = useRecoilValue(state.currentTripKey);
  const setCurrentTrip = useSetRecoilState(state.currentTrip);

  useEffect(() => {
    switch (page) {
      case 'trip':
        setData(tripData[rowIndex]);
        break;
      default:
        setData(detailData[rowIndex]);
        break;
    }
    setLoading(false);
  }, [detailData, page, rowIndex, tripData]);

  const handleChange = e => {
    let newValue = e.target.value;
    if (!newValue) newValue = '';
    setData({ ...data, [e.target.name]: newValue });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    console.log('😊😊 data', data);
    try {
      switch (page) {
        case 'trip':
          updateTrip(userId, currentTripKey, data);
          const { atrip_Name } = data;
          setCurrentTrip({ key: currentTripKey, atrip_Name });
          break;
        default:
          const newData = _.cloneDeep(data);
          delete newData.key;
          updateDetail(userId, currentTripKey, newData, page, data.key);
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

  if (loading) return <Loading />;

  return (
    <AddEdit
      mode={'Edit'}
      page={page}
      data={data}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      handleClickCancel={handleClickCancel}
    />
  );
}
