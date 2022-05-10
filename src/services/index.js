import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  child,
  get,
  push,
  ref,
  remove,
  update,
} from 'firebase/database';
import { firebaseConfig } from 'firebaseConfig';

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbRef = ref(db);

export function addRoom(
  userId,
  trip,
  place,
  shortName,
  longName,
  notes,
  source,
  address,
  contact,
  phone,
  email,
  website,
  inDate,
  inTime,
  outDate,
  outTime,
  reserved,
  confirmation,
  currency,
  cost,
  paidWithRes,
  damageDeposit,
  cancellable
) {
  const roomData = {
    type: 'room',
    trip: trip,
    place: place,
    shortName: shortName,
    longName: longName,
    notes: notes,
    source: source,
    address: address,
    contact: contact,
    phone: phone,
    email: email,
    website: website,
    inDate: inDate,
    inTime: inTime,
    outDate: outDate,
    outTime: outTime,
    reserved: reserved,
    confirmation: confirmation,
    currency: currency,
    cost: cost,
    paidWithRes: paidWithRes,
    damageDeposit: damageDeposit,
    cancellable: cancellable,
  };
  push(ref(db, `/${userId}/`), roomData);
}

export function addCC(userId, name, number, expiration, cvc, notes) {
  const creditCardData = {
    type: 'cc',
    name: name,
    number: number,
    expiration: expiration,
    cvc: cvc,
    notes: notes,
  };
  push(ref(db, `/${userId}/`), creditCardData);
}

export function getItems(userId) {
  let passwords = get(child(dbRef, `/${userId}/`))
    .then(snapshot => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log('No data available');
        return {};
      }
    })
    .catch(error => {
      console.error(error);
    });
  return passwords;
}

export function deleteItem(userId, key) {
  remove(child(dbRef, `/${userId}/` + key));
}

export function updatePW(userId, key, name, url, username, password, notes) {
  const passwordData = {
    name: name,
    url: url,
    username: username,
    password: password,
    notes: notes,
  };
  const updates = {};
  updates[`/${userId}/` + key] = passwordData;
  return update(dbRef, updates);
}

export function updateCC(userId, key, name, number, expiration, cvc, notes) {
  const creditCardData = {
    type: 'cc',
    name: name,
    number: number,
    expiration: expiration,
    cvc: cvc,
    notes: notes,
  };
  const updates = {};
  updates[`/${userId}/` + key] = creditCardData;
  return update(dbRef, updates);
}
