import { PointsCell, TotalCell, YachtseaBonusCell } from './ScorecardNumberCells';
import styles from './Scorecard.module.css';

export default function Scorecard() {
  return (
    <div className={styles.scorecard}>
      <table className={styles.scorecardTable}>
        <thead>
          <tr className={styles.upperSectionHeaderRow}>
            <th>{'Upper Section'}</th>
            <th>{'How To Score'}</th>
            <th>{'Points Earned'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{'ONES'}</td>
            <td>{'Add Only Ones'}</td>
            <PointsCell scorecardStateIndex={0} />
          </tr>
          <tr>
            <td>{'TWOS'}</td>
            <td>{'Add Only Twos'}</td>
            <PointsCell scorecardStateIndex={1} />
          </tr>
          <tr>
            <td>{'THREES'}</td>
            <td>{'Add Only Threes'}</td>
            <PointsCell scorecardStateIndex={2} />
          </tr>
          <tr>
            <td>{'FOURS'}</td>
            <td>{'Add Only Fours'}</td>
            <PointsCell scorecardStateIndex={3} />
          </tr>
          <tr>
            <td>{'FIVES'}</td>
            <td>{'Add Only Fives'}</td>
            <PointsCell scorecardStateIndex={4} />
          </tr>
          <tr>
            <td>{'SIXES'}</td>
            <td>{'Add Only Sixes'}</td>
            <PointsCell scorecardStateIndex={5} />
          </tr>
          <tr className={styles.total}>
            <td>{'SUBTOTAL'}</td>
            <td>{'--->'}</td>
            <TotalCell totalsStateProperty={'upperSectionSubTotal'} />
          </tr>
          <tr className={styles.total}>
            <td>{'BONUS'}</td>
            <td>{'--->'}</td>
            <TotalCell totalsStateProperty={'upperSectionBonus'} />
          </tr>
          <tr className={styles.total}>
            <td>{'UPPER TOTAL'}</td>
            <td>{'--->'}</td>
            <TotalCell totalsStateProperty={'upperSectionTotal'} />
          </tr>
          <tr>
            <td>{'3 of a Kind'}</td>
            <td>{'Add All Dice'}</td>
            <PointsCell scorecardStateIndex={6} />
          </tr>
          <tr>
            <td>{'4 of a Kind'}</td>
            <td>{'Add All Dice'}</td>
            <PointsCell scorecardStateIndex={7} />
          </tr>
          <tr>
            <td>{'Full House'}</td>
            <td>{'Score 25'}</td>
            <PointsCell scorecardStateIndex={8} />
          </tr>
          <tr>
            <td>{'Small Straight'}</td>
            <td>{'Score 30'}</td>
            <PointsCell scorecardStateIndex={9} />
          </tr>
          <tr>
            <td>{'Large Straight'}</td>
            <td>{'Score 40'}</td>
            <PointsCell scorecardStateIndex={10} />
          </tr>
          <tr>
            <td>{'Yachtsea'}</td>
            <td>{'Score 50'}</td>
            <PointsCell scorecardStateIndex={11} />
          </tr>
          <tr>
            <td>{'Chance'}</td>
            <td>{'Add All Dice'}</td>
            <PointsCell scorecardStateIndex={12} />
          </tr>
          <tr className={styles.total}>
            <td rowSpan={2}>{'YACHTSEA BONUS'}</td>
            <td>{'X per Bonus'}</td>
            <YachtseaBonusCell />
          </tr>
          <tr className={styles.total}>
            <td>{'Score 100 per X'}</td>
            <TotalCell totalsStateProperty={'yachtseaBonusTotal'} />
          </tr>
          <tr className={styles.total}>
            <td>{'LOWER TOTAL'}</td>
            <td>{'--->'}</td>
            <TotalCell totalsStateProperty={'lowerSectionTotal'} />
          </tr>
          <tr className={styles.total}>
            <td>{'GRAND TOTAL'}</td>
            <td>{'--->'}</td>
            <TotalCell totalsStateProperty={'grandTotal'} />
          </tr>
        </tbody>
      </table>
    </div>
  );
}
