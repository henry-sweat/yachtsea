export function generateInitialDiceValuesState() {
  const dice = [1, 2, 3, 4, 5];
  return dice.map((dieNumber) => ({
    id: `die-${dieNumber}`,
    value: '-',
    isSelected: false,
  }));
}

export function generateInitialTotalsState() {
  return {
    upperSectionSubTotal: undefined,
    upperSectionBonus: undefined,
    upperSectionTotal: undefined,
    yachtseaBonusTotal: undefined,
    lowerSectionTotal: undefined,
    grandTotal: undefined,
  };
}
