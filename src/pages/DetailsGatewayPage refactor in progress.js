import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Loading } from 'components/common';
import { DetailsPage } from 'pages';
import { getDetails } from 'services';
import * as state from 'store';

export default function DetailsGatewayPage({ page }) {
  console.log(
    '🚀 ~ file: DetailsGatewayPage.js ~ line 11 ~ DetailsGatewayPage ~ page ',
    page
  );
  const userId = useRecoilValue(state.userId);
  const currentTripKey = useRecoilValue(state.currentTripKey);
  const [loading, setLoading] = useState(true);
  let detailArray = [];

  useEffect(() => {
    getDetails(userId, currentTripKey, page).then(data => {
      console.log(
        '🚀 ~ file: DetailsGatewayPage.js ~ line 20 ~ getDetails ~ data',
        data
      );
      let detailArray = [];
      if (data) {
        for (const [key, value] of Object.entries(data)) {
          let detailObject = value;
          detailObject.key = key;
          detailArray.push(detailObject);
        }
      }
    });
    setLoading(false);
  }, [currentTripKey, page, userId]);

  if (loading) return <Loading />;
  console.log(
    '🚀 ~ file: DetailsGatewayPage.js ~ line 25 ~ getDetails ~ detailArray',
    detailArray
  );

  return (
    <>
      {detailArray.length > 0 && (
        <DetailsPage detailArray={detailArray} page={page} />
      )}
    </>
  );
}
