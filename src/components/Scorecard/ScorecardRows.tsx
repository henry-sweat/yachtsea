import useGameStateStore, { useGameActions } from '@/stores/gameState';
import { yachtseaBonusSymbol } from '@/utils/constants';
import styles from './Scorecard.module.css';

export function ScoreRow({ category, details, scorecardStateIndex }) {
  return (
    <tr>
      <td>{category}</td>
      <td>{details}</td>
      <PointsCell scorecardStateIndex={scorecardStateIndex} />
    </tr>
  );
}

export function TotalRow({ category, totalsStateProperty }) {
  return (
    <tr className={styles.total}>
      <td>{category}</td>
      <td>{'--->'}</td>
      <TotalCell totalsStateProperty={totalsStateProperty} />
    </tr>
  );
}

export function YachtseaBonusRow() {
  return (
    <tr className={styles.total}>
      <td rowSpan={2}>{'YACHTSEA BONUS'}</td>
      <td>{'X per Bonus'}</td>
      <YachtseaBonusCell />
    </tr>
  );
}

export function YachtseaBonusTotalRow() {
  return (
    <tr className={styles.total}>
      <td>{'Score 100 per X'}</td>
      <TotalCell totalsStateProperty={'yachtseaBonusTotal'} />
    </tr>
  );
}

function PointsCell({ scorecardStateIndex }) {
  const rollCounter = useGameStateStore((state) => state.rollCounter);
  const scorecard = useGameStateStore((state) => state.scorecard);
  const userHasSelectedPoints = useGameStateStore((state) => state.userHasSelectedPoints);
  const { updateGameStateForPointsClicked } = useGameActions();

  function handlePointsClicked(e) {
    if (rollCounter === 0 || userHasSelectedPoints) {
      return;
    }
    const indexOfClickedRow = e.target.id.slice(4);
    if (scorecard.rows[indexOfClickedRow].earnedPoints >= 0) {
      return;
    }
    updateGameStateForPointsClicked(indexOfClickedRow);
  }

  return scorecard.rows[scorecardStateIndex].earnedPoints >= 0 ? (
    <td id={`row-${scorecardStateIndex}`} className={styles.earnedPoints}>
      <strong>{scorecard.rows[scorecardStateIndex].earnedPoints}</strong>
    </td>
  ) : (
    <td
      id={`row-${scorecardStateIndex}`}
      className={styles.potentialPoints}
      onClick={handlePointsClicked}
    >
      {scorecard.rows[scorecardStateIndex].potentialPoints}
    </td>
  );
}

function TotalCell({ totalsStateProperty }) {
  const totals = useGameStateStore((state) => state.totals);

  return totalsStateProperty === 'upperSectionSubTotal' ? (
    <td>{`${totals[totalsStateProperty]} / 63`}</td>
  ) : (
    <td>{totals[totalsStateProperty]}</td>
  );
}

function YachtseaBonusCell() {
  const scorecard = useGameStateStore((state) => state.scorecard);

  return (
    <td id={'row-YachtseaBonusX'}>
      {yachtseaBonusSymbol.repeat(scorecard.yachtseaBonus.numberOfBonuses)}
    </td>
  );
}
