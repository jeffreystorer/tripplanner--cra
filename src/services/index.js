import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  child,
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

export function addDetail(userId, currentTripKey, data, page) {
  const newDetailKey = push(
    child(dbRef, `/${userId}/${currentTripKey}/details/${page}`)
  ).key;
  const updates = {};
  updates[`/${userId}/${currentTripKey}/details/${page}/${newDetailKey}`] =
    data;
  return update(dbRef, updates);
}

export function removeDetail(userId, currentTripKey, page, key) {
  remove(child(dbRef, `/${userId}/${currentTripKey}/details/` + key));
}

export function removeTrip(userId, key) {
  remove(child(dbRef, `/${userId}/` + key));
}

export const removeAll = userId => {
  remove(ref(db, `/${userId}/`));
};
