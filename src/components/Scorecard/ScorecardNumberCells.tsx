import useGameStateStore, { useGameActions } from '@/stores/gameState';
import { yachtseaBonusSymbol } from '@/utils/constants';
import styles from './Scorecard.module.css';

export function PointsCell({ scorecardStateIndex }) {
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

export function TotalCell({ totalsStateProperty }) {
  const totals = useGameStateStore((state) => state.totals);

  return totalsStateProperty === 'upperSectionSubTotal' ? (
    <td>{`${totals[totalsStateProperty]} / 63`}</td>
  ) : (
    <td>{totals[totalsStateProperty]}</td>
  );
}

export function YachtseaBonusCell() {
  const scorecard = useGameStateStore((state) => state.scorecard);

  return (
    <td id={'row-YachtseaBonusX'}>
      {yachtseaBonusSymbol.repeat(scorecard.yachtseaBonus.numberOfBonuses)}
    </td>
  );
}
