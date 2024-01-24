import { auth } from 'auth';
import { signIn, signOut } from 'auth';
import styles from './UserButton.module.css';

export default async function UserButton() {
  const session = await auth();
  if (!session?.user) return <SignIn />;
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <p>Hey, {session?.user.name}!</p>
      <SignOut />
    </div>
  );
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
