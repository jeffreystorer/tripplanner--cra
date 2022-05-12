import {
  Button,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Input,
  VStack,
} from '@chakra-ui/react';

export default function Room({
  data,
  handleSubmit,
  handleChange,
  handleClickCancel,
}) {
  return (
    <>
      <Container>
        <VStack gap={1}>
          <h2 className="text-center">New Room</h2>
          <FormControl>
            <FormLabel htmlFor="trip">Trip</FormLabel>
            <Input
              autoComplete="trip"
              name="trip"
              type="text"
              value={data.trip}
              onChange={e => handleChange(e)}
            />
            <FormLabel htmlFor="place">Place</FormLabel>
            <Input
              autoComplete="place"
              name="place"
              type="text"
              value={data.place}
              onChange={e => handleChange(e)}
            />
            <FormLabel htmlFor="shortName">Short Name</FormLabel>
            <Input
              autoComplete="shortName"
              name="shortName"
              type="text"
              value={data.shortName}
              onChange={e => handleChange(e)}
            />
            <FormLabel htmlFor="longName">Long Name</FormLabel>
            <Input
              autoComplete="longName"
              name="longName"
              type="text"
              value={data.longName}
              onChange={e => handleChange(e)}
            />
            <FormLabel htmlFor="notes">Notes</FormLabel>
            <Input
              autoComplete="notes"
              name="notes"
              type="text"
              value={data.notes}
              onChange={e => handleChange(e)}
            />
            <FormLabel htmlFor="source">Source</FormLabel>
            <Input
              autoComplete="source"
              name="source"
              type="text"
              value={data.source}
              onChange={e => handleChange(e)}
            />
            <FormLabel htmlFor="address">Address</FormLabel>
            <Input
              autoComplete="address"
              name="address"
              type="text"
              value={data.address}
              onChange={e => handleChange(e)}
            />
            <FormLabel htmlFor="contact">Contact</FormLabel>
            <Input
              autoComplete="contact"
              name="contact"
              type="text"
              value={data.contact}
              onChange={e => handleChange(e)}
            />
            <FormLabel htmlFor="phone">Phone</FormLabel>
            <Input
              autoComplete="phone"
              name="phone"
              type="text"
              value={data.phone}
              onChange={e => handleChange(e)}
            />
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              autoComplete="email"
              name="email"
              type="text"
              value={data.email}
              onChange={e => handleChange(e)}
            />
            <FormLabel htmlFor="website">Website</FormLabel>
            <Input
              autoComplete="website"
              name="website"
              type="text"
              value={data.website}
              onChange={e => handleChange(e)}
            />
            <HStack gap={2}>
              <FormLabel htmlFor="checkIn">In</FormLabel>
              <Input
                autoComplete="checkIn"
                name="checkIn"
                type="datetime-local"
                value={data.checkIn}
                onChange={e => handleChange(e)}
              />
              <FormLabel htmlFor="checkOut">Out</FormLabel>
              <Input
                autoComplete="checkOut"
                name="checkOut"
                type="datetime-local"
                value={data.checkOut}
                onChange={e => handleChange(e)}
              />
            </HStack>
            <FormLabel htmlFor="reserved">Reserved</FormLabel>
            <Input
              autoComplete="reserved"
              name="reserved"
              type="text"
              value={data.reserved}
              onChange={e => handleChange(e)}
            />
            <FormLabel htmlFor="confirmation">Confirmation</FormLabel>
            <Input
              autoComplete="confirmation"
              name="confirmation"
              type="text"
              value={data.confirmation}
              onChange={e => handleChange(e)}
            />
            <FormLabel htmlFor="currency">Currency</FormLabel>
            <Input
              autoComplete="currency"
              name="currency"
              type="text"
              value={data.currency}
              onChange={e => handleChange(e)}
            />
            <FormLabel htmlFor="cost">Cost</FormLabel>
            <Input
              autoComplete="cost"
              name="cost"
              type="text"
              value={data.cost}
              onChange={e => handleChange(e)}
            />
            <FormLabel htmlFor="paidWithRes">Paid with Reservation</FormLabel>
            <Input
              autoComplete="paidWithRes"
              name="paidWithRes"
              type="text"
              value={data.paidWithRes}
              onChange={e => handleChange(e)}
            />
            <FormLabel htmlFor="damageDeposit">Damage Deposit</FormLabel>
            <Input
              autoComplete="damageDeposit"
              name="damageDeposit"
              type="text"
              value={data.damageDeposit}
              onChange={e => handleChange(e)}
            />
            <FormLabel htmlFor="cancellable">Cancellable</FormLabel>
            <Input
              autoComplete="cancellable"
              name="cancellable"
              type="text"
              value={data.cancellable}
              onChange={e => handleChange(e)}
            />
          </FormControl>
          <br />
          <HStack gap={5}>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Save
            </Button>
            <Button colorScheme="gray" onClick={handleClickCancel}>
              Cancel
            </Button>
          </HStack>
        </VStack>
      </Container>
      <br />
      <br />
    </>
  );
}
