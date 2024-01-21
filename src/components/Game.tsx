'use client';
import { useState } from 'react';
import Scorecard from '@/components/Scorecard';
import DiceContainer from './DiceContainer/DiceContainer';
import {
  generateInitialScorecardState,
  generateInitialDiceValuesState,
  generateInitialTotalsState,
} from '@/data/initialStateFunctions';
import { checkForMatchingNumbers } from '@/data/potentialPointsFunctions';
import type { IScorecard, IScorecardRow, IDie, ITotals } from '@/types';
import styles from '../app/page.module.css';

export default function Game() {
  const [currentTurn, setCurrentTurn] = useState<number>(0);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [diceValues, setDiceValues] = useState<IDie[]>(generateInitialDiceValuesState());
  const [scorecard, setScorecard] = useState<IScorecard>(generateInitialScorecardState());
  const [totals, setTotals] = useState<ITotals>(generateInitialTotalsState());
  const [hasSelectedPointsThisTurn, setHasSelectedPointsThisTurn] = useState<boolean>(false);

  function handleRollClicked() {
    if (currentTurn === 3 && !hasSelectedPointsThisTurn) {
      return;
    }

    if (hasSelectedPointsThisTurn) {
      setHasSelectedPointsThisTurn(false);
    }
    let newDiceValues: Array<IDie>;
    let nextTurn = currentTurn + 1;
    if (nextTurn > 3) {
      newDiceValues = diceValues.map((die) => ({
        id: die.id,
        value: rollSixSidedDie(),
        isSelected: false,
      }));
      setDiceValues(newDiceValues);
      setCurrentTurn(1);
      if (currentRound + 1 === 14) {
        setCurrentRound(1);
        let newScorecard: IScorecard = {
          rows: scorecard.rows.map((row) => {
            return {
              id: row.id,
              earnedPoints: undefined,
              potentialPoints: row.potentialPointsFunction(newDiceValues),
              potentialPointsFunction: row.potentialPointsFunction,
            };
          }),
          yachtseaBonus: { numberOfBonuses: 0 },
        };
        setScorecard(newScorecard);
        setTotals(generateInitialTotalsState());
        return;
      } else {
        setCurrentRound(currentRound + 1);
      }
    } else {
      newDiceValues = diceValues.map((die) => ({
        id: die.id,
        value: die.isSelected ? die.value : rollSixSidedDie(),
        isSelected: currentTurn + 1 === 3 ? true : die.isSelected,
      }));
      setDiceValues(newDiceValues);
      setCurrentTurn(currentTurn + 1);
    }

    let newScorecard: IScorecard = {
      rows: scorecard.rows.map((row): IScorecardRow => {
        if (row.earnedPoints >= 0) {
          return row;
        } else {
          return {
            id: row.id,
            earnedPoints: row.earnedPoints,
            potentialPoints: row.potentialPointsFunction(newDiceValues),
            potentialPointsFunction: row.potentialPointsFunction,
          };
        }
      }),
      yachtseaBonus: {
        numberOfBonuses: calculateNumberOfYachtseaBonuses(newDiceValues),
      },
    };
    setScorecard(newScorecard);
  }

  function handleDieClicked(e) {
    if (currentTurn === 3 || currentTurn === 0) {
      return;
    }
    let indexOfClickedDie = e.target.id[4] - 1;
    let newDiceValues: IDie[] = [...diceValues];
    newDiceValues[indexOfClickedDie].isSelected = !newDiceValues[indexOfClickedDie].isSelected;
    setDiceValues(newDiceValues);
  }

  function handlePointsClicked(e) {
    if (currentTurn === 0 || hasSelectedPointsThisTurn) {
      return;
    }

    let indexOfClickedRow = e.target.id.slice(4) - 1;

    if (scorecard.rows[indexOfClickedRow].earnedPoints >= 0) {
      return;
    } else {
      let newScorecard: IScorecard = { ...scorecard };
      newScorecard.rows[indexOfClickedRow].earnedPoints =
        newScorecard.rows[indexOfClickedRow].potentialPoints;
      setScorecard(newScorecard);
    }
    let newDiceValues: IDie[] = diceValues.map(
      (die): IDie => ({
        id: die.id,
        value: die.value,
        isSelected: true,
      })
    );
    setDiceValues(newDiceValues);
    setCurrentTurn(3);
    recalculateTotals();
    setHasSelectedPointsThisTurn(true);
  }

  function recalculateTotals() {
    let newTotals: ITotals = { ...totals };
    const [upperSectionSubTotal, upperSectionBonus, upperSectionTotal] =
      calculateUpperSectionTotals();
    const [yachtseaBonusTotal, lowerSectionTotal] = calculateLowerSectionTotals();
    newTotals.upperSectionSubTotal = upperSectionSubTotal;
    newTotals.upperSectionBonus = upperSectionBonus;
    newTotals.upperSectionTotal = upperSectionTotal;
    newTotals.yachtseaBonusTotal = yachtseaBonusTotal;
    newTotals.lowerSectionTotal = lowerSectionTotal;
    newTotals.grandTotal = upperSectionTotal + lowerSectionTotal;
    setTotals(newTotals);
  }

  function calculateUpperSectionTotals() {
    const relevantIndexes = [0, 1, 2, 3, 4, 5];
    let subtotal = 0;
    let bonus = 0;
    let total = 0;
    relevantIndexes.forEach((idx) => {
      if (scorecard.rows[idx].earnedPoints >= 0) {
        subtotal += scorecard.rows[idx].earnedPoints;
      }
    });
    if (subtotal >= 63) {
      bonus = 35;
    }
    total = subtotal + bonus;
    return [subtotal, bonus, total];
  }

  function calculateLowerSectionTotals() {
    const relevantIndexes = [6, 7, 8, 9, 10, 11, 12];
    let total = 0;
    relevantIndexes.forEach((idx) => {
      if (scorecard.rows[idx].earnedPoints >= 0) {
        total += scorecard.rows[idx].earnedPoints;
      }
    });
    const bonus = scorecard.yachtseaBonus.numberOfBonuses * 100;
    total += bonus;
    return [bonus, total];
  }

  function calculateNumberOfYachtseaBonuses(mostRecentRoll) {
    const currentNumberOfYachtseaBonuses = scorecard.yachtseaBonus.numberOfBonuses;
    const checkForYachtseaFunction = checkForMatchingNumbers(5);
    const isCurrentRollAYachtsea = checkForYachtseaFunction(mostRecentRoll) === 50 ? true : false;
    if (isCurrentRollAYachtsea && scorecard.rows[11].earnedPoints === 50) {
      return currentNumberOfYachtseaBonuses + 1;
    } else {
      return currentNumberOfYachtseaBonuses;
    }
  }

  return (
    <div className={styles.game}>
      <div className={styles.leftSideOfGame}>
        <button className={`${styles.roll} ${styles.boldText}`} onClick={handleRollClicked}>
          ROLL
        </button>
        <DiceContainer diceValues={diceValues} handleDieClicked={handleDieClicked} />
      </div>

      <div className={styles.rightSideOfGame}>
        <div className={styles.scorecardHeading}>
          <h3>Scorecard</h3>
          <p className={styles.boldText}>{`Roll ${currentTurn} / 3`}</p>
          <p className={styles.boldText}>{`Turn ${currentRound} / 13`}</p>
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

function rollSixSidedDie() {
  return Math.ceil(Math.random() * 6);
}
