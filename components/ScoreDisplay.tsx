
import React from 'react';

interface ScoreDisplayProps {
  score: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
  const getScoreColor = () => {
    if (score > 0) return 'text-brand-success';
    if (score < 0) return 'text-brand-danger';
    return 'text-brand-text-muted';
  };

  const getScoreLabel = () => {
    if (score >= 7) return 'Strong Long';
    if (score > 3) return 'Long';
    if (score > 0) return 'Weak Long';
    if (score === 0) return 'Neutral';
    if (score > -4) return 'Weak Short';
    if (score > -7) return 'Short';
    return 'Strong Short';
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-brand-surface rounded-lg shadow-lg h-full">
      <h3 className="text-xl font-semibold mb-2 text-brand-text">AI Signal Score</h3>
      <div className={`text-7xl font-bold ${getScoreColor()}`}>{score > 0 ? `+${score}` : score}</div>
      <div className={`mt-2 text-2xl font-medium ${getScoreColor()}`}>{getScoreLabel()}</div>
      <p className="text-xs text-brand-text-muted mt-4 text-center">Score from -10 (Strong Short) to +10 (Strong Long)</p>
    </div>
  );
};

export default ScoreDisplay;
