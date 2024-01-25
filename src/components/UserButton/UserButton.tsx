import { signIn, signOut } from 'auth';
import styles from './UserButton.module.css';

export default function UserButton({ session }) {
  if (!session?.user) return <SignIn />;
  return <SignOut />;
}

function SignIn({ provider }: { provider?: string }) {
  return (
    <form
      action={async () => {
        'use server';
        await signIn(provider);
      }}
    >
      <button className={styles.authButton}>Sign In</button>
    </form>
  );
}

function SignOut() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <button className={styles.authButton}>Sign Out</button>
    </form>
  );
}
