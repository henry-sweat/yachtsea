"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Scorecard from "@/components/Scorecard";

export default function Home() {
  const [currentTurn, setCurrentTurn] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [diceValues, setDiceValues] = useState(generateInitialDiceValuesState());
  const [scorecard, setScorecard] = useState(generateInitialScorecardState());
  const [points, setPoints] = useState(generateInitialPointsState());

  function handleRollClicked() {
    let newDiceValues;
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

    let newScorecard = scorecard.map((row) => {
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
    });
    setScorecard(newScorecard);
  }

  function handleDieClicked(e) {
    if (currentTurn === 3 || currentTurn === 0) {
      return;
    }
    let indexOfClickedDie = e.target.id[4] - 1;
    let newDiceValues = [...diceValues];
    newDiceValues[indexOfClickedDie].isSelected = !newDiceValues[indexOfClickedDie].isSelected;
    setDiceValues(newDiceValues);
  }

  function handlePointsClicked(e) {
    if (currentTurn === 0) {
      return;
    }

    let indexOfClickedRow = e.target.id[4] - 1;
    if (scorecard[indexOfClickedRow].earnedPoints >= 0) {
      return;
    } else {
      let newScorecard = [...scorecard];
      newScorecard[indexOfClickedRow].earnedPoints =
        newScorecard[indexOfClickedRow].potentialPoints;
      setScorecard(newScorecard);
    }
    let newDiceValues = diceValues.map((die) => ({
      id: die.id,
      value: die.value,
      isSelected: true,
    }));
    setDiceValues(newDiceValues);
    setCurrentTurn(3);
    recalculatePointsTotals();
  }

  function recalculatePointsTotals() {
    let newPoints = { ...points };
    const [upperSectionSubTotal, upperSectionBonus, upperSectionTotal] =
      calculateUpperSectionTotals();
    newPoints.upperSectionSubTotal = upperSectionSubTotal;
    newPoints.upperSectionBonus = upperSectionBonus;
    newPoints.upperSectionTotal = upperSectionTotal;
    setPoints(newPoints);
  }

  function calculateUpperSectionTotals() {
    const relevantIndexes = [0, 1, 2, 3, 4, 5];
    let subtotal = 0;
    let bonus = 0;
    let total = 0;
    relevantIndexes.forEach((idx) => {
      if (scorecard[idx].earnedPoints >= 0) {
        subtotal += scorecard[idx].earnedPoints;
      }
    });
    if (subtotal >= 63) {
      bonus = 35;
    }
    total = subtotal + bonus;
    return [subtotal, bonus, total];
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Yachtsea!!</p>
      </div>
      <div className={styles.game}>
        <div className={styles.dice}>
          <button onClick={handleRollClicked}>ROLL</button>
          {diceValues.map((die) => (
            <Die
              key={die.id}
              id={die.id}
              value={die.value}
              isSelected={die.isSelected}
              handleDieClicked={handleDieClicked}
            />
          ))}
          <p>{`turn ${currentTurn} out 3`}</p>
          <p>{`round ${currentRound} out 13`}</p>
        </div>
        <Scorecard
          scorecard={scorecard}
          points={points}
          handlePointsClicked={handlePointsClicked}
        />
      </div>

      <div className={styles.center}>
        <div>testing</div>
      </div>
    </main>
  );
}

function Die({ id, value, isSelected, handleDieClicked }) {
  return (
    <button
      id={id}
      className={`${styles.die} ${isSelected ? styles.selected : ""}`}
      onClick={handleDieClicked}
    >
      {value}
    </button>
  );
}

function generateInitialDiceValuesState() {
  const dice = [1, 2, 3, 4, 5];
  return dice.map((dieNumber) => ({
    id: `die-${dieNumber}`,
    value: "-",
    isSelected: false,
  }));
}

function generateInitialScorecardState() {
  const rows = [1, 2, 3, 4, 5, 6];
  return rows.map((rowNumber) => ({
    id: `row-${rowNumber}`,
    earnedPoints: undefined,
    potentialPoints: undefined,
    potentialPointsFunction: potentialPointsFunctionFactory(rowNumber),
  }));
}

function generateInitialPointsState() {
  return {
    upperSectionSubTotal: undefined,
    upperSectionBonus: undefined,
    upperSectionTotal: undefined,
    yachtseaBonusTotal: undefined,
    lowerSectionTotal: undefined,
    grandTotal: undefined,
  };
}

function potentialPointsFunctionFactory(dieValue) {
  return (newDiceValues) => {
    let points = 0;
    newDiceValues.forEach((die) => {
      if (die.value === dieValue) {
        points += dieValue;
      }
    });
    return points;
  };
}

function rollSixSidedDie() {
  return Math.ceil(Math.random() * 6);
}
