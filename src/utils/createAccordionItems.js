import { Activity, Car, Note, Room, Travel } from 'components/accordions';

export default function createAccordionItems(page, data, showModal) {
  switch (page) {
    case 'activity':
      return <Activity page={page} data={data} showModal={showModal} />;
    case 'car':
      return <Car page={page} data={data} showModal={showModal} />;
    case 'note':
      return <Note page={page} data={data} showModal={showModal} />;
    case 'room':
      return <Room page={page} data={data} showModal={showModal} />;
    case 'travel':
      return <Travel page={page} data={data} showModal={showModal} />;
    default:
      break;
  }
}
