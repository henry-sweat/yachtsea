import styles from './DiceContainer.module.css';

export default function DiceContainer({ diceValues, handleDieClicked }) {
  return (
    <div className={styles.dice}>
      {diceValues.map(({ id, value, isSelected }) => (
        <Die
          key={id}
          id={id}
          value={value}
          isSelected={isSelected}
          handleDieClicked={handleDieClicked}
        />
      ))}
    </div>
  );
}

function Die({ id, value, isSelected, handleDieClicked }) {
  return (
    <button
      id={id}
      className={`${styles.die} ${isSelected ? styles.selected : ''}`}
      onClick={handleDieClicked}
    >
      {value}
    </button>
  );
}
