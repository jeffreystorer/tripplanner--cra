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
