export interface IGameState {
  rollCounter: number;
  roundCounter: number;
  dice: IDie[];
  scorecard: IScorecard;
  totals: ITotals;
  userHasSelectedPointsThisRound: boolean;
  actions: {
    updateGameStateForRollButtonClicked: () => void;
    updateDiceStateForDieClicked: (indexOfClickedDie: number) => void;
    updateGameStateForPointsClicked: (indexOfClickedRow: number) => void;
    updateTotalsWithScorecard: (scorecard: IScorecard) => void;
    updateRollCounter: () => void;
    updateRoundCounter: () => void;
  };
  setters: {
    setRollCounter: (nextRoll: number) => void;
    setRoundCounter: (nextRound: number) => void;
    setDice: (newDice: IDie[]) => void;
    setScorecard: (newScorecard: IScorecard) => void;
    setTotals: (newTotals: ITotals) => void;
    setUserHasSelectedPointsThisRound: (bool: boolean) => void;
  };
}

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
