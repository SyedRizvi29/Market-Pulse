
import React from 'react';
import type { AnalysisResult } from '../types';

interface AnalysisPanelProps {
  analysis: AnalysisResult;
}

const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ analysis }) => {
  return (
    <div className="p-6 bg-brand-surface rounded-lg shadow-lg h-full flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-brand-text">AI Analyst Justification</h3>
        <p className="text-brand-text mb-6 italic">"{analysis.justification}"</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-brand-bg rounded-md">
          <h4 className="font-semibold text-brand-secondary mb-1">News Sentiment</h4>
          <p className="text-sm text-brand-text-muted">{analysis.key_news_sentiment}</p>
        </div>
        <div className="p-4 bg-brand-bg rounded-md">
          <h4 className="font-semibold text-brand-secondary mb-1">Chart Signal</h4>
          <p className="text-sm text-brand-text-muted">{analysis.key_chart_signal}</p>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPanel;
