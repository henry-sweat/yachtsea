import useGameStateStore, { useGameActions } from '@/stores/gameState';
import styles from './DiceContainer.module.css';
import { IDieProps } from '@/types';

export default function Die({ diceStateIndex }: IDieProps) {
  const rollCounter = useGameStateStore((state) => state.rollCounter);
  const dice = useGameStateStore((state) => state.dice);
  const { updateDiceStateForDieClicked } = useGameActions();

  const { id, isSelected, value } = dice[diceStateIndex];

  function handleDieClicked(e) {
    if (rollCounter === 3 || rollCounter === 0) {
      return;
    }
    const indexOfClickedDie = e.target.id.slice(4) - 1;
    updateDiceStateForDieClicked(indexOfClickedDie);
  }

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
