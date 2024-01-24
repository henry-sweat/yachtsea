import UserButton from '@/components/UserButton/UserButton';
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <MainNav />
        <UserButton />
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
