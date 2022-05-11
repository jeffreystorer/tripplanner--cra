import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Activity, RentalCar, Room, Transport, Trip } from 'components/screens';
import * as dataObject from 'dataObjects';
import { addItem } from 'services';
import * as state from 'store';
import 'styles/App.css';

export default function AddPage({ page }) {
  const navigate = useNavigate();
  const [data, setData] = useState(dataObject[page]);
  const userId = useRecoilValue(state.userId);

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      addItem(userId, data);
      navigate('/pages/' + page);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickCancel = () => {
    navigate('/pages/' + page);
  };

  const properties = {
    data: data,
    handleSubmit: handleSubmit,
    handleChange: handleChange,
    handleClickCancel: handleClickCancel,
  };

  function Page({ aPage }) {
    const pages = {
      activity: <Activity {...properties} />,
      rentalcar: <RentalCar {...properties} />,
      room: <Room {...properties} />,
      transport: <Transport {...properties} />,
      trip: <Trip {...properties} />,
    };
    return pages[aPage];
  }

  return <Page aPage={page} />;
}
