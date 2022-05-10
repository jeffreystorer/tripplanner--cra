import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Room } from 'components/room';
import { addRoom } from 'services';
import * as state from 'store';
import 'styles/App.css';

export default function AddRoomPage() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    trip: '',
    place: '',
    shortName: '',
    longName: '',
    notes: '',
    source: '',
    address: '',
    contact: '',
    phone: '',
    email: '',
    website: '',
    inDate: '',
    inTime: '',
    outDate: '',
    outTime: '',
    reserved: '',
    confirmation: '',
    currency: '',
    cost: '',
    paidWithRes: '',
    damageDeposit: '',
    cancellable: '',
  });
  const userId = useRecoilValue(state.userId);

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      addRoom(
        userId,
        data.trip,
        data.place,
        data.shortName,
        data.longName,
        data.notes,
        data.source,
        data.address,
        data.contact,
        data.phone,
        data.email,
        data.website,
        data.inDate,
        data.inTime,
        data.outDate,
        data.outTime,
        data.reserved,
        data.confirmation,
        data.currency,
        data.cost,
        data.paidWithRes,
        data.damageDeposit,
        data.cancellable
      );
      navigate('/pages/room');
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickCancel = () => {
    navigate('/pages/room');
  };

  return (
    <Room
      mode="add"
      data={data}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      handleClickCancel={handleClickCancel}
    />
  );
}
