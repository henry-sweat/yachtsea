import { scorecardDetails } from '@/utils/constants';
import type { IScorecard, IScorecardRow, IScorecardYachtseaBonus, IDie, ITotals } from '@/types';

export function generateInitialScorecardState(): IScorecard {
  const scorecardState: IScorecard = {
    rows: generateScorecardRowsState(scorecardDetails),
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
    upperSectionSubTotal: 0,
    upperSectionBonus: 0,
    upperSectionTotal: 0,
    yachtseaBonusTotal: 0,
    lowerSectionTotal: 0,
    grandTotal: 0,
  };
}

function generateScorecardRowsState(scorecardDetails): Array<IScorecardRow> {
  return scorecardDetails.map((row) => ({
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
