import { useRecoilValue } from 'recoil';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref } from 'firebase/database';
import { firebaseConfig } from 'firebaseConfig';
import { useList } from 'react-firebase-hooks/database';
import { Loading } from 'components/common';
import { DetailsPage } from 'pages';
import * as state from 'store';

export default function DetailsGatewayPage({ page }) {
  const userId = useRecoilValue(state.userId);
  const currentTripKey = useRecoilValue(state.currentTripKey);
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const path = `/${userId}/${currentTripKey}/details/${page}/`;
  const dbRef = ref(db, path);
  const [snapshots, loading, error] = useList(dbRef);

  if (error) return <strong>Error: {error}</strong>;
  if (loading) return <Loading />;
  return <>{snapshots && <DetailsPage snapshots={snapshots} page={page} />}</>;
}
