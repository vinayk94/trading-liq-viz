# Power Market Simulation

## Overview

This project aims to simulate the dynamics of power markets, with a focus on demonstrating how financial products impact market liquidity, efficiency, and stability. It provides an interactive web-based interface where users can adjust key parameters and observe their effects on various market metrics.

## Current Functionality

- Interactive sliders for adjusting:
  - Financial Trading Level
  - Renewable Energy Penetration
  - Demand Volatility
- Visualizations:
  - Price and Liquidity chart
  - Volume and Renewable Generation chart
- Market metrics display
- Comparison feature to show low vs. high trading scenarios

## Key Concepts and Calculations

### Financial Trading Level
Represents the extent of financial product usage in the market. Higher levels are hypothesized to lead to improved liquidity and efficiency.

### Renewable Penetration
Indicates the proportion of energy generated from renewable sources. Higher penetration may introduce more variability into the supply side.

### Demand Volatility
Reflects the variability in energy demand, which can increase price fluctuations and market uncertainty.

### Price Calculation
```
supplyDemandPrice = basePrice * (demand / (baseDemand + renewableGeneration))
tradingImpact = (100 - financialTradingLevel) / 1000
price = supplyDemandPrice * (1 - tradingImpact) + prevPrice * tradingImpact
```
This calculation attempts to model how financial trading might smooth price movements.

### Volume Calculation
```
volume = baseDemand * (1 + financialTradingLevel / 100)
```
Assumes that higher financial trading levels increase overall market activity.

### Bid-Ask Spread
```
spread = Math.max(0.1, 1 + (Math.random() * 2 - (financialTradingLevel / 25)))
```
A proxy for liquidity, with higher financial trading levels generally leading to tighter spreads.

### Price Efficiency
```
priceEfficiency = 100 - (priceDiscoverySpeed / periods / basePrice * 100)
```
Attempts to measure how closely market prices track the theoretical supply-demand price.

### Market Volatility
```
volatility = Math.sqrt(sum of squared price changes / number of periods)
```
Measures the degree of variation in price over time.

### Liquidity
```
liquidity = averageVolume / marketVolatility
```
A simplified measure assuming that higher volumes and lower volatility indicate better liquidity.

## Hypothesis

The core hypothesis of this simulation is that increased use of financial products in power markets leads to:
1. Improved liquidity (tighter bid-ask spreads, higher volumes)
2. Greater price efficiency (prices more closely reflecting supply-demand fundamentals)
3. Reduced volatility (smoother price movements)
4. Better ability to integrate renewable energy sources

However, it's important to note that this is a simplified model and real-world markets are significantly more complex.

## Known Issues and TODOs

1. Efficiency Description Update: The text description of market efficiency doesn't always accurately reflect the calculated efficiency value.
2. InfoPopover Display: The info popovers are currently displaying as question marks instead of the intended icon.
3. Model Refinement: The current price and volume calculations are simplistic and could be refined to better reflect real-world dynamics.
4. Additional Metrics: Consider adding more sophisticated metrics like the Herfindahl-Hirschman Index for market concentration.
5. Validation: The model's outputs should be compared against real-world data to assess its accuracy and adjust as necessary.

## Reflections

This simulation is a work in progress and represents an initial attempt to model complex market dynamics in a simplified, interactive format. While it provides a foundation for exploring the hypothesized effects of financial products in power markets, it's important to approach the results with caution.

The current implementation has limitations in both its mathematical model and its user interface. 


# Power Market Simulation

## Live Demo

You can interact with the current version of the Power Market Simulation here: [https://vinayk94.github.io/trading-liq-viz/](https://vinayk94.github.io/trading-liq-viz/)


## How to Use

1. Visit the [live demo](https://vinayk94.github.io/trading-liq-viz/).
2. Use the sliders to adjust the Financial Trading Level, Renewable Penetration, and Demand Volatility.
3. Observe how these changes affect the Price & Liquidity chart, Volume & Renewable Generation chart, and the market metrics displayed below.
4. Click the "Show Comparison" button to see how different levels of financial trading impact the market.

## Local Development

If you want to run this project locally or contribute to its development:

1. Clone the repository:
   ```
   git clone https://vinayk94.github.io/trading-liq-viz/.git
   ```
2. Navigate to the project directory:
   ```
   cd trading-liq-viz
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm start
   ```
5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Feedback and Contributions

I welcome feedback, bug reports, and contributions. Please feel free to open an issue or submit a pull request on the [GitHub repository](https://vinayk94.github.io/trading-liq-viz/).

