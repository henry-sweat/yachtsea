import Die from './Die';
import styles from './DiceContainer.module.css';

export default function DiceContainer() {
  const diceStateIndices = [0, 1, 2, 3, 4];

  return (
    <div className={styles.dice}>
      {diceStateIndices.map((diceStateIndex) => (
        <Die key={`die-${diceStateIndex}`} diceStateIndex={diceStateIndex} />
      ))}
    </div>
  );
}
