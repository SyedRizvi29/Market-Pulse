import type { CandlestickDataPoint, NewsItem } from '../types';

const newsHeadlines = [
  "Fed Hints at Slower Rate Hikes, Boosting Gold Prices",
  "Global Geopolitical Tensions Rise, Investors Flock to Safe Havens",
  "Strong US Dollar Caps Gold's Gains Despite Inflation Fears",
  "Major Central Banks Signal Hawkish Stance on Inflation",
  "Tech Stocks Rally, Diverting Funds from Commodities",
  "New Inflation Report Comes in Hotter Than Expected",
  "US Jobless Claims Fall, Indicating a Strong Labor Market",
  "Conflict in Eastern Europe Escalates, Gold Surges",
  "Analysts Predict Bearish Trend for Commodities Amid Recession Fears",
  "China's Economic Slowdown Weighs on Global Demand"
];

const newsSources = ["Reuters", "Bloomberg", "Wall Street Journal", "Financial Times"];

export const fetchMockNews = (): NewsItem[] => {
  const selectedNews: NewsItem[] = [];
  const usedIndexes = new Set<number>();
  while (selectedNews.length < 5) {
    const randomIndex = Math.floor(Math.random() * newsHeadlines.length);
    if (!usedIndexes.has(randomIndex)) {
      selectedNews.push({
        id: randomIndex,
        headline: newsHeadlines[randomIndex],
        source: newsSources[Math.floor(Math.random() * newsSources.length)]
      });
      usedIndexes.add(randomIndex);
    }
  }
  return selectedNews;
};

let lastClose = 1850.00;

export const fetchMockChartData = (timeframe: string): CandlestickDataPoint[] => {
    const data: CandlestickDataPoint[] = [];
    
    // Adjust volatility based on timeframe for more realistic mock data
    const volatility = timeframe === '15M' ? 5 : timeframe === '1H' ? 10 : timeframe === '4H' ? 15 : 20;

    for (let i = 0; i < 60; i++) {
        const open = (i === 0) ? lastClose + ((Math.random() - 0.5) * (volatility / 4)) : data[i-1].close;
        const close = open + (Math.random() - 0.5) * volatility;
        const high = Math.max(open, close) + Math.random() * (volatility / 2);
        const low = Math.min(open, close) - Math.random() * (volatility / 2);

        data.push({
            time: `T-${59 - i}`,
            open: parseFloat(open.toFixed(2)),
            high: parseFloat(high.toFixed(2)),
            low: parseFloat(low.toFixed(2)),
            close: parseFloat(close.toFixed(2)),
        });
    }
    lastClose = data[data.length - 1].close; // Update for next fetch
    return data;
};
