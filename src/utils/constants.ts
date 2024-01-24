import {
  potentialPointsFunctionFactory,
  checkForMatchingNumbers,
  checkForFullHouse,
  checkForStraight,
  sumOfDiceValues,
} from '@/data/potentialPointsFunctions';

export const upperSectionDetails = [
  {
    id: 'row-1',
    potentialPointsFunction: potentialPointsFunctionFactory(1),
  },
  {
    id: 'row-2',
    potentialPointsFunction: potentialPointsFunctionFactory(2),
  },
  {
    id: 'row-3',
    potentialPointsFunction: potentialPointsFunctionFactory(3),
  },
  {
    id: 'row-4',
    potentialPointsFunction: potentialPointsFunctionFactory(4),
  },
  {
    id: 'row-5',
    potentialPointsFunction: potentialPointsFunctionFactory(5),
  },
  {
    id: 'row-6',
    potentialPointsFunction: potentialPointsFunctionFactory(6),
  },
];

export const lowerSectionDetails = [
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
