"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const [currentTurn, setCurrentTurn] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [diceValues, setDiceValues] = useState(generateInitialDiceValuesState());
  const [scorecard, setScorecard] = useState(generateInitialScorecardState());

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
    // if points earned
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
              <tr>
                <td>ONES</td>
                <td>Count and Add Only Ones</td>
                {scorecard[0].earnedPoints >= 0 ? (
                  <td className={styles.earnedPoints}>
                    <strong>{scorecard[0].earnedPoints}</strong>
                  </td>
                ) : (
                  <td className={styles.potentialPoints}>{scorecard[0].potentialPoints}</td>
                )}
              </tr>
              <tr>
                <td>TWOS</td>
                <td>Count and Add Only Twos</td>
                {scorecard[1].earnedPoints >= 0 ? (
                  <td className={styles.earnedPoints}>
                    <strong>{scorecard[1].earnedPoints}</strong>
                  </td>
                ) : (
                  <td className={styles.potentialPoints}>{scorecard[1].potentialPoints}</td>
                )}
              </tr>
              <tr>
                <td>THREES</td>
                <td>Count and Add Only Threes</td>
                {scorecard[2].earnedPoints >= 0 ? (
                  <td className={styles.earnedPoints}>
                    <strong>{scorecard[2].earnedPoints}</strong>
                  </td>
                ) : (
                  <td className={styles.potentialPoints}>{scorecard[2].potentialPoints}</td>
                )}
              </tr>
              <tr>
                <td>FOURS</td>
                <td>Count and Add Only Fours</td>
                {scorecard[3].earnedPoints >= 0 ? (
                  <td className={styles.earnedPoints}>
                    <strong>{scorecard[3].earnedPoints}</strong>
                  </td>
                ) : (
                  <td className={styles.potentialPoints}>{scorecard[3].potentialPoints}</td>
                )}
              </tr>
              <tr>
                <td>FIVES</td>
                <td>Count and Add Only Fives</td>
                {scorecard[4].earnedPoints >= 0 ? (
                  <td className={styles.earnedPoints}>
                    <strong>{scorecard[4].earnedPoints}</strong>
                  </td>
                ) : (
                  <td className={styles.potentialPoints}>{scorecard[4].potentialPoints}</td>
                )}
              </tr>
              <tr>
                <td>SIXES</td>
                <td>Count and Add Only Sixes</td>
                {scorecard[5].earnedPoints >= 0 ? (
                  <td className={styles.earnedPoints}>
                    <strong>{scorecard[5].earnedPoints}</strong>
                  </td>
                ) : (
                  <td className={styles.potentialPoints}>{scorecard[5].potentialPoints}</td>
                )}
              </tr>
            </tbody>
          </table>
        </div>
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
// click points earned cell to book the points, changing text to white
// also on click, delete corresponding function for that row
