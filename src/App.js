import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Slider, Card, CardHeader, CardContent } from './components/ui/card'; 

const PowerMarketSimulation = () => {
  const [data, setData] = useState([]);
  const [financialTradingLevel, setFinancialTradingLevel] = useState(50);
  const [renewablePenetration, setRenewablePenetration] = useState(30);
  const [demandVolatility, setDemandVolatility] = useState(20);

  useEffect(() => {
    generateSimulationData();
  }, [financialTradingLevel, renewablePenetration, demandVolatility]);

  const generateSimulationData = () => {
    const periods = 100;
    const basePrice = 50;
    const baseDemand = 1000;
    
    let newData = [];
    for (let i = 0; i < periods; i++) {
      const renewableGeneration = Math.random() * renewablePenetration * 10;
      const demand = baseDemand + (Math.random() - 0.5) * demandVolatility * 20;
      
      // Price calculation based on supply-demand and financial trading
      const rawPrice = basePrice * (demand / (baseDemand + renewableGeneration));
      const tradingImpact = (100 - financialTradingLevel) / 100;
      const price = rawPrice * tradingImpact + basePrice * (1 - tradingImpact);
      
      // Liquidity calculation (simplified)
      const liquidity = 100 + financialTradingLevel * 2 - Math.abs(price - basePrice);
      
      newData.push({
        period: i + 1,
        price: parseFloat(price.toFixed(2)),
        demand,
        renewableGeneration,
        liquidity: Math.max(0, liquidity),
      });
    }
    setData(newData);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold">Power Market Simulation</h2>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <label className="block mb-2">Financial Trading Level: {financialTradingLevel}%</label>
          <Slider
            min={0}
            max={100}
            value={financialTradingLevel}
            onChange={(e) => setFinancialTradingLevel(Number(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Renewable Penetration: {renewablePenetration}%</label>
          <Slider
            min={0}
            max={100}
            value={renewablePenetration}
            onChange={(e) => setRenewablePenetration(Number(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Demand Volatility: {demandVolatility}%</label>
          <Slider
            min={0}
            max={100}
            value={demandVolatility}
            onChange={(e) => setDemandVolatility(Number(e.target.value))}
          />
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="price" stroke="#8884d8" name="Price" />
            <Line yAxisId="right" type="monotone" dataKey="liquidity" stroke="#82ca9d" name="Liquidity" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PowerMarketSimulation;