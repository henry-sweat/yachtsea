export interface IGameState {
  rollCounter: number;
  roundCounter: number;
  dice: IDie[];
  scorecard: IScorecard;
  totals: ITotals;
  userHasSelectedPoints: boolean;
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
    setUserHasSelectedPoints: (bool: boolean) => void;
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
  upperSectionSubTotal: number;
  upperSectionBonus: number;
  upperSectionTotal: number;
  yachtseaBonusTotal: number;
  lowerSectionTotal: number;
  grandTotal: number;
}

export type PotentialPointsFn = (diceValues: IDie[]) => number;

// REACT COMPONENT PROP TYPES
export interface ICounterProps {
  type: string;
  counter: number;
  denominator: number;
}
