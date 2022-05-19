import { Itinerary } from 'components/accordions';

export default function createItineraryItems(data, showModal) {
  return <Itinerary data={data} showModal={showModal} />;
}
