export const room = {
  place: '',
  shortName: '',
  longName: '',
  notes: '',
  source: '',
  address: '',
  contact: '',
  phone: '',
  email: '',
  website: '',
  checkIn: '',
  checkOut: '',
  reserved: '',
  confirmation: '',
  currency: '',
  cost: '',
  paidWithRes: '',
  damageDeposit: '',
  cancellable: '',
};

/* export const trip = {
  name: '',
  trip: {
    activity: [{ place: '', notes: '', date: '' }],
    car: [
      {
        notes: '',
        pickupDate: '',
        returnDate: '',
        pickupLocation: '',
        returnLocation: '',
      },
    ],
    room: [
      {
        place: '',
        shortName: '',
        longName: '',
        notes: '',
        source: '',
        address: '',
        contact: '',
        phone: '',
        email: '',
        website: '',
        checkIn: '',
        checkOut: '',
        reserved: '',
        confirmation: '',
        currency: '',
        cost: '',
        paidWithRes: '',
        damageDeposit: '',
        cancellable: '',
      },
    ],
    travel: [{ notes: '', date: '' }],
  },
}; */

export const trip = {
  name: '',
  trip: {
    activity: [],
    car: [],
    room: [],
    travel: [],
  },
};

export const activity = {
  place: '',
  notes: '',
  date: '',
};

export const travel = {
  notes: '',
  date: '',
};

export const car = {
  notes: '',
  pickupDate: '',
  returnDate: '',
  pickupLocation: '',
  returnLocation: '',
};
