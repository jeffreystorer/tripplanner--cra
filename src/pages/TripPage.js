import { useRecoilValue } from 'recoil';
import { Navigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref } from 'firebase/database';
import { firebaseConfig } from 'firebaseConfig';
import { useList } from 'react-firebase-hooks/database';
import { Loading } from 'components/common';
import { SavedTripsBox } from 'components/trip';
import * as state from 'store';

export default function TripPage() {
  const userId = useRecoilValue(state.userId);
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const dbRef = ref(db, `/${userId}`);
  const [snapshots, loading, error] = useList(dbRef);

  if (error) {
    return <Navigate to="/" />;
  }

  if (loading) return <Loading />;

  return (
    <>
      <div className="div--center">
        <br />
        <SavedTripsBox snapshots={snapshots} />
      </div>
    </>
  );
}
