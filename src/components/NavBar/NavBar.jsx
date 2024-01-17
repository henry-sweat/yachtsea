'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './NavBar.module.css';

function NavBar() {
  const pathname = usePathname();

  return (
    <div className={styles.navLayout}>
      <nav className={styles.wrapper}>
        <ul className={`${styles.links} `}>
          <Link href="/">
            <p className={pathname === '/' ? styles.chosen : styles.link}>Yachtsea</p>
          </Link>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
