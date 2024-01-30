import { ScoreRow, TotalRow, YachtseaBonusRow, YachtseaBonusTotalRow } from './ScorecardRows';
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
          <ScoreRow category={'ONES'} details={'Add Only Ones'} scorecardStateIndex={0} />
          <ScoreRow category={'TWOS'} details={'Add Only Twos'} scorecardStateIndex={1} />
          <ScoreRow category={'THREES'} details={'Add Only Threes'} scorecardStateIndex={2} />
          <ScoreRow category={'FOURS'} details={'Add Only Fours'} scorecardStateIndex={3} />
          <ScoreRow category={'FIVES'} details={'Add Only Fives'} scorecardStateIndex={4} />
          <ScoreRow category={'SIXES'} details={'Add Only Sixes'} scorecardStateIndex={5} />

          <TotalRow category={'SUBTOTAL'} totalsStateProperty={'upperSectionSubTotal'} />
          <TotalRow category={'BONUS'} totalsStateProperty={'upperSectionBonus'} />
          <TotalRow category={'UPPER TOTAL'} totalsStateProperty={'upperSectionTotal'} />

          <ScoreRow category={'3 of a Kind'} details={'Add All Dice'} scorecardStateIndex={6} />
          <ScoreRow category={'4 of a Kind'} details={'Add All Dice'} scorecardStateIndex={7} />
          <ScoreRow category={'Full House'} details={'Score 25'} scorecardStateIndex={8} />
          <ScoreRow category={'Small Straight'} details={'Score 30'} scorecardStateIndex={9} />
          <ScoreRow category={'Large Straight'} details={'Score 40'} scorecardStateIndex={10} />
          <ScoreRow category={'Yachtsea'} details={'Score 50'} scorecardStateIndex={11} />
          <ScoreRow category={'Chance'} details={'Add All Dice'} scorecardStateIndex={12} />

          <YachtseaBonusRow />
          <YachtseaBonusTotalRow />
          <TotalRow category={'LOWER TOTAL'} totalsStateProperty={'lowerSectionTotal'} />
          <TotalRow category={'GRAND TOTAL'} totalsStateProperty={'grandTotal'} />
        </tbody>
      </table>
    </div>
  );
}
