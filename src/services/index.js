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

export function addTrip(userId, data) {
  const newTripKey = push(child(ref(db), `/${userId}/`)).key;
  const updates = {};
  updates[`/${userId}/${newTripKey}`] = data;
  return update(dbRef, updates);
}

export function addDetail(userId, key, data, page) {
  const newDetailKey = push(
    child(dbRef, `/${userId}/${key}/details/${page}`)
  ).key;
  const updates = {};
  updates[`/${userId}/${key}/details/${page}/${newDetailKey}`] = data;
  return update(dbRef, updates);
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

export function removeTrip(userId, key) {
  remove(child(dbRef, `/${userId}/` + key));
}

export const removeAll = userId => {
  remove(ref(db, `/${userId}/`));
};
