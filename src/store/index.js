import { atom, selector } from 'recoil';
import { getTrips } from 'services';

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

export const tripData = selector({
  key: 'tripData',
  get: async ({ get }) => {
    const response = await getTrips(get(userId));
    if (response.error) {
      throw response.error;
    }
    let tripsArray = [];
    for (const [key, value] of Object.entries(response)) {
      tripsArray.push({
        key: key,
        atrip_Name: value.atrip_Name,
        bstart_Date: value.bstart_Date,
        cend_Date: value.cend_Date,
        details: value.details,
      });
    }
    tripsArray.sort((a, b) => (a.atrip_Name > b.atrip_Name ? 1 : -1));
    return tripsArray;
  },
  set: ({ set }, newValue) => set(),
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
