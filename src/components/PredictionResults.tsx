"use client";
import { StockData, PredictionResult } from "./StockPredictor";

interface PredictionResultsProps {
  prediction: PredictionResult | null;
  stockData: StockData[];
}

export default function PredictionResults({ prediction, stockData }: PredictionResultsProps) {
  if (!prediction) {
    return (
      <div className="space-y-4">
        <div className="text-center py-8">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Prediction Yet</h3>
          <p className="text-gray-600">Train the model and make a prediction to see results here.</p>
        </div>
      </div>
    );
  }

  const lastPrice = stockData[stockData.length - 1]?.price || 0;
  const priceChange = prediction.predictedPrice - lastPrice;
  const priceChangePercent = (priceChange / lastPrice) * 100;

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600 bg-green-100';
      case 'down':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Main Prediction Card */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Prediction Summary</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Predicted Price:</span>
            <span className="text-2xl font-bold text-purple-600">
              ${prediction.predictedPrice.toFixed(2)}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Current Price:</span>
            <span className="text-lg font-semibold text-gray-900">
              ${lastPrice.toFixed(2)}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Price Change:</span>
            <span className={`text-lg font-semibold ${priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {priceChange >= 0 ? '+' : ''}${priceChange.toFixed(2)} ({priceChangePercent >= 0 ? '+' : ''}{priceChangePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>

      {/* Trend Analysis */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Trend Analysis</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Predicted Trend:</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTrendColor(prediction.trend)}`}>
              {prediction.trend === 'up' ? '↗' : prediction.trend === 'down' ? '↘' : '→'} {prediction.trend.toUpperCase()}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Confidence Level:</span>
            <span className={`font-semibold ${getConfidenceColor(prediction.confidence)}`}>
              {(prediction.confidence * 100).toFixed(1)}%
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Data Points Used:</span>
            <span className="font-semibold text-gray-900">{stockData.length}</span>
          </div>
        </div>
      </div>

      {/* Model Information */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Model Information</h3>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Model Type:</span>
            <span className="font-medium">Neural Network (Brain.js)</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Training Data:</span>
            <span className="font-medium">{stockData.length} historical prices</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Prediction Type:</span>
            <span className="font-medium">Next Day Price</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Time Range:</span>
            <span className="font-medium">
              {stockData[0]?.date} to {stockData[stockData.length - 1]?.date}
            </span>
          </div>
        </div>
      </div>


    </div>
  );
} 