 trip,
  place,
  shortName,
  longName,
  notes,
  source,
  address,
  contact,
  phone,
  email,
  website,
  checkIn,
  checkOut,
  reserved,
  confirmation,
  currency,
  cost,
  paidWithRes,
  damageDeposit,
  cancellable */
) {
  //get the arguments values
  let argValues = Object.values(arguments)
  //remove the userId
  argValues.shift()
  const aMap = new Map()
  argValues.forEach(item => aMap.set(item, item))