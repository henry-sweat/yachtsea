import Image from 'next/image';
import styles from './page.module.css';
import Game from '@/components/Game';
import NavBar from '@/components/NavBar/NavBar';

export default function Home() {
  return (
    <div>
      <NavBar />
      <main className={styles.main}>
        <Game />
      </main>
    </div>
  );
}
