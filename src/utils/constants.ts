import {
  checkForMatchingNumbers,
  checkForFullHouse,
  checkForStraight,
  sumOfDiceValues,
} from '@/data/potentialPointsFunctions';

export const upperSectionDetails = [
  { rowNumber: 1, numberText: 'Ones', numberTextAllCaps: 'ONES', index: 0, id: 'row-1' },
  { rowNumber: 2, numberText: 'Twos', numberTextAllCaps: 'TWO', index: 1, id: 'row-2' },
  { rowNumber: 3, numberText: 'Threes', numberTextAllCaps: 'THREES', index: 2, id: 'row-3' },
  { rowNumber: 4, numberText: 'Fours', numberTextAllCaps: 'FOURS', index: 3, id: 'row-4' },
  { rowNumber: 5, numberText: 'Fives', numberTextAllCaps: 'FIVES', index: 4, id: 'row-5' },
  { rowNumber: 6, numberText: 'Sixes', numberTextAllCaps: 'SIXES', index: 5, id: 'row-6' },
];

export const lowerSectionDetails = [
  {
    rowNumber: 7,
    category: '3 of a kind',
    description: 'Add All Dice',
    index: 6,
    id: 'row-7',
    potentialPointsFunction: checkForMatchingNumbers(3),
  },
  {
    rowNumber: 8,
    category: '4 of a kind',
    description: 'Add All Dice',
    index: 7,
    id: 'row-8',
    potentialPointsFunction: checkForMatchingNumbers(4),
  },
  {
    rowNumber: 9,
    category: 'Full House',
    description: 'Score 25',
    index: 8,
    id: 'row-9',
    potentialPointsFunction: checkForFullHouse(),
  },
  {
    rowNumber: 10,
    category: 'Small Straight',
    description: 'Score 30',
    index: 9,
    id: 'row-10',
    potentialPointsFunction: checkForStraight(4),
  },
  {
    rowNumber: 11,
    category: 'Large Straight',
    description: 'Score 40',
    index: 10,
    id: 'row-11',
    potentialPointsFunction: checkForStraight(5),
  },
  {
    rowNumber: 12,
    category: 'Yachtsea',
    description: 'Score 50',
    index: 11,
    id: 'row-12',
    potentialPointsFunction: checkForMatchingNumbers(5),
  },
  {
    rowNumber: 13,
    category: 'Chance',
    description: 'Add All Dice',
    index: 12,
    id: 'row-13',
    potentialPointsFunction: sumOfDiceValues,
  },
];

export const yachtseaBonusSymbol = 'X';
