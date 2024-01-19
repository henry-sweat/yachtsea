import { upperSectionDetails, lowerSectionDetails } from '@/utils/constants';
import type {
  IScorecard,
  IScorecardRow,
  IScorecardYachtseaBonus,
  IDie,
  ITotals,
  PotentialPointsFn,
} from '@/types';

export function generateInitialScorecardState(): IScorecard {
  const scorecardState: IScorecard = {
    rows: generateScorecardRowsState(),
    yachtseaBonus: generateYachtseaBonusState(),
  };
  return scorecardState;
}

export function generateInitialDiceValuesState(): Array<IDie> {
  const dice = [1, 2, 3, 4, 5];
  return dice.map((dieNumber) => ({
    id: `die-${dieNumber}`,
    value: dieNumber,
    isSelected: false,
  }));
}

export function generateInitialTotalsState(): ITotals {
  return {
    upperSectionSubTotal: undefined,
    upperSectionBonus: undefined,
    upperSectionTotal: undefined,
    yachtseaBonusTotal: undefined,
    lowerSectionTotal: undefined,
    grandTotal: undefined,
  };
}

function generateScorecardRowsState(): Array<IScorecardRow> {
  const upperScorecardState: Array<IScorecardRow> = generateUpperScorecardState();
  const lowerScorecardState: Array<IScorecardRow> = generateLowerScorecardState();
  return upperScorecardState.concat(lowerScorecardState);
}

function generateUpperScorecardState(): Array<IScorecardRow> {
  return upperSectionDetails.map((row) => ({
    id: row.id,
    earnedPoints: undefined,
    potentialPoints: undefined,
    potentialPointsFunction: potentialPointsFunctionFactory(row.rowNumber),
  }));
}

function generateLowerScorecardState(): Array<IScorecardRow> {
  return lowerSectionDetails.map((row) => ({
    id: row.id,
    earnedPoints: undefined,
    potentialPoints: undefined,
    potentialPointsFunction: row.potentialPointsFunction,
  }));
}

function generateYachtseaBonusState(): IScorecardYachtseaBonus {
  return {
    numberOfBonuses: 0,
  };
}

function potentialPointsFunctionFactory(dieValue: number): PotentialPointsFn {
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
