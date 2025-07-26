"use client";
import { useState, useEffect } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import StockDataInput from "./StockDataInput";
import StockChart from "./StockChart";
import PredictionResults from "./PredictionResults";
import { trainModel, predictPrice } from "@/lib/stockPredictor";

// Only register Chart.js on the client side
if (typeof window !== 'undefined') {
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
}

export interface StockData {
  date: string;
  price: number;
}

export interface PredictionResult {
  predictedPrice: number;
  confidence: number;
  trend: "up" | "down" | "stable";
}

export default function StockPredictor() {
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isTraining, setIsTraining] = useState(false);
  const [isPredicting, setIsPredicting] = useState(false);
  const [model, setModel] = useState<any>(null);

  const handleDataLoad = (data: StockData[]) => {
    setStockData(data);
    setPrediction(null);
  };

  const handleTrainModel = async () => {
    if (stockData.length < 10) {
      alert("Please provide at least 10 data points for training.");
      return;
    }

    setIsTraining(true);
    try {
      const trainedModel = await trainModel(stockData);
      setModel(trainedModel);
      alert("Model trained successfully!");
    } catch (error) {
      console.error("Training error:", error);
      alert("Error training model. Please try again.");
    } finally {
      setIsTraining(false);
    }
  };

  const handlePredict = async () => {
    if (!model) {
      alert("Please train the model first.");
      return;
    }

    if (stockData.length === 0) {
      alert("Please load stock data first.");
      return;
    }

    setIsPredicting(true);
    try {
      const result = await predictPrice(model, stockData);
      setPrediction(result);
    } catch (error) {
      console.error("Prediction error:", error);
      alert("Error making prediction. Please try again.");
    } finally {
      setIsPredicting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Panel - Data Input */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Input</h2>
          <StockDataInput onDataLoad={handleDataLoad} />
          
          <div className="mt-6 space-y-4">
            <button
              onClick={handleTrainModel}
              disabled={isTraining || stockData.length === 0}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {isTraining ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Training Model...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Train Model
                </>
              )}
            </button>
            
            <button
              onClick={handlePredict}
              disabled={isPredicting || !model || stockData.length === 0}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {isPredicting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Predicting...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Predict Next Price
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Middle Panel - Chart */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Stock Price Chart</h2>
          <StockChart data={stockData} prediction={prediction} />
        </div>
      </div>

      {/* Right Panel - Results */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Prediction Results</h2>
          <PredictionResults prediction={prediction} stockData={stockData} />
        </div>
      </div>
    </div>
  );
} 