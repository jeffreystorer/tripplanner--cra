import { Td, Tr } from '@chakra-ui/react';
import Textarea from 'react-expanding-textarea';
import { dowMonthDayFromStr, stayDates } from 'utils';

export default function createItineraryItems(data) {
  const COLS = '100';
  const dates = data.dates;
  const activities = data.activities;
  const cars = data.cars;
  const notes = data.notes;
  const rooms = data.rooms;
  const travels = data.travels;

  let items = [];
  if (notes) {
    items.push(
      <Tr>
        <Td fontWeight="bold">Trip Notes:</Td>
      </Tr>
    );
    notes.forEach(pushNotes);
  }

  function pushNotes(item) {
    items.push(
      <Tr>
        <Td>
          <Textarea cols={COLS} readOnly="true" value={item.anote} />
        </Td>
      </Tr>
    );
  }

  dates.forEach(pushDateGroup);

  function pushDateGroup(item) {
    pushDate(item);
    pushRoomsCheckOut(item);
    pushCarsDropOff(item);
    pushTravels(item);
    pushCarsPickUp(item);
    pushActivities(item);
    pushRoomsCheckIn(item);
    pushRoomsStay(item);
  }

  function pushDate(item) {
    items.push(
      <Tr>
        <Td fontWeight="bold">{dowMonthDayFromStr(item, 'long')}</Td>
      </Tr>
    );
  }

  function pushActivities(item) {
    const todaysActivities = activities.filter(obj => {
      return obj.astart_Date === item;
    });
    todaysActivities.forEach(pushActivity);
  }

  function pushActivity(item) {
    items.push(
      <Tr>
        <Td>
          <Textarea cols={COLS} readOnly="true" value={item.bdetails} />
        </Td>
      </Tr>
    );
  }

  function pushCarsDropOff(item) {
    const todaysCars = cars.filter(obj => {
      return obj.bend.substring(0, 10) === item;
    });
    todaysCars.forEach(pushCarDropOff);
  }

  function pushCarDropOff(item) {
    items.push(
      <Tr>
        <Td>
          <Textarea
            cols={COLS}
            readOnly="true"
            value={`Drop Off Car: ${item.bend.substring(11)} ${item.cagency}, ${
              item.fdrop_Off_Location
            }`}
          />
        </Td>
      </Tr>
    );
  }

  function pushCarsPickUp(item) {
    const todaysCars = cars.filter(obj => {
      return obj.astart.substring(0, 10) === item;
    });
    todaysCars.forEach(pushCarPickUp);
  }

  function pushCarPickUp(item) {
    items.push(
      <Tr>
        <Td>
          <Textarea
            cols={COLS}
            readOnly="true"
            value={`Pick Up Car: ${item.astart.substring(11)} ${
              item.cagency
            }, ${item.dpick_Up_Location}, ${item.edetails}`}
          />
        </Td>
      </Tr>
    );
  }

  function pushTravels(item) {
    const todaysTravels = travels.filter(obj => {
      return obj.astart.substring(0, 10) === item;
    });
    todaysTravels.forEach(pushTravel);
  }

  function pushTravel(item) {
    items.push(
      <Tr>
        <Td>
          {item.astart.substring(11)}
          {' -> '}
          {dowMonthDayFromStr(item.astart, 'short') !==
            dowMonthDayFromStr(item.bend, 'short') &&
            dowMonthDayFromStr(item.bend, 'short') + '  '}
          {item.bend.substring(11)}
          {'  '}
          {item.cdetails}
        </Td>
      </Tr>
    );
  }

  function pushRoomsCheckOut(item) {
    const todaysRooms = rooms.filter(obj => {
      return obj.bend_Date === item;
    });
    todaysRooms.forEach(pushRoomCheckOut);
  }

  function pushRoomCheckOut(item) {
    items.push(
      <Tr>
        <Td>
          {'Check Out from Hotel: '}
          {item.croom}
        </Td>
      </Tr>
    );
  }

  function pushRoomsCheckIn(item) {
    const todaysRooms = rooms.filter(obj => {
      return obj.astart_Date === item;
    });
    todaysRooms.forEach(pushRoomCheckIn);
  }

  function pushRoomCheckIn(item) {
    items.push(
      <Tr>
        <Td>
          {'Check In to Hotel: '}
          {item.croom}
          {', '}
          {item.ddetails}
        </Td>
      </Tr>
    );
  }

  function pushRoomsStay(item) {
    console.log(
      '🚀 ~ file: createItineraryItems.js ~ line 175 ~ pushRoomsStay ~ item',
      item
    );
    const todaysRooms = rooms.filter(obj => {
      return obj.astart_Date === item;
    });
    todaysRooms.forEach(pushRoomStays);
  }
  function pushRoomStays(item) {
    console.log(
      '🚀 ~ file: createItineraryItems.js ~ line 182 ~ pushRoomStays ~ item',
      item
    );
    const stays = stayDates(item.astart_Date, item.bend_Date);
    console.log(
      '🚀 ~ file: createItineraryItems.js ~ line 190 ~ pushRoomStays ~ stays',
      stays
    );
    console.log(
      '🚀 ~ file: createItineraryItems.js ~ line 195 ~ pushRoomStays ~ stays.includes(item)',
      stays.includes(item)
    );
    if (stays.includes(item)) pushRoomStay(item);
  }

  function pushRoomStay(item) {
    console.log(
      '🚀 ~ file: createItineraryItems.js ~ line 192 ~ pushRoomStay ~ item',
      item
    );
    items.push(
      <Tr>
        <Td>
          {'Continue Stay at Hotel: '}
          {item.croom}
        </Td>
      </Tr>
    );
  }
  return items;
}
