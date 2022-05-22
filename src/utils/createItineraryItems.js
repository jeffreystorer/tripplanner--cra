import { Td, Tr } from '@chakra-ui/react';
import Textarea from 'react-expanding-textarea';
import { v4 as uuidv4 } from 'uuid';
import { dowMonthDayFromStr } from 'utils';

export default function createItineraryItems(COLS, data, onClick) {
  const LINE_HEIGHT = '1.2';
  const dates = data.dates;
  const activities = data.activities;
  const cars = data.cars;
  const notes = data.notes;
  const rooms = data.rooms;
  const travels = data.travels;

  let items = [];
  if (notes.length > 0) {
    items.push(
      <Tr key={uuidv4()}>
        <Td fontWeight="bold">Trip Notes:</Td>
      </Tr>
    );
    notes.forEach(pushNotes);
  }

  function pushNotes(item) {
    items.push(
      <Tr key={uuidv4()}>
        <Td>
          <Textarea
            id={`${item.key}`}
            name={`${item.type}`}
            onClick={onClick}
            style={{ lineHeight: LINE_HEIGHT }}
            cols={COLS}
            readOnly={true}
            value={item.anote}
          />
        </Td>
      </Tr>
    );
  }

  dates.forEach(pushDateGroup);

  function pushDateGroup(item) {
    pushDate(item);
    pushTravelsOvernight(item);
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
      <Tr key={uuidv4()}>
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
      <Tr key={uuidv4()}>
        <Td>
          <Textarea
            id={`${item.key}`}
            name={`${item.type}`}
            onClick={onClick}
            style={{ lineHeight: LINE_HEIGHT }}
            cols={COLS}
            readOnly={true}
            value={item.bdetails}
          />
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
      <Tr key={uuidv4()}>
        <Td>
          <Textarea
            id={`${item.key}`}
            name={`${item.type}`}
            onClick={onClick}
            style={{ lineHeight: LINE_HEIGHT }}
            cols={COLS}
            readOnly={true}
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
      <Tr key={uuidv4()}>
        <Td>
          <Textarea
            id={`${item.key}`}
            name={`${item.type}`}
            onClick={onClick}
            style={{ lineHeight: LINE_HEIGHT }}
            cols={COLS}
            readOnly={true}
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
    let arrDate = '';
    if (
      dowMonthDayFromStr(item.astart, 'short') !==
      dowMonthDayFromStr(item.bend, 'short')
    ) {
      arrDate = dowMonthDayFromStr(item.bend, 'short') + ' ';
    }
    items.push(
      <Tr key={uuidv4()}>
        <Td>
          <Textarea
            id={`${item.key}`}
            name={`${item.type}`}
            onClick={onClick}
            style={{ lineHeight: LINE_HEIGHT }}
            cols={COLS}
            readOnly={true}
            value={`${item.astart.substring(
              11
            )} -> ${arrDate}${item.bend.substring(11)}  ${item.cdetails}`}
          />
        </Td>
      </Tr>
    );
  }

  function pushTravelsOvernight(item) {
    const todaysTravels = travels.filter(obj => {
      return obj.dovernight_Arrival_Date === item;
    });
    todaysTravels.forEach(pushTravelOvernight);
  }

  function pushTravelOvernight(item) {
    items.push(
      <Tr key={uuidv4()}>
        <Td>
          <Textarea
            id={`${item.key}`}
            name={`${item.type}`}
            onClick={onClick}
            style={{ lineHeight: LINE_HEIGHT }}
            cols={COLS}
            readOnly={true}
            value={`Overnight Travel: ${dowMonthDayFromStr(
              item.astart,
              'short'
            )}  ${item.astart.substring(11)} -> ${item.bend.substring(11)}  ${
              item.cdetails
            }`}
          />
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
      <Tr key={uuidv4()}>
        <Td>
          <Textarea
            id={`${item.key}`}
            name={`${item.type}`}
            onClick={onClick}
            style={{ lineHeight: LINE_HEIGHT }}
            cols={COLS}
            readOnly={true}
            value={`Check Out: ${item.croom}`}
          />
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
      <Tr key={uuidv4()}>
        <Td>
          <Textarea
            id={`${item.key}`}
            name={`${item.type}`}
            onClick={onClick}
            style={{ lineHeight: LINE_HEIGHT }}
            cols={COLS}
            readOnly={true}
            value={`Check In: ${item.croom}, ${item.ddetails}`}
          />
        </Td>
      </Tr>
    );
  }

  function pushRoomsStay(item) {
    //item = a trip date 'yyyy-mm-dd'
    const todaysRooms = rooms.filter(obj => {
      return obj.fstay_Dates.includes(item);
    });
    todaysRooms.forEach(pushRoomStay);
  }

  function pushRoomStay(item) {
    // item == room object
    items.push(
      <Tr key={uuidv4()}>
        <Td>
          <Textarea
            id={`${item.key}`}
            name={`${item.type}`}
            onClick={onClick}
            style={{ lineHeight: LINE_HEIGHT }}
            cols={COLS}
            readOnly={true}
            value={`Continue Stay: ${item.croom}`}
          />
        </Td>
      </Tr>
    );
  }
  return items;
}
