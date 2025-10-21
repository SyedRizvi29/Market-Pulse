
import { fetchMockChartData, fetchMockNews } from './mockDataService';
import type { CandlestickDataPoint, NewsItem } from '../types';

/**
 * NOTE: This is a placeholder implementation for a live data service.
 * It is not currently used in the main application flow but is provided
 * to resolve build errors.
 */

type DataCallback = (data: { chartData: CandlestickDataPoint[], news: NewsItem[] }) => void;

let intervalId: number | null = null;

const fetchLiveData = (timeframe: string, callback: DataCallback) => {
    const chartData = fetchMockChartData(timeframe);
    const news = fetchMockNews();
    callback({ chartData, news });
};

export const startLiveDataUpdates = (timeframe: string, callback: DataCallback, interval = 15000) => {
    if (intervalId) {
        stopLiveDataUpdates();
    }
    fetchLiveData(timeframe, callback);
    intervalId = window.setInterval(() => fetchLiveData(timeframe, callback), interval);
};

export const stopLiveDataUpdates = () => {
    if (intervalId) {
        window.clearInterval(intervalId);
        intervalId = null;
    }
};
