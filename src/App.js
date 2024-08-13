import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Slider, Card, CardHeader, CardContent, Button, InfoPopover } from './components/ui/card';

const PowerMarketSimulation = () => {
  const [data, setData] = useState([]);
  const [financialTradingLevel, setFinancialTradingLevel] = useState(50);
  const [renewablePenetration, setRenewablePenetration] = useState(30);
  const [demandVolatility, setDemandVolatility] = useState(20);
  const [marketMetrics, setMarketMetrics] = useState({});
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    generateSimulationData();
  }, [financialTradingLevel, renewablePenetration, demandVolatility, showComparison]);

  const generateSimulationData = () => {
    const periods = 100;
    const basePrice = 50;
    const baseDemand = 1000;
    
    let newData = [];
    let totalVolume = 0;
    let priceDiscoverySpeed = 0;
    let volatility = 0;
    let prevPrice = basePrice;

    for (let i = 0; i < periods; i++) {
      const renewableGeneration = Math.random() * renewablePenetration * 10;
      const demand = baseDemand + (Math.random() - 0.5) * demandVolatility * 20;
      
      // Price calculation
      const supplyDemandPrice = basePrice * (demand / (baseDemand + renewableGeneration));
      const tradingImpact = (100 - financialTradingLevel) / 1000;
      const price = supplyDemandPrice * (1 - tradingImpact) + prevPrice * tradingImpact;
      
      // Volume calculation
      const volume = baseDemand * (1 + financialTradingLevel / 100);
      totalVolume += volume;

      // Bid-ask spread (proxy for liquidity)
      const spread = Math.max(0.1, 1 + (Math.random() * 2 - (financialTradingLevel / 25)));

      // Price discovery speed
      priceDiscoverySpeed += Math.abs(price - supplyDemandPrice);

      // Volatility
      volatility += Math.pow(price - prevPrice, 2);

      newData.push({
        period: i + 1,
        price: parseFloat(price.toFixed(2)),
        demand,
        renewableGeneration,
        volume,
        spread,
      });

      prevPrice = price;
    }

    if (showComparison) {
      const lowTradingData = generateDataSet(10); // 10% financial trading
      const highTradingData = generateDataSet(90); // 90% financial trading
      newData = newData.map((item, index) => ({
        ...item,
        lowTradingPrice: lowTradingData[index].price,
        highTradingPrice: highTradingData[index].price,
      }));
    }

    setData(newData);

    // Calculate market metrics
    const avgVolume = totalVolume / periods;
    const priceEfficiency = 100 - (priceDiscoverySpeed / periods / basePrice * 100);
    const marketVolatility = Math.sqrt(volatility / periods);
    const liquidity = avgVolume / marketVolatility;

    setMarketMetrics({
      avgVolume: avgVolume.toFixed(2),
      priceEfficiency: priceEfficiency.toFixed(2),
      marketVolatility: marketVolatility.toFixed(2),
      liquidity: liquidity.toFixed(2),
    });
  };

  const generateDataSet = (tradingLevel) => {
    const periods = 100;
    const basePrice = 50;
    const baseDemand = 1000;
    
    let dataset = [];
    let prevPrice = basePrice;

    for (let i = 0; i < periods; i++) {
      const renewableGeneration = Math.random() * renewablePenetration * 10;
      const demand = baseDemand + (Math.random() - 0.5) * demandVolatility * 20;
      
      // Price calculation
      const supplyDemandPrice = basePrice * (demand / (baseDemand + renewableGeneration));
      const tradingImpact = (100 - tradingLevel) / 1000;
      const price = supplyDemandPrice * (1 - tradingImpact) + prevPrice * tradingImpact;

      dataset.push({
        period: i + 1,
        price: parseFloat(price.toFixed(2)),
      });

      prevPrice = price;
    }

    return dataset;
  };

  const renderTooltip = (props) => {
    const { active, payload } = props;
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-md rounded-md">
          {payload.map((entry, index) => (
            <p key={index} className="text-sm">
              <span style={{ color: entry.color }}>{entry.name}</span>: {entry.value.toFixed(2)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const getEfficiencyDescription = (efficiency) => {
    efficiency = parseFloat(efficiency);
    if (efficiency > 95) return "highly efficient";
    if (efficiency > 80) return "efficient";
    if (efficiency > 60) return "moderately efficient";
    return "inefficient";
  };

  return (
    <Card className="w-full max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-green-50">
      <CardHeader>
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-800">Power Market Simulation</h2>
        <p className="text-center text-sm text-gray-600">
          Explore how financial products impact market liquidity, efficiency, and stability in power markets.
          Adjust the parameters below to see their effects on the market dynamics.
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block mb-2 font-semibold text-blue-700">
              Financial Trading Level: {financialTradingLevel}%
              <InfoPopover 
                title="Financial Trading Level" 
                content="Represents the extent of financial product usage in the market. Higher levels typically lead to improved liquidity and efficiency."
              />
            </label>
            <Slider
              min={0}
              max={100}
              value={financialTradingLevel}
              onChange={(e) => setFinancialTradingLevel(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-blue-700">
              Renewable Penetration: {renewablePenetration}%
              <InfoPopover 
                title="Renewable Penetration" 
                content="Indicates the proportion of energy generated from renewable sources. Higher penetration may lead to greater price volatility."
              />
            </label>
            <Slider
              min={0}
              max={100}
              value={renewablePenetration}
              onChange={(e) => setRenewablePenetration(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-blue-700">
              Demand Volatility: {demandVolatility}%
              <InfoPopover 
                title="Demand Volatility" 
                content="Reflects the variability in demand. Higher volatility can increase price fluctuations and market uncertainty."
              />
            </label>
            <Slider
              min={0}
              max={100}
              value={demandVolatility}
              onChange={(e) => setDemandVolatility(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        <Button 
          onClick={() => setShowComparison(!showComparison)} 
          className="mb-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {showComparison ? "Hide Comparison" : "Show Comparison"}
        </Button>

        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-blue-800">Price & Liquidity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="period" stroke="#666" />
              <YAxis yAxisId="left" stroke="#666" />
              <YAxis yAxisId="right" orientation="right" stroke="#666" />
              <Tooltip content={renderTooltip} />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="price" stroke="#8884d8" name="Price" strokeWidth={2} />
              <Line yAxisId="right" type="monotone" dataKey="spread" stroke="#82ca9d" name="Bid-Ask Spread" strokeWidth={2} />
              {showComparison && (
                <>
                  <Line yAxisId="left" type="monotone" dataKey="lowTradingPrice" stroke="#ff7300" name="Low Trading Price" strokeWidth={2} strokeDasharray="5 5" />
                  <Line yAxisId="left" type="monotone" dataKey="highTradingPrice" stroke="#0088FE" name="High Trading Price" strokeWidth={2} strokeDasharray="5 5" />
                </>
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-blue-800">Volume & Renewable Generation</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="period" stroke="#666" />
              <YAxis yAxisId="left" stroke="#666" />
              <Tooltip content={renderTooltip} />
              <Legend />
              <Bar yAxisId="left" dataKey="volume" fill="#8884d8" name="Trading Volume" />
              <Bar yAxisId="left" dataKey="renewableGeneration" fill="#82ca9d" name="Renewable Generation" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-6">
          {Object.entries(marketMetrics).map(([key, value]) => (
            <Card key={key} className="p-4 bg-white shadow-md rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-blue-700">{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
              <p className="text-2xl font-bold text-blue-900">{value}</p>
              <InfoPopover 
                title={key.charAt(0).toUpperCase() + key.slice(1)} 
                content={getMetricDescription(key)}
              />
            </Card>
          ))}
        </div>

        <div className="mt-8 p-6 bg-blue-50 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-blue-800">Key Takeaways</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            With {financialTradingLevel}% financial trading, the market is {getEfficiencyDescription(marketMetrics.priceEfficiency)}, 
            liquidity is {parseFloat(marketMetrics.liquidity) > 50 ? "strong" : "weak"}, and 
            price volatility is {parseFloat(marketMetrics.marketVolatility) < 10 ? "low" : "high"}.
            {showComparison && " Compare this with the low and high trading scenarios to see the impact of financial products."}
          </p>
          <p className="text-sm text-gray-700 mt-4">
            These results demonstrate how financial products can enhance market efficiency and stability,
            particularly in markets with high renewable penetration and demand volatility.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

const getMetricDescription = (key) => {
  const descriptions = {
    avgVolume: "Average trading volume. Higher values indicate more market activity.",
    priceEfficiency: "Measure of how closely prices reflect true supply and demand. Higher is better.",
    marketVolatility: "Measure of price fluctuations. Lower values indicate a more stable market.",
    liquidity: "Ease of buying or selling without causing significant price changes. Higher is better."
  };
  return descriptions[key] || "No description available.";
};

export default PowerMarketSimulation;