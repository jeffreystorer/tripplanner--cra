import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { DetailsDataFetch } from 'pages';
import * as state from 'store';

export default function DetailsGateway({ page }) {
  const currentTripIndex = useRecoilValue(state.currentTripIndex);
  return (
    <>
      {currentTripIndex > -1 ? (
        <DetailsDataFetch page={page} />
      ) : (
        <Navigate to="/pages/trip" />
      )}
    </>
  );
}
