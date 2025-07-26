"use client";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { StockData, PredictionResult } from "./StockPredictor";

interface StockChartProps {
  data: StockData[];
  prediction: PredictionResult | null;
}

export default function StockChart({ data, prediction }: StockChartProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-2"></div>
          <p className="text-gray-500">Loading chart...</p>
        </div>
      </div>
    );
  }
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
        <div className="text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <p className="text-gray-500">No data available</p>
          <p className="text-sm text-gray-400">Load stock data to see the chart</p>
        </div>
      </div>
    );
  }

  const labels = data.map(item => item.date);
  const prices = data.map(item => item.price);

  // Add prediction point if available
  let chartLabels = [...labels];
  let chartPrices = [...prices];
  let predictionDataset = null;

  if (prediction) {
    const lastDate = new Date(data[data.length - 1].date);
    const nextDate = new Date(lastDate);
    nextDate.setDate(nextDate.getDate() + 1);
    const nextDateStr = nextDate.toISOString().split('T')[0];
    
    chartLabels.push(nextDateStr);
    chartPrices.push(null); // Gap for prediction
    
    // Create a more realistic prediction line
    const lastPrice = prices[prices.length - 1];
    const predictionChange = prediction.predictedPrice - lastPrice;
    
    predictionDataset = {
      label: 'Predicted Price',
      data: [...Array(labels.length).fill(null), prediction.predictedPrice],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.1)',
      borderWidth: 3,
      borderDash: [8, 4],
      pointBackgroundColor: prediction.predictedPrice > lastPrice ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 8,
      pointHoverRadius: 10,
    };
  }

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Historical Prices',
        data: chartPrices,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.1,
      },
      ...(predictionDataset ? [predictionDataset] : []),
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Date',
        },
        ticks: {
          maxTicksLimit: 10,
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Price ($)',
        },
        ticks: {
          callback: function(value: any) {
            return '$' + value.toFixed(2);
          },
        },
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
  };

  return (
    <div className="h-80">
      <Line data={chartData} options={options} />
      
      {prediction && (
        <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900">Next Day Prediction</h4>
              <p className="text-2xl font-bold text-purple-600">
                ${prediction.predictedPrice.toFixed(2)}
              </p>
            </div>
            <div className="text-right">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                prediction.trend === 'up' 
                  ? 'bg-green-100 text-green-800' 
                  : prediction.trend === 'down'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {prediction.trend === 'up' ? '↗' : prediction.trend === 'down' ? '↘' : '→'} {prediction.trend}
              </span>
              <p className="text-sm text-gray-600 mt-1">
                Confidence: {(prediction.confidence * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 