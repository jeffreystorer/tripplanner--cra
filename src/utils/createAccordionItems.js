import { Activity, Car, Note, Room, Travel } from 'components/accordions';

export default function createCCAccordionItems(page, data, showModal) {
  console.log(
    '🚀 ~ file: createAccordionItems.js ~ line 4 ~ createCCAccordionItems ~ page',
    page
  );

  console.log(
    '🚀 ~ file: createAccordionItems.js ~ line 4 ~ createCCAccordionItems ~ data',
    data
  );

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
