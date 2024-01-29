import { auth } from 'auth';
import { SessionProvider } from 'next-auth/react';
import { Game } from '@/components';
import styles from './page.module.css';

export default async function Home() {
  const session = await auth();
  if (session?.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    };
  }

  return (
    <SessionProvider session={session}>
      <main className={styles.main}>
        <Game />
      </main>
    </SessionProvider>
  );
}
