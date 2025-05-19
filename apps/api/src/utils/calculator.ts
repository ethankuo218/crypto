export interface Position {
  openingPrice: number;
  closingPrice: number;
  contractSize: number;
  contractMultiplier: number;
  leverage: number;
  marginRate: number;
  maintenanceMarginRate: number;
}

export class CryptoCalculator {
  /**
   * Calculate fixed margin based on contract specifications
   * @param contractCount Number of contracts
   * @param marginPerContract Margin required per contract
   */
  static calculateFixedMargin(
    contractCount: number,
    marginPerContract: number
  ): number {
    return contractCount * marginPerContract;
  }

  /**
   * Calculate dynamic margin based on contract value and margin ratio
   * @param contractValue Total value of the contract
   * @param marginRate Margin rate as a decimal (e.g., 0.1 for 10%)
   */
  static calculateDynamicMargin(
    contractValue: number,
    marginRate: number
  ): number {
    return contractValue * marginRate;
  }

  /**
   * Calculate leverage ratio
   * @param contractValue Total value of the contract
   * @param margin Amount of margin used
   */
  static calculateLeverageRatio(contractValue: number, margin: number): number {
    return contractValue / margin;
  }

  /**
   * Calculate profit/loss for a long position
   * @param position Position details
   */
  static calculateLongPositionPnL(position: Position): number {
    const { openingPrice, closingPrice, contractSize, contractMultiplier } =
      position;
    return (closingPrice - openingPrice) * contractSize * contractMultiplier;
  }

  /**
   * Calculate profit/loss for a short position
   * @param position Position details
   */
  static calculateShortPositionPnL(position: Position): number {
    const { openingPrice, closingPrice, contractSize, contractMultiplier } =
      position;
    return (openingPrice - closingPrice) * contractSize * contractMultiplier;
  }

  /**
   * Calculate liquidation price for a long position
   * @param position Position details
   */
  static calculateLongLiquidationPrice(position: Position): number {
    const { openingPrice, leverage, maintenanceMarginRate } = position;
    return openingPrice * (1 - maintenanceMarginRate / leverage);
  }

  /**
   * Calculate liquidation price for a short position
   * @param position Position details
   */
  static calculateShortLiquidationPrice(position: Position): number {
    const { openingPrice, leverage, maintenanceMarginRate } = position;
    return openingPrice / (1 + maintenanceMarginRate / leverage);
  }

  /**
   * Calculate all metrics for a position
   * @param position Position details
   * @param isLong Whether the position is long (true) or short (false)
   */
  static calculatePositionMetrics(position: Position, isLong: boolean) {
    const contractValue =
      position.openingPrice *
      position.contractSize *
      position.contractMultiplier;
    const margin = this.calculateDynamicMargin(
      contractValue,
      position.marginRate
    );
    const leverage = this.calculateLeverageRatio(contractValue, margin);
    const pnl = isLong
      ? this.calculateLongPositionPnL(position)
      : this.calculateShortPositionPnL(position);
    const liquidationPrice = isLong
      ? this.calculateLongLiquidationPrice(position)
      : this.calculateShortLiquidationPrice(position);

    return {
      contractValue,
      margin,
      leverage,
      pnl,
      liquidationPrice,
      roi: (pnl / margin) * 100, // Return on Investment as percentage
    };
  }
}
