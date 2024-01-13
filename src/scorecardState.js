// should be iterable down the line to rx potential points
// generate initialScorecardState
// generate upperScorecardState
// upperPotentialPointsFunctionFactory
// generate lowerScorecardState
// checkForMatchingNumbers
// checkForSequentialNumbers
// checkForMatchingNumbers x2 (full house)

export default function generateInitialScorecardState() {
  const upperScorecardState = generateUpperScorecardState();
  const lowerScorecardState = generateLowerScorecardState();
  const scorecardState = upperScorecardState.concat(lowerScorecardState);
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
  ];
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

function checkForMatchingNumbers(numberOfMatches) {
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

function sumOfDiceValues(diceValues) {
  let sum = 0;
  diceValues.forEach((dieValue) => {
    sum += dieValue.value;
  });
  return sum;
}
