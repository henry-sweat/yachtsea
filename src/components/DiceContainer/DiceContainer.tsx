import useGameStateStore, { useGameActions } from '@/stores/gameState';
import styles from './DiceContainer.module.css';

export default function DiceContainer() {
  const rollCounter = useGameStateStore((state) => state.rollCounter);
  const dice = useGameStateStore((state) => state.dice);

  const { updateDiceStateForDieClicked } = useGameActions();

  function handleDieClicked(e) {
    if (rollCounter === 3 || rollCounter === 0) {
      return;
    }
    const indexOfClickedDie = e.target.id.slice(4) - 1;
    updateDiceStateForDieClicked(indexOfClickedDie);
  }

  return (
    <div className={styles.dice}>
      {dice.map(({ id, value, isSelected }) => (
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
