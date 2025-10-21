import { GoogleGenAI, Type } from "@google/genai";
import type { CandlestickDataPoint, NewsItem, AnalysisResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema = {
    type: Type.OBJECT,
    properties: {
        score: { 
            type: Type.INTEGER, 
            description: "A score from -10 (strong short) to +10 (strong long)." 
        },
        justification: { 
            type: Type.STRING, 
            description: "A brief, 2-3 sentence explanation for the score, citing news sentiment and chart patterns." 
        },
        key_news_sentiment: { 
            type: Type.STRING, 
            description: "Summarize the overall sentiment from the news headlines (e.g., 'Bullish due to inflation fears')." 
        },
        key_chart_signal: { 
            type: Type.STRING, 
            description: "Summarize the key signal from the candlestick chart (e.g., 'Bearish trend, evening star pattern forming')." 
        }
    },
    required: ["score", "justification", "key_news_sentiment", "key_chart_signal"]
};


export const getAIAnalysis = async (news: NewsItem[], chartData: CandlestickDataPoint[]): Promise<AnalysisResult> => {
    try {
        const newsHeadlines = news.map(item => `- ${item.headline}`).join('\n');
        const chartDataString = JSON.stringify(chartData.slice(-30).map(d => ({ time: d.time, o: d.open, h: d.high, l: d.low, c: d.close })));

        const prompt = `
            Analyze the following information for Gold Futures (GC) and provide a trading signal score from -10 (strong short) to +10 (strong long).

            **Recent News Headlines:**
            ${newsHeadlines}

            **Recent OHLC Price Data (last 30 periods):**
            ${chartDataString}

            Based on the news sentiment (geopolitical tensions, inflation data, central bank policies) and the candlestick chart's technical indicators (trends, patterns like dojis or engulfing candles, momentum, support/resistance levels), provide your analysis in the requested JSON format.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: analysisSchema,
            },
        });

        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText) as AnalysisResult;
        return result;

    } catch (error) {
        console.error("Error getting AI analysis:", error);
        throw new Error("Failed to get analysis from AI. Please check the API key and configuration.");
    }
};
