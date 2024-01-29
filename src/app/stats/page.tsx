import { auth } from 'auth';
import { getHighScore } from '@/db/actions';

export default async function Stats() {
  const session = await auth();

  if (!session) {
    return renderNotSignedInMessage();
  }

  const user_id = session.user.email;
  const highScore = await getHighScore(user_id);

  return renderStatsPage(highScore);
}

function renderNotSignedInMessage() {
  return <div>You are not signed in!</div>;
}

function renderStatsPage(highScore) {
  return <div>{`High Score: ${highScore}`}</div>;
}
