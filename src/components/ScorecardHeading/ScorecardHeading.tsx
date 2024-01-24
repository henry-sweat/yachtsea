import useGameStateStore from '@/stores/gameState';
import { Counter } from '@/components';
import styles from './ScorecardHeading.module.css';

export default function ScorecardHeading() {
  const rollCounter = useGameStateStore((state) => state.rollCounter);
  const roundCounter = useGameStateStore((state) => state.roundCounter);

  return (
    <div className={styles.heading}>
      <h3>Scorecard</h3>
      <Counter type={'Roll'} counter={rollCounter} denominator={3} />
      <Counter type={'Round'} counter={roundCounter} denominator={13} />
    </div>
  );
}
