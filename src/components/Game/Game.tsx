'use client';
import { ScorecardContainer, RollButton, DiceContainer } from '@/components';
import styles from './Game.module.css';

export default function Game() {
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
