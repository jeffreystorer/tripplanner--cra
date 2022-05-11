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

export function addItem(userId, data) {
  push(ref(db, `/${userId}/`), data);
}

export function getItems(userId) {
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

export function deleteItem(userId, key) {
  remove(child(dbRef, `/${userId}/` + key));
}

export function updateItem(userId, key, data) {
  const updates = {};
  updates[`/${userId}/` + key] = data;
  return update(dbRef, updates);
}
