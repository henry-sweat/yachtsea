import Image from 'next/image';
import styles from './page.module.css';
import Game from '@/components/Game';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Yachtsea!!</p>
      </div>
      <Game />

      <div className={styles.center}>
        <div>testing</div>
      </div>
    </main>
  );
}
