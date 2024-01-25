'use client';
import useGameStateStore, { useGameActions } from '@/stores/gameState';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { ScorecardContainer, RollButton, DiceContainer } from '@/components';
import styles from './Game.module.css';

export default function Game() {
  const { updateUser } = useGameActions();
  const { data: session } = useSession();

  useEffect(() => {
    console.log('game rerender');
    updateUser(session);
  }, [session, updateUser]);

  return (
    <div className={styles.game}>
      <div className={styles.leftSideOfGame}>
        <RollButton />
        <DiceContainer />
      </div>
      <ScorecardContainer />
    </div>
  );
}
