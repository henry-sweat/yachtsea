import {
  addOnly,
  checkForMatchingNumbers,
  checkForFullHouse,
  checkForStraight,
  sumOfDiceValues,
} from '@/utils/potentialPointsFunctions';

export const scorecardDetails = [
  {
    id: 'row-1',
    potentialPointsFunction: addOnly(1),
  },
  {
    id: 'row-2',
    potentialPointsFunction: addOnly(2),
  },
  {
    id: 'row-3',
    potentialPointsFunction: addOnly(3),
  },
  {
    id: 'row-4',
    potentialPointsFunction: addOnly(4),
  },
  {
    id: 'row-5',
    potentialPointsFunction: addOnly(5),
  },
  {
    id: 'row-6',
    potentialPointsFunction: addOnly(6),
  },
  {
    id: 'row-7',
    potentialPointsFunction: checkForMatchingNumbers(3),
  },
  {
    id: 'row-8',
    potentialPointsFunction: checkForMatchingNumbers(4),
  },
  {
    id: 'row-9',
    potentialPointsFunction: checkForFullHouse(),
  },
  {
    id: 'row-10',
    potentialPointsFunction: checkForStraight(4),
  },
  {
    id: 'row-11',
    potentialPointsFunction: checkForStraight(5),
  },
  {
    id: 'row-12',
    potentialPointsFunction: checkForMatchingNumbers(5),
  },
  {
    id: 'row-13',
    potentialPointsFunction: sumOfDiceValues,
  },
];

export const yachtseaBonusSymbol = 'X';
