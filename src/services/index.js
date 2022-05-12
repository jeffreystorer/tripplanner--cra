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
  push(ref(db, `/${userId}/`), data);
}

export function addDetail(userId, key, data, page) {
  push(ref(db, `/${userId}/` + key), data);
}

export function getTrips(userId) {
  let items = get(child(dbRef, `/${userId}/`))
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
