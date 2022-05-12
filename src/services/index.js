import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  child,
  get,
  push,
  ref,
  remove,
  set,
  update,
} from 'firebase/database';
import { firebaseConfig } from 'firebaseConfig';

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbRef = ref(db);

export function addTrip(userId, data) {
  push(ref(db, `/${userId}/`), data);
}

export function addDetail(userId, key, data, page) {
  let currentTrip = getTrips(userId, key);
  console.log(
    '🚀 ~ file: index.js ~ line 24 ~ addDetail ~ currentTrip',
    currentTrip
  );
  if ('trip' in currentTrip === false || page in currentTrip.trip === false) {
    currentTrip.trip = { [page]: [] };
  }
  currentTrip.trip[page].push(data);
  console.log(
    '🚀 ~ file: index.js ~ line 27 ~ addDetail ~ currentTrip',
    currentTrip
  );
  debugger;
  set(ref(db, `/${userId}/` + key), currentTrip);
}

export function getTrips(userId, key) {
  let items = get(child(dbRef, `/${userId}/` + key))
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
  return items;
}

export function deleteTrip(userId, key) {
  remove(child(dbRef, `/${userId}/` + key));
}

export function updateTrip(userId, key, data) {
  const updates = {};
  updates[`/${userId}/` + key] = data;
  return update(dbRef, updates);
}

export const removeAll = userId => {
  remove(dbRef, `/${userId}/`);
};
