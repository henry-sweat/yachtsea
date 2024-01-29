import { auth } from 'auth';
import { getStats } from '@/db/actions';
import { IStatsProps } from '@/types';
import styles from './page.module.css';

export default async function Stats() {
  const session = await auth();

  if (!session) {
    return renderNotSignedInMessage();
  }

  const user_id = session.user.email;
  const data = await getStats(user_id);

  return renderStatsPage(data);
}

function renderNotSignedInMessage() {
  return (
    <div className={styles.main}>
      <div>You are not signed in!</div>
    </div>
  );
}

function renderStatsPage({
  highScore,
  totalGamesStarted,
  totalGamesFinished,
  averageScore,
}: IStatsProps) {
  return (
    <div className={styles.main}>
      <div className={styles.stat}>{`High Score: ${highScore}`}</div>
      <div className={styles.stat}>{`Average Score: ${averageScore}`}</div>
      <div className={styles.stat}>{`Total Games Started: ${totalGamesStarted}`}</div>
      <div className={styles.stat}>{`Total Games Finished: ${totalGamesFinished}`}</div>
    </div>
  );
}
