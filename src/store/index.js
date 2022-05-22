import { atom } from 'recoil';
const localStorageEffect =
  key =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const screenWidthPercent = atom({
  key: 'screenWidthPercent',
  default: 100,
  effects: [localStorageEffect('screenWidthPercent')],
});

export const columns = atom({
  key: 'columns',
  default: 65,
  effects: [localStorageEffect('columns')],
});

export const tripData = atom({
  key: 'tripData',
  default: [],
});

export const currentTripData = atom({
  key: 'currentTripData',
  default: [],
});

export const detailData = atom({
  key: 'detailData',
  default: [],
});

export const itineraryData = atom({
  key: 'itineraryData',
  default: [],
});

export const itineraryDetailToEdit = atom({
  key: 'itineraryDetailToEdit',
  default: {},
});

export const userId = atom({
  key: 'userId',
  default: null,
  effects: [localStorageEffect('userId')],
});

export const currentTrip = atom({
  key: 'currentTrip',
  default: '',
});

export const currentTripKey = atom({
  key: 'currentTripKey',
  default: '',
});

export const currentTripIndex = atom({
  key: 'currentTripIndex',
  default: -1,
});
