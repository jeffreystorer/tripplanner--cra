import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { AddEdit } from 'components/screens';
import { fields } from 'fields';
import { updateDetail, updateTrip } from 'services';
import * as state from 'store';
import 'styles/App.css';

export default function EditPage({ page }) {
  const navigate = useNavigate();
  const { rowIndex } = useParams();
  const [data, setData] = useState(fields[page]);
  const allData = useRecoilValue(state.data);
  const userId = useRecoilValue(state.userId);
  const tripKey = useRecoilValue(state.currentTripKey);

  useEffect(() => {
    setData(allData[rowIndex]);
    console.log(allData[rowIndex]);
  }, [allData, rowIndex]);

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
          updateTrip(userId, tripKey, data.values);
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
      data={data}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      handleClickCancel={handleClickCancel}
    />
  );
}
