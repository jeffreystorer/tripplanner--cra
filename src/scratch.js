const { dataAttr } = require('@chakra-ui/utils');

const fields = [
  'trip',
  'place',
  'shortName',
  'longName',
  'notes',
  'source',
  'address',
  'contact',
  'phone',
  'email',
  'website',
  'inDate',
  'inTime',
  'outDate',
  'outTime',
  'reserved',
  'currency',
  'cost',
  idWithRes',
  'damageDeposit',
  'cancellable',
];

let keyValPairs = fields.map(
  field =>
    `<FormLabel htmlFor='${field}'>${
      field[0].toUpperCase() + field.substring(1)
    }</FormLabel>
    <Input
autoComplete='${field}'
id='${field}'
type='text'
      value={data.${field}}
      onChange={handleChange}
    />`
);
console.log(keyValPairs);

    <FormLabel htmlFor='trip'>Trip</FormLabel>
    <Input
      autoComplete='trip'
      id='trip'
      type='text'
      value={data.trip}
      onChange={handleChange}
    />
    <FormLabel htmlFor='place'>Place</FormLabel>
    <Input
      autoComplete='place'
      id='place'
      type='text'
      value={data.place}
      onChange={handleChange}
    />
    <FormLabel htmlFor='shortName'>Short Name</FormLabel>
    <Input
      autoComplete='shortName'
      id='shortName'
      type='text'
      value={data.shortName}
      onChange={handleChange}
    />
    <FormLabel htmlFor='longName'>Long Name</FormLabel>
    <Input
      autoComplete='longName'
      id='longName'
      type='text'
      value={data.longName}
      onChange={handleChange}
    />
    <FormLabel htmlFor='notes'>Notes</FormLabel>
    <Input
      autoComplete='notes'
      id='notes'
      type='text'
      value={data.notes}
      onChange={handleChange}
    />
    <FormLabel htmlFor='source'>Source</FormLabel>
    <Input
      autoComplete='source'
      id='source'
      type='text'
      value={data.source}
      onChange={handleChange}
    />
    <FormLabel htmlFor='address'>Address</FormLabel>
    <Input
      autoComplete='address'
      id='address'
      type='text'
      value={data.address}
      onChange={handleChange}
    />
    <FormLabel htmlFor='contact'>Contact</FormLabel>
    <Input
      autoComplete='contact'
      id='contact'
      type='text'
      value={data.contact}
      onChange={handleChange}
    />
    <FormLabel htmlFor='phone'>Phone</FormLabel>
    <Input
      autoComplete='phone'
      id='phone'
      type='text'
      value={data.phone}
      onChange={handleChange}
    />
    <FormLabel htmlFor='email'>Email</FormLabel>
    <Input
      autoComplete='email'
      id='email'
      type='text'
      value={data.email}
      onChange={handleChange}
    />
    <FormLabel htmlFor='website'>Website</FormLabel>
    <Input
      autoComplete='website'
      id='website'
      type='text'
      value={data.website}
      onChange={handleChange}
    />
    <FormLabel htmlFor='inDate'>In Date</FormLabel>
    <Input
      autoComplete='inDate'
      id='inDate'
      type='text'
      value={data.inDate}
      onChange={handleChange}
    />
    <FormLabel htmlFor='inTime'>In Time</FormLabel>
    <Input
      autoComplete='inTime'
      id='inTime'
      type='text'
      value={data.inTime}
      onChange={handleChange}
    />
    <FormLabel htmlFor='outDate'>Out Date</FormLabel>
    <Input
      autoComplete='outDate'
      id='outDate'
      type='text'
      value={data.outDate}
      onChange={handleChange}
    />
    <FormLabel htmlFor='outTime'>Out Time</FormLabel>
    <Input
      autoComplete='outTime'
      id='outTime'
      type='text'
      value={data.outTime}
      onChange={handleChange}
    />
    <FormLabel htmlFor='reserved'>Reserved</FormLabel>
    <Input
      autoComplete='reserved'
      id='reserved'
      type='text'
      value={data.reserved}
      onChange={handleChange}
    />
    <FormLabel htmlFor='currency'>Currency</FormLabel>
    <Input
      autoComplete='currency'
      id='currency'
      type='text'
      value={data.currency}
      onChange={handleChange}
    />
    <FormLabel htmlFor='cost'>Cost</FormLabel>
    <Input
      autoComplete='cost'
      id='cost'
      type='text'
      value={data.cost}
      onChange={handleChange}
    />
    <FormLabel htmlFor='paidWithRes' >Paid with Reservation</FormLabel>
    <Input
      autoComplete='paidWithRes'
      id='paidWithRes'
      type='text'
      value={data.paidWithRes}
      onChange={handleChange}
    />
    <FormLabel htmlFor='damageDeposit'>Damage Deposit</FormLabel>
    <Input
      autoComplete='damageDeposit'
      id='damageDeposit'
      type='text'
      value={data.damageDeposit}
      onChange={handleChange}
    />
    <FormLabel htmlFor='cancellable'>Cancellable</FormLabel>
    <Input
      autoComplete='cancellable'
      id='cancellable'
      type='text'
      value={data.cancellable}
      onChange={handleChange}
    />
