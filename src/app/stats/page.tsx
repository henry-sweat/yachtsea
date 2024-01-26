import { auth } from 'auth';
import { getStats } from '@/db/data';

export default async function Stats() {
  const session = await auth();
  let data;

  if (!session) {
    data = null;
  } else {
    data = await getStats(session.user.email);
  }

  return (
    <div>
      {data ? (
        <div>{`Games Played: ${data.gamesPlayed}`}</div>
      ) : (
        <div>
          <div>You are not signed in!</div>
        </div>
      )}
    </div>
  );
}
