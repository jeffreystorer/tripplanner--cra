import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import * as _ from 'lodash';
import { Loading } from 'components/common';
import { AddEdit } from 'components/screens';
import { updateDetail, updateTrip } from 'services';
import * as state from 'store';
import 'styles/App.css';

export default function EditPage({ page }) {
  const navigate = useNavigate();
  const { rowIndex } = useParams();
  const detailData = useRecoilValue(state.detailData(page));
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const tripData = useRecoilValue(state.tripData);
  const userId = useRecoilValue(state.userId);
  const currentTripKey = useRecoilValue(state.currentTripKey);
  const setCurrentTrip = useSetRecoilState(state.currentTrip);
  const refreshTripData = useRecoilRefresher_UNSTABLE(state.tripData);
  const refreshDetailData = useRecoilRefresher_UNSTABLE(state.detailData(page));
  const refreshItineraryData = useRecoilRefresher_UNSTABLE(state.itineraryData);

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
    try {
      switch (page) {
        case 'trip':
          updateTrip(userId, currentTripKey, data);
          const { atrip_Name } = data;
          setCurrentTrip({ key: currentTripKey, atrip_Name });
          refreshTripData();
          break;
        default:
          const newData = _.cloneDeep(data);
          delete newData.key;
          updateDetail(userId, currentTripKey, newData, page, data.key);
          refreshItineraryData();
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
