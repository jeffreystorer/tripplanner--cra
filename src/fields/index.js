export const fields = {
  activity: {
    astart_Date: '',
    bdetails: '',
  },
  car: {
    astart: '',
    bend: '',
    cagency: '',
    dpick_Up_Location: '',
    edetails: '',
    fdrop_Off_Location: '',
  },
  note: {
    anotes: '',
  },
  room: {
    astart_Date: '',
    bend_Date: '',
    croom: '',
    ddetails: '',
  },
  travel: {
    astart: '',
    bend: '',
    cdetails: '',
  },
  trip: {
    atrip_Name: '',
    bstart_Date: '',
    cend_Date: '',
    details: '',
  },
};

export const inputType = {
  agency: 'text',
  date: 'date',
  details: 'textarea',
  drop_Off_Location: 'textarea',
  end: 'datetime-local',
  end_Date: 'date',
  notes: 'textarea',
  pick_Up_Location: 'textarea',
  room: 'text',
  start: 'datetime-local',
  start_Date: 'date',
  trip_Name: 'text',
};

export const labels = {
  activity: {
    astart_Date: 'aDate',
  },
  car: {
    astart: 'apick_Up_Date',
    bend: 'edrop_Off_Date',
  },
  note: {
    anotes: 'aNote',
  },
  room: {
    astart_Date: 'acheck_In',
    bend_Date: 'dcheck_Out',
  },
  travel: {
    astart: 'adeparture_Date',
    bend_Date: 'darrival_Date',
  },
  trip: {
    bstart_Date: 'astart_Date',
    cend_Date: 'eend_Date',
  },
};
