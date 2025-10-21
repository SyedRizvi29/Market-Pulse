import React from 'react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Bar } from 'recharts';
import type { CandlestickDataPoint } from '../types';

interface PriceChartProps {
  data: CandlestickDataPoint[];
  currentTimeframe: string;
  setTimeframe: (timeframe: string) => void;
}

const timeframes = ['15M', '1H', '4H', '1D'];

// Custom shape component to render a candlestick
const Candlestick = (props: any) => {
  const { x, y, width, height, open, close, high, low } = props;
  
  if (high === low) {
    return <line x1={x} y1={y} x2={x + width} y2={y} stroke="grey" strokeWidth={1} />;
  }

  const isBullish = close >= open;
  const color = isBullish ? '#34D399' : '#F87171';
  
  const pixelPerValue = height / (high - low);
  const bodyHeight = Math.max(1, Math.abs(open - close) * pixelPerValue);
  const bodyY = y + (high - Math.max(open, close)) * pixelPerValue;

  return (
    <g>
      <line x1={x + width / 2} y1={y} x2={x + width / 2} y2={y + height} stroke={color} strokeWidth={1} />
      <rect x={x} y={bodyY} width={width} height={bodyHeight} fill={color} />
    </g>
  );
};

// Custom tooltip for displaying OHLC data
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="p-2 bg-brand-surface border border-brand-primary rounded-md shadow-lg text-sm">
        <p className="label text-brand-text-muted">{`Time: ${label}`}</p>
        <p className="text-brand-text">{`Open: ${data.open}`}</p>
        <p className="text-brand-text">{`High: ${data.high}`}</p>
        <p className="text-brand-text">{`Low: ${data.low}`}</p>
        <p className="text-brand-text">{`Close: ${data.close}`}</p>
      </div>
    );
  }
  return null;
};

const PriceChart: React.FC<PriceChartProps> = ({ data, currentTimeframe, setTimeframe }) => {
  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-full text-brand-text-muted">No chart data available.</div>;
  }
  
  const chartDomain: [number, number] = [
    Math.min(...data.map(d => d.low)) - 5,
    Math.max(...data.map(d => d.high)) + 5,
  ];

  return (
    <div className="h-full w-full p-4 bg-brand-surface rounded-lg shadow-lg flex flex-col">
       <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-brand-text">GC Gold Futures Price Action</h3>
        <div className="flex items-center space-x-1 bg-brand-bg p-1 rounded-md">
          {timeframes.map(tf => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              aria-pressed={currentTimeframe === tf}
              className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                currentTimeframe === tf
                  ? 'bg-brand-primary text-white'
                  : 'bg-transparent text-brand-text-muted hover:bg-gray-700'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-grow">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis dataKey="time" tick={{ fill: '#A0A0A0' }} fontSize={12} tickLine={false} axisLine={false} />
            <YAxis domain={chartDomain} tick={{ fill: '#A0A0A0' }} fontSize={12} orientation="right" axisLine={false} tickLine={false}/>
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}/>
            <Bar dataKey={d => [d.low, d.high]} shape={<Candlestick />} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PriceChart;
