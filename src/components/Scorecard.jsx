'use client';
import styles from '../app/page.module.css';
import { upperSectionDetails, lowerSectionDetails } from '@/data/scorecardDetails';

export default function Scorecard({ scorecard, points, handlePointsClicked }) {
  function generateUpperSectionOfScorecard(scorecardDetails) {
    return scorecardDetails.map((row) => (
      <tr key={row.id}>
        <td>{row.numberTextAllCaps}</td>
        <td>{`Count and Add Only ${row.numberText}`}</td>
        {scorecard[row.index].earnedPoints >= 0 ? (
          <td id={row.id} className={styles.earnedPoints}>
            <strong>{scorecard[row.index].earnedPoints}</strong>
          </td>
        ) : (
          <td id={row.id} className={styles.potentialPoints} onClick={handlePointsClicked}>
            {scorecard[row.index].potentialPoints}
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
        {scorecard[row.index].earnedPoints >= 0 ? (
          <td id={row.id} className={styles.earnedPoints}>
            <strong>{scorecard[row.index].earnedPoints}</strong>
          </td>
        ) : (
          <td id={row.id} className={styles.potentialPoints} onClick={handlePointsClicked}>
            {scorecard[row.index].potentialPoints}
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
            <td>{points.upperSectionSubTotal}</td>
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
        </tbody>
      </table>
    </div>
  );
}
