'use client';
import useGameStateStore, { useGameActions } from '@/stores/gameState';
import Scorecard from '@/components/Scorecard';
import DiceContainer from './DiceContainer/DiceContainer';
import styles from '../app/page.module.css';

export default function Game() {
  const rollCounter = useGameStateStore((state) => state.rollCounter);
  const roundCounter = useGameStateStore((state) => state.roundCounter);
  const dice = useGameStateStore((state) => state.dice);
  const scorecard = useGameStateStore((state) => state.scorecard);
  const totals = useGameStateStore((state) => state.totals);
  const userHasSelectedPointsThisRound = useGameStateStore(
    (state) => state.userHasSelectedPointsThisRound
  );
  const {
    updateGameStateForRollButtonClicked,
    updateDiceStateForDieClicked,
    updateGameStateForPointsClicked,
  } = useGameActions();

  function handleRollClicked() {
    if (rollCounter === 3 && !userHasSelectedPointsThisRound) {
      return;
    }
    updateGameStateForRollButtonClicked();
  }

  function handleDieClicked(e) {
    if (rollCounter === 3 || rollCounter === 0) {
      return;
    }
    let indexOfClickedDie = e.target.id[4] - 1;
    updateDiceStateForDieClicked(indexOfClickedDie);
  }

  function handlePointsClicked(e) {
    if (rollCounter === 0 || userHasSelectedPointsThisRound) {
      return;
    }
    let indexOfClickedRow = e.target.id.slice(4) - 1;
    if (scorecard.rows[indexOfClickedRow].earnedPoints >= 0) {
      return;
    }
    updateGameStateForPointsClicked(indexOfClickedRow);
  }

  return (
    <div className={styles.game}>
      <div className={styles.leftSideOfGame}>
        <button className={`${styles.roll} ${styles.boldText}`} onClick={handleRollClicked}>
          ROLL
        </button>
        <DiceContainer diceValues={dice} handleDieClicked={handleDieClicked} />
      </div>
      <div className={styles.rightSideOfGame}>
        <div className={styles.scorecardHeading}>
          <h3>Scorecard</h3>
          <p className={styles.boldText}>{`Roll ${rollCounter} / 3`}</p>
          <p className={styles.boldText}>{`Round ${roundCounter} / 13`}</p>
        </div>
        <Scorecard
          scorecard={scorecard}
          totals={totals}
          handlePointsClicked={handlePointsClicked}
        />
      </div>
    </div>
  );
}
