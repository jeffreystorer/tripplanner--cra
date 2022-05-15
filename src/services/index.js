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

export function updateTrip(userId, key, data) {
  const updates = {};
  updates[`/${userId}/${key}`] = data;
  return update(dbRef, updates);
}

export function updateDetail(userId, tripKey, data, page, detailKey) {
  const updates = {};
  updates[`/${userId}/${tripKey}/details/${page}/${detailKey}/`] = data;
  return update(dbRef, updates);
}

export function addDetail(userId, tripKey, data, page) {
  const newDetailKey = push(
    child(dbRef, `/${userId}/${tripKey}/details/${page}`)
  ).key;
  const updates = {};
  updates[`/${userId}/${tripKey}/details/${page}/${newDetailKey}`] = data;
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
