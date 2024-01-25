import { auth } from 'auth';
import UserButton from '@/components/UserButton/UserButton';
import Link from 'next/link';
import styles from './Header.module.css';

export default async function Header() {
  const session = await auth();

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <MainNav />
        <UserButton session={session} />
      </div>
    </header>
  );
}

function MainNav() {
  return (
    <div className={styles.mainNav}>
      <Link href="/">
        <h3>{'Yachtsea'}</h3>
      </Link>
    </div>
  );
}
