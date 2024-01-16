'use client';
import styles from '../app/page.module.css';
import {
  upperSectionDetails,
  lowerSectionDetails,
  yachtseaBonusSymbol,
} from '@/data/scorecardDetails';

export default function Scorecard({ scorecard, points, handlePointsClicked }) {
  function generateUpperSectionOfScorecard(scorecardDetails) {
    return scorecardDetails.map((row) => (
      <tr key={row.id}>
        <td>{row.numberTextAllCaps}</td>
        <td>{`Count and Add Only ${row.numberText}`}</td>
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
      <h3>Scorecard</h3>
      <table className={styles.upperSection}>
        <thead>
          <tr className={styles.upperSectionHeaderRow}>
            <th>Upper Section</th>
            <th>How To Score</th>
            <th>Points Earned</th>
          </tr>
        </thead>
        <tbody>
          {generateUpperSectionOfScorecard(upperSectionDetails)}
          <tr>
            <td>{'TOTAL SCORE'}</td>
            <td>{'--->'}</td>
            <td>{points.upperSectionSubTotal} / 63</td>
          </tr>
          <tr>
            <td>{'BONUS'}</td>
            <td>{'--->'}</td>
            <td>{points.upperSectionBonus}</td>
          </tr>
          <tr>
            <td>{'UPPER SECTION TOTAL'}</td>
            <td>{'--->'}</td>
            <td>{points.upperSectionTotal}</td>
          </tr>
          {generateLowerSectionOfScorecard(lowerSectionDetails)}
          <tr>
            <td rowSpan={'2'}>{'YACHTSEA BONUS'}</td>
            <td>{'X per Bonus'}</td>
            <td id={'row-YachtseaBonusX'} className={styles.earnedPoints}>
              {yachtseaBonusSymbol.repeat(scorecard.yachtseaBonus.numberOfBonuses)}
            </td>
          </tr>
          <tr>
            <td>{'Score 100 per X'}</td>
            <td>{points.yachtseaBonusTotal}</td>
          </tr>
          <tr>
            <td>{'LOWER SECTION TOTAL'}</td>
            <td>{'--->'}</td>
            <td>{points.lowerSectionTotal}</td>
          </tr>
          <tr>
            <td>{'GRAND TOTAL'}</td>
            <td>{'--->'}</td>
            <td>{points.grandTotal}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
