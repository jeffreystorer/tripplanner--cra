import { Container } from '@chakra-ui/react';
import { SavedTrips } from 'components/trip';
import { TitledBox } from 'components/common';

export default function SavedTripsBox({ snapshots }) {
  return (
    <Container>
      <TitledBox title={'Saved Trips'}>
        <SavedTrips snapshots={snapshots} />
      </TitledBox>
    </Container>
  );
}
