'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import next from 'next';

export default function Home() {
  const [currentTurn, setCurrentTurn] = useState(0);
  const [diceValues, setDiceValues] = useState([
    { id: 'die-1', value: '-', isSelected: false },
    { id: 'die-2', value: '-', isSelected: false },
    { id: 'die-3', value: '-', isSelected: false },
    { id: 'die-4', value: '-', isSelected: false },
    { id: 'die-5', value: '-', isSelected: false },
  ]);

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
    } else {
      newDiceValues = diceValues.map((die) => ({
        id: die.id,
        value: die.isSelected ? die.value : rollSixSidedDie(),
        isSelected: currentTurn + 1 === 3 ? true : die.isSelected,
      }));
      setDiceValues(newDiceValues);
      setCurrentTurn(currentTurn + 1);
    }
  }

  function handleDieClicked(e) {
    if (currentTurn === 3 || currentTurn === 0) {
      return;
    }
    console.log('die has been clicked:', e.target.id[4]);
    let indexOfClickedDie = e.target.id[4] - 1;
    let newDiceValues = [...diceValues];
    newDiceValues[indexOfClickedDie].isSelected =
      !newDiceValues[indexOfClickedDie].isSelected;
    setDiceValues(newDiceValues);
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Yachtsea!!</p>
      </div>
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
      className={`${styles.dice} ${isSelected ? styles.selected : ''}`}
      onClick={handleDieClicked}
    >
      {value}
    </button>
  );
}

function rollSixSidedDie() {
  return Math.ceil(Math.random() * 6);
}
