export interface CandlestickDataPoint {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface NewsItem {
  id: number;
  headline: string;
  source: string;
}

export interface AnalysisResult {
  score: number;
  justification: string;
  key_news_sentiment: string;
  key_chart_signal: string;
}

export interface FullAnalysis {
    analysis: AnalysisResult;
    chartData: CandlestickDataPoint[];
    news: NewsItem[];
}
