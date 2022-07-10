import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Td,
  Tr,
} from '@chakra-ui/react';
import Textarea from 'react-expanding-textarea';
import { v4 as uuidv4 } from 'uuid';
import { dowMonthDayFromStr } from 'utils';

export default function createItineraryItems(
  COLS,
  data,
  onClick,
  handleDetailClick
) {
  const LINE_HEIGHT = '1.2';
  const dates = data.dates;
  const activities = data.activities;
  const cars = data.cars;
  const notes = data.notes;
  const rooms = data.rooms;
  const travels = data.travels;
  const padding = '.5rem 0 1rem .5rem';

  function TextareaRow({ item, value }) {
    return (
      <Tr>
        <Td border="none" padding={padding}>
          <Textarea
            key={`${item.key}`}
            id={`${item.key}`}
            name={`${item.type}`}
            onClick={e => onClick(item, e)}
            style={{
              lineHeight: LINE_HEIGHT,
              outline: 'none',
              border: 'none',
              backgroundColor: 'transparent',
            }}
            cols={COLS}
            readOnly={true}
            value={value}
          />
        </Td>
      </Tr>
    );
  }

  let items = [];
  if (notes.length > 0) {
    items.push(
      <Tr key={uuidv4()}>
        <Td padding={padding} fontWeight="bold">
          Trip Notes:
        </Td>
      </Tr>
    );
    notes.forEach(pushNotes);
  }

  function pushNotes(item) {
    items.push(<TextareaRow key={uuidv4()} item={item} value={item.anote} />);
  }

  dates.forEach(pushDateGroup);

  function pushDateGroup(item) {
    pushDate(item);
    pushTravelsOvernight(item);
    pushRoomsStay(item);
    pushRoomsCheckOut(item);
    pushPreActivities(item);
    pushCarsDropOff(item);
    pushTravels(item);
    pushCarsPickUp(item);
    pushActivities(item);
    pushRoomsCheckIn(item);
    pushRoomsStay(item);
    pushPostActivities(item);
  }

  function pushDate(item) {
    items.push(
      <Tr key={uuidv4()} id={item}>
        <Td padding={padding} fontWeight="bold">
          <Menu>
            <MenuButton as={Text}>
              {dowMonthDayFromStr(item, 'long')}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={e => handleDetailClick(item, 'note', e)}>
                Add Trip Note
              </MenuItem>
              <MenuItem onClick={e => handleDetailClick(item, 'activity', e)}>
                Add Activity
              </MenuItem>
              <MenuItem onClick={e => handleDetailClick(item, 'car', e)}>
                Add Car
              </MenuItem>
              <MenuItem onClick={e => handleDetailClick(item, 'room', e)}>
                Add Room
              </MenuItem>
              <MenuItem onClick={e => handleDetailClick(item, 'travel', e)}>
                Add Travel
              </MenuItem>
            </MenuList>
          </Menu>
        </Td>
      </Tr>
    );
  }

  function pushPreActivities(item) {
    const todaysActivities = activities.filter(obj => {
      return obj.astart_Date === item && obj.bdetails.charAt(0) === '<';
    });
    todaysActivities.forEach(pushPreActivity);
  }

  function pushPreActivity(item) {
    items.push(
      <TextareaRow
        key={uuidv4()}
        item={item}
        value={item.bdetails.substring(1)}
      />
    );
  }

  function pushActivities(item) {
    const todaysActivities = activities.filter(obj => {
      return (
        obj.astart_Date === item &&
        obj.bdetails.charAt(0) !== '<' &&
        obj.bdetails.charAt(0) !== '>'
      );
    });
    todaysActivities.forEach(pushActivity);
  }

  function pushActivity(item) {
    items.push(
      <TextareaRow key={uuidv4()} item={item} value={item.bdetails} />
    );
  }

  function pushPostActivities(item) {
    const todaysActivities = activities.filter(obj => {
      return obj.astart_Date === item && obj.bdetails.charAt(0) === '>';
    });
    todaysActivities.forEach(pushPostActivity);
  }

  function pushPostActivity(item) {
    items.push(
      <TextareaRow
        key={uuidv4()}
        item={item}
        value={item.bdetails.substring(1)}
      />
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
      <TextareaRow
        key={uuidv4()}
        item={item}
        value={`Drop Off Car: ${item.bend.substring(11)} ${item.cagency}, ${
          item.fdrop_Off_Location
        }`}
      />
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
      <TextareaRow
        key={uuidv4()}
        item={item}
        value={`Pick Up Car: ${item.astart.substring(11)} ${item.cagency}, ${
          item.dpick_Up_Location
        }, ${item.edetails}`}
      />
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
      <TextareaRow
        key={uuidv4()}
        item={item}
        value={`${item.astart.substring(11)} -> ${arrDate}${item.bend.substring(
          11
        )}  ${item.cdetails}`}
      />
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
      <TextareaRow
        key={uuidv4()}
        item={item}
        value={`Overnight Travel: ${dowMonthDayFromStr(
          item.astart,
          'short'
        )}  ${item.astart.substring(11)} -> ${item.bend.substring(11)}  ${
          item.cdetails
        }`}
      />
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
      <TextareaRow
        key={uuidv4()}
        item={item}
        value={`Check Out: ${item.croom}`}
      />
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
      <TextareaRow
        key={uuidv4()}
        item={item}
        value={`Check In: ${item.croom}, ${item.ddetails}`}
      />
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
      <TextareaRow
        key={uuidv4()}
        item={item}
        value={`Continue Stay: ${item.croom}`}
      />
    );
  }
  return items;
}
