export default function generateInitialScorecardState() {
  const upperScorecardState = generateUpperScorecardState();
  const lowerScorecardState = generateLowerScorecardState();
  const scorecardState = {};
  scorecardState.rows = upperScorecardState.concat(lowerScorecardState);
  scorecardState.yachtseaBonus = generateYachtseaBonusState();
  return scorecardState;
}

function generateUpperScorecardState() {
  const upperSectionRows = [1, 2, 3, 4, 5, 6];
  return upperSectionRows.map((rowNumber) => ({
    id: `row-${rowNumber}`,
    earnedPoints: undefined,
    potentialPoints: undefined,
    potentialPointsFunction: potentialPointsFunctionFactory(rowNumber),
  }));
}

function generateLowerScorecardState() {
  return [
    {
      id: `row-7`,
      earnedPoints: undefined,
      potentialPoints: undefined,
      potentialPointsFunction: checkForMatchingNumbers(3),
    },
    {
      id: `row-8`,
      earnedPoints: undefined,
      potentialPoints: undefined,
      potentialPointsFunction: checkForMatchingNumbers(4),
    },
    {
      id: `row-9`,
      earnedPoints: undefined,
      potentialPoints: undefined,
      potentialPointsFunction: checkForFullHouse(),
    },
    {
      id: `row-10`,
      earnedPoints: undefined,
      potentialPoints: undefined,
      potentialPointsFunction: checkForStraight(4),
    },
    {
      id: `row-11`,
      earnedPoints: undefined,
      potentialPoints: undefined,
      potentialPointsFunction: checkForStraight(5),
    },
    {
      id: `row-12`,
      earnedPoints: undefined,
      potentialPoints: undefined,
      potentialPointsFunction: checkForMatchingNumbers(5),
    },
    {
      id: `row-13`,
      earnedPoints: undefined,
      potentialPoints: undefined,
      potentialPointsFunction: sumOfDiceValues,
    },
  ];
}

function generateYachtseaBonusState() {
  return {
    numberOfBonuses: 0,
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

export function checkForMatchingNumbers(numberOfMatches) {
  return (diceValues) => {
    const diceValuesArray = diceValues.map((die) => die.value);
    const sortedDiceValuesArray = diceValuesArray.sort();
    let largestNumberOfMatches = 1;

    function helperFunc(array, idx) {
      let numbersInARow = 1;
      if (array[idx] === array[idx + 1]) {
        numbersInARow += helperFunc(array, idx + 1);
      }
      return numbersInARow;
    }

    let currentStreak;
    for (let i = 0; i < sortedDiceValuesArray.length; i++) {
      currentStreak = helperFunc(sortedDiceValuesArray, i);
      if (currentStreak > largestNumberOfMatches) {
        largestNumberOfMatches = currentStreak;
      }
    }

    if (numberOfMatches === 3 && largestNumberOfMatches >= 3) {
      return sumOfDiceValues(diceValues);
    } else if (numberOfMatches === 4 && largestNumberOfMatches >= 4) {
      return sumOfDiceValues(diceValues);
    } else if (numberOfMatches === 5 && largestNumberOfMatches === 5) {
      return 50;
    } else {
      return 0;
    }
  };
}

function checkForFullHouse() {
  return (diceValues) => {
    const diceValuesArray = diceValues.map((die) => die.value);
    const cache = {};
    let has2OfAKind = false;
    let has3OfAKind = false;
    diceValuesArray.forEach((dieValue) => {
      if (cache[dieValue]) {
        cache[dieValue]++;
      } else {
        cache[dieValue] = 1;
      }
    });

    Object.keys(cache).forEach((key) => {
      if (cache[key] === 2) {
        has2OfAKind = true;
      } else if (cache[key] === 3) {
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

function checkForStraight(lengthOfSequence) {
  return (diceValues) => {
    const diceValuesArray = diceValues.map((die) => die.value);
    const sortedDiceValuesArray = diceValuesArray.sort();
    const trimmedDiceValuesArray = removeDuplicates(sortedDiceValuesArray);
    let isSequential = false;

    console.log(trimmedDiceValuesArray);

    if (lengthOfSequence === 4) {
      for (let i = 0; i < 2; i++) {
        if (
          trimmedDiceValuesArray[i + 1] === trimmedDiceValuesArray[i] + 1 &&
          trimmedDiceValuesArray[i + 2] === trimmedDiceValuesArray[i] + 2 &&
          trimmedDiceValuesArray[i + 3] === trimmedDiceValuesArray[i] + 3
        ) {
          isSequential = true;
        }
      }
    } else if (lengthOfSequence === 5) {
      if (
        trimmedDiceValuesArray[1] === trimmedDiceValuesArray[0] + 1 &&
        trimmedDiceValuesArray[2] === trimmedDiceValuesArray[0] + 2 &&
        trimmedDiceValuesArray[3] === trimmedDiceValuesArray[0] + 3 &&
        trimmedDiceValuesArray[4] === trimmedDiceValuesArray[0] + 4
      ) {
        isSequential = true;
      }
    }

    if (isSequential) {
      if (lengthOfSequence === 4) {
        return 30;
      } else if (lengthOfSequence === 5) {
        return 40;
      }
    } else {
      return 0;
    }
  };
}

function alreadyHasYachtseaAndCurrentRollIsYachtsea() {
  return (latestRoll, previousScorecardState) => {
    const checkForYachtsea = checkForMatchingNumbers(5);
    const currentRollIsYachtsea = checkForYachtsea(latestRoll);
    const alreadyHasYachtsea = previousScorecardState.rows[11].earnedPoints === 50;
    return currentRollIsYachtsea && alreadyHasYachtsea;
  };
}

function checkforYachtseaEarnedPoints() {
  return (previousScorecardState) => {
    const pointsEarnedForYachstea = previousScorecardState.rows[11].earnedPoints;
    if (pointsEarnedForYachstea === 50) {
      return 50;
    } else {
      return 0;
    }
  };
}

function sumOfDiceValues(diceValues) {
  let sum = 0;
  diceValues.forEach((dieValue) => {
    sum += dieValue.value;
  });
  return sum;
}

function removeDuplicates(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}
