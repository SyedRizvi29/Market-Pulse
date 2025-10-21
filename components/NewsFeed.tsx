
import React from 'react';
import type { NewsItem } from '../types';

interface NewsFeedProps {
  news: NewsItem[];
}

const NewsFeed: React.FC<NewsFeedProps> = ({ news }) => {
  return (
    <div className="p-4 bg-brand-surface rounded-lg shadow-lg h-full">
      <h3 className="text-lg font-semibold mb-4 text-brand-text">Latest Headlines</h3>
      <ul className="space-y-3">
        {news.map(item => (
          <li key={item.id} className="border-b border-gray-700 pb-2 last:border-b-0">
            <p className="text-sm text-brand-text">{item.headline}</p>
            <p className="text-xs text-brand-text-muted text-right italic">- {item.source}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsFeed;
