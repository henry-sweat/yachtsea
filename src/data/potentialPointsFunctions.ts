import type { IDie, PotentialPointsFn } from '@/types';

export function checkForMatchingNumbers(numberOfMatches: number): PotentialPointsFn {
  return (diceValues): number => {
    const valueCounts = generateDiceValueCountObject(diceValues);
    const maxCount: number = Math.max(...Object.values(valueCounts).map((value) => Number(value)));

    if (numberOfMatches === 3 && maxCount >= 3) {
      return sumOfDiceValues(diceValues);
    } else if (numberOfMatches === 4 && maxCount >= 4) {
      return sumOfDiceValues(diceValues);
    } else if (numberOfMatches === 5 && maxCount === 5) {
      return 50;
    } else {
      return 0;
    }
  };
}

export function checkForFullHouse(): PotentialPointsFn {
  return (diceValues): number => {
    let has2OfAKind = false;
    let has3OfAKind = false;

    const valueCounts = generateDiceValueCountObject(diceValues);
    Object.keys(valueCounts).forEach((key) => {
      if (valueCounts[key] === 2) {
        has2OfAKind = true;
      } else if (valueCounts[key] === 3) {
        has3OfAKind = true;
      } else {
        return;
      }
    });

    if (has2OfAKind && has3OfAKind) {
      return 25;
    } else {
      return 0;
    }
  };
}

export function checkForStraight(lengthOfSequence: number): PotentialPointsFn {
  return (diceValues): number => {
    const values = sortAndRemoveDuplicates(diceValues);

    if (lengthOfSequence === 4) {
      for (let i = 0; i < 2; i++) {
        if (
          values[i + 1] === values[i] + 1 &&
          values[i + 2] === values[i] + 2 &&
          values[i + 3] === values[i] + 3
        ) {
          return 30;
        }
      }
      return 0;
    } else if (lengthOfSequence === 5) {
      if (
        values[1] === values[0] + 1 &&
        values[2] === values[0] + 2 &&
        values[3] === values[0] + 3 &&
        values[4] === values[0] + 4
      ) {
        return 40;
      }
      return 0;
    }
  };
}

export function sumOfDiceValues(diceValues: IDie[]): number {
  return diceValues.reduce((sum, die) => sum + die.value, 0);
}

function generateDiceValueCountObject(diceValues: IDie[]): Object {
  return diceValues.reduce((acc, die) => {
    acc[die.value] = (acc[die.value] || 0) + 1;
    return acc;
  }, {});
}

function sortAndRemoveDuplicates(diceValues: IDie[]): number[] {
  const sortedDiceValues = diceValues.map((die) => die.value).sort();
  const trimmedDiceValues = sortedDiceValues.filter(
    (item, index) => sortedDiceValues.indexOf(item) === index
  );
  return trimmedDiceValues;
}

export const checkForYachtseaFn = checkForMatchingNumbers(5);
