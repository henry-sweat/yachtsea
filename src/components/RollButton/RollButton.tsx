'use client';
import useGameStateStore, { useGameActions } from '@/stores/gameState';
import styles from './RollButton.module.css';

export default function RollButton() {
  const rollCounter = useGameStateStore((state) => state.rollCounter);
  const userHasSelectedPointsThisRound = useGameStateStore(
    (state) => state.userHasSelectedPointsThisRound
  );
  const { updateGameStateForRollButtonClicked } = useGameActions();

  function handleRollClicked() {
    if (rollCounter === 3 && !userHasSelectedPointsThisRound) {
      return;
    }
    updateGameStateForRollButtonClicked();
  }

  return (
    <button className={`${styles.roll}`} onClick={handleRollClicked}>
      ROLL
    </button>
  );
}
