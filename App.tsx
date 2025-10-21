
import React, { useState, useEffect, useCallback } from 'react';
import type { FullAnalysis } from './types';
import { fetchMockChartData, fetchMockNews } from './services/mockDataService';
import { getAIAnalysis } from './services/analysisService';

import AnalysisPanel from './components/AnalysisPanel';
import LoadingSpinner from './components/LoadingSpinner';
import NewsFeed from './components/NewsFeed';
import PriceChart from './components/PriceChart';
import ScoreDisplay from './components/ScoreDisplay';


const App: React.FC = () => {
  const [analysisData, setAnalysisData] = useState<FullAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState<string>('15M');

  const fetchDataAndAnalyze = useCallback(async (selectedTimeframe: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const chartData = fetchMockChartData(selectedTimeframe);
      const news = fetchMockNews();
      const analysis = await getAIAnalysis(news, chartData);

      setAnalysisData({
        analysis,
        chartData,
        news,
      });
    } catch (e) {
      console.error(e);
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An unknown error occurred while fetching analysis.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDataAndAnalyze(timeframe);
  }, [timeframe, fetchDataAndAnalyze]);

  const handleRefresh = () => {
    fetchDataAndAnalyze(timeframe);
  };

  const handleSetTimeframe = (newTimeframe: string) => {
    setTimeframe(newTimeframe);
  };

  return (
    <div className="bg-brand-bg min-h-screen text-brand-text p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-brand-text">AI Trading Signal Dashboard</h1>
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="px-4 py-2 bg-brand-primary text-white font-semibold rounded-md hover:bg-opacity-90 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Refreshing...' : 'Refresh'}
          </button>
        </header>

        {error && (
          <div className="bg-brand-danger bg-opacity-80 text-white p-4 rounded-md mb-6" role="alert">
            <p><strong>Error:</strong> {error}</p>
          </div>
        )}

        {isLoading && !analysisData ? (
          <div className="flex justify-center items-center h-96">
            <LoadingSpinner />
          </div>
        ) : analysisData ? (
          <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-3">
              <PriceChart data={analysisData.chartData} currentTimeframe={timeframe} setTimeframe={handleSetTimeframe} />
            </div>
            
            <ScoreDisplay score={analysisData.analysis.score} />
            
            <NewsFeed news={analysisData.news} />
            
            <AnalysisPanel analysis={analysisData.analysis} />
          </main>
        ) : !error ? (
             <div className="text-center py-10 text-brand-text-muted">
                <p>No analysis data to display.</p>
             </div>
        ) : null}
      </div>
    </div>
  );
};

export default App;
