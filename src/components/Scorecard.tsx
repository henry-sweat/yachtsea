import { upperSectionDetails, lowerSectionDetails, yachtseaBonusSymbol } from '@/utils/constants';
import styles from '../app/page.module.css';

export default function Scorecard({ scorecard, totals, handlePointsClicked }) {
  function generateUpperSectionOfScorecard(scorecardDetails) {
    return scorecardDetails.map((row) => (
      <tr key={row.id}>
        <td>{row.numberTextAllCaps}</td>
        <td>{`Add Only ${row.numberText}`}</td>
        {scorecard.rows[row.index].earnedPoints >= 0 ? (
          <td id={row.id} className={styles.earnedPoints}>
            <strong>{scorecard.rows[row.index].earnedPoints}</strong>
          </td>
        ) : (
          <td id={row.id} className={styles.potentialPoints} onClick={handlePointsClicked}>
            {scorecard.rows[row.index].potentialPoints}
          </td>
        )}
      </tr>
    ));
  }

  function generateLowerSectionOfScorecard(scorecardDetails) {
    return scorecardDetails.map((row) => (
      <tr key={row.id}>
        <td>{row.category}</td>
        <td>{row.description}</td>
        {scorecard.rows[row.index].earnedPoints >= 0 ? (
          <td id={row.id} className={styles.earnedPoints}>
            <strong>{scorecard.rows[row.index].earnedPoints}</strong>
          </td>
        ) : (
          <td id={row.id} className={styles.potentialPoints} onClick={handlePointsClicked}>
            {scorecard.rows[row.index].potentialPoints}
          </td>
        )}
      </tr>
    ));
  }

  return (
    <div className={styles.scorecard}>
      <table className={styles.scorecardTable}>
        <thead>
          <tr>
            <th className={styles.upperSectionHeaderRow}>Upper Section</th>
            <th className={styles.upperSectionHeaderRow}>How To Score</th>
            <th className={styles.upperSectionHeaderRow}>Points Earned</th>
          </tr>
        </thead>
        <tbody>
          {generateUpperSectionOfScorecard(upperSectionDetails)}
          <tr>
            <td className={styles.boldText}>{'TOTAL SCORE'}</td>
            <td>{'--->'}</td>
            <td>
              {totals.upperSectionSubTotal === undefined
                ? undefined
                : `${totals.upperSectionSubTotal} / 63`}
            </td>
          </tr>
          <tr>
            <td className={styles.boldText}>{'BONUS'}</td>
            <td>{'--->'}</td>
            <td>{totals.upperSectionBonus}</td>
          </tr>
          <tr>
            <td className={styles.boldText}>{'UPPER TOTAL'}</td>
            <td>{'--->'}</td>
            <td>{totals.upperSectionTotal}</td>
          </tr>
          {generateLowerSectionOfScorecard(lowerSectionDetails)}
          <tr>
            <td className={styles.boldText} rowSpan={2}>
              {'YACHTSEA BONUS'}
            </td>
            <td>{'X per Bonus'}</td>
            <td id={'row-YachtseaBonusX'} className={styles.earnedPoints}>
              {yachtseaBonusSymbol.repeat(scorecard.yachtseaBonus.numberOfBonuses)}
            </td>
          </tr>
          <tr>
            <td>{'Score 100 per X'}</td>
            <td>{totals.yachtseaBonusTotal}</td>
          </tr>
          <tr>
            <td className={styles.boldText}>{'LOWER TOTAL'}</td>
            <td>{'--->'}</td>
            <td>{totals.lowerSectionTotal}</td>
          </tr>
          <tr className={styles.grandTotalRow}>
            <td className={styles.boldText}>{'GRAND TOTAL'}</td>
            <td>{'--->'}</td>
            <td>{totals.grandTotal}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
