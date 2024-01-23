import useGameStateStore from '@/stores/gameState';
import { Scorecard } from '@/components';
import styles from './ScorecardContainer.module.css';

export default function ScorecardContainer() {
  const rollCounter = useGameStateStore((state) => state.rollCounter);
  const roundCounter = useGameStateStore((state) => state.roundCounter);

  return (
    <div>
      <div className={styles.heading}>
        <h3>Scorecard</h3>
        <p className={styles.counter}>{`Roll ${rollCounter} / 3`}</p>
        <p className={styles.counter}>{`Round ${roundCounter} / 13`}</p>
      </div>
      <Scorecard />
    </div>
  );
}
