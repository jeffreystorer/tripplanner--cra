import { useRecoilValue } from 'recoil';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref } from 'firebase/database';
import { firebaseConfig } from 'firebaseConfig';
import { useList } from 'react-firebase-hooks/database';
import { Loading } from 'components/common';
import { SavedTripsBox } from 'components/trip';
import * as state from 'store';

export default function TripPage() {
  const userId = useRecoilValue(state.userId);
  console.log('🚀 ~ file: TripPage.js ~ line 13 ~ TripPage ~ userId', userId);
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const dbRef = ref(db, `/${userId}`); //`${userId}`);
  const [snapshots, loading, error] = useList(dbRef);

  if (error) {
    console.log(error);
    return <p>{error && 'Error: '}</p>;
  }
  if (loading) return <Loading />;

  return (
    <>
      <div className="div--center">
        <br />
        {snapshots.length > 0 && (
          <>
            {' '}
            <SavedTripsBox snapshots={snapshots} />
            <br />{' '}
          </>
        )}
      </div>
    </>
  );
}
