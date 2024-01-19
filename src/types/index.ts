export interface IScorecard {
  rows: Array<IScorecardRow>;
  yachtseaBonus: IScorecardYachtseaBonus;
}

export interface IScorecardRow {
  id: string;
  earnedPoints: undefined | number;
  potentialPoints: undefined | number;
  potentialPointsFunction: Function;
}

export interface IScorecardYachtseaBonus {
  numberOfBonuses: number;
}

export interface IDie {
  id: string;
  value: number;
  isSelected: boolean;
}

export interface ITotals {
  upperSectionSubTotal: undefined | number;
  upperSectionBonus: undefined | number;
  upperSectionTotal: undefined | number;
  yachtseaBonusTotal: undefined | number;
  lowerSectionTotal: undefined | number;
  grandTotal: undefined | number;
}

export type PotentialPointsFn = (diceValues: IDie[]) => number;
