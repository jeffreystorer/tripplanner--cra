import { useRecoilValue } from 'recoil';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref } from 'firebase/database';
import { firebaseConfig } from 'firebaseConfig';
import { useList } from 'react-firebase-hooks/database';
import { Loading } from 'components/common';
import { DetailsPage } from 'pages';
import * as state from 'store';

export default function DetailsDataFetchPage({ page }) {
  console.log(
    '🚀 ~ file: DetailsDataFetch.js ~ line 11 ~ DetailsDataFetchPage ~ page',
    page
  );
  const userId = useRecoilValue(state.userId);
  const currentTripKey = useRecoilValue(state.currentTripKey);
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const path = `/${userId}/${currentTripKey}/details/${page}/`;
  console.log(
    '🚀 ~ file: DetailsDataFetch.js ~ line 17 ~ DetailsDataFetchPage ~ path',
    path
  );
  const dbRef = ref(db, path);
  const [snapshots, loading, error] = useList(dbRef);

  if (error) return <strong>Error: {error}</strong>;
  if (loading) return <Loading />;
  if (snapshots) {
    console.log(
      '🚀 ~ file: DetailsDataFetch.js ~ line 24 ~ DetailsDataFetchPage ~ snapshots[0].val()',
      snapshots[0].val()
    );
    console.log(
      '🚀 ~ file: DetailsDataFetch.js ~ line 24 ~ DetailsDataFetchPage ~ snapshots[0].key',
      snapshots[0].key
    );
  }
  return <>{snapshots && <DetailsPage snapshots={snapshots} page={page} />}</>;
}
