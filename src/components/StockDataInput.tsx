"use client";
import { useState } from "react";
import { StockData } from "./StockPredictor";

interface StockDataInputProps {
  onDataLoad: (data: StockData[]) => void;
}

export default function StockDataInput({ onDataLoad }: StockDataInputProps) {
  const [stockSymbol, setStockSymbol] = useState("");
  const [dateRange, setDateRange] = useState("30");
  const [isLoading, setIsLoading] = useState(false);

  // Sample stock data for demonstration
  const sampleData: StockData[] = [
    { date: "2024-01-01", price: 150.25 },
    { date: "2024-01-02", price: 152.30 },
    { date: "2024-01-03", price: 151.80 },
    { date: "2024-01-04", price: 153.45 },
    { date: "2024-01-05", price: 154.20 },
    { date: "2024-01-08", price: 155.10 },
    { date: "2024-01-09", price: 156.75 },
    { date: "2024-01-10", price: 157.30 },
    { date: "2024-01-11", price: 158.90 },
    { date: "2024-01-12", price: 159.45 },
    { date: "2024-01-15", price: 160.20 },
    { date: "2024-01-16", price: 161.80 },
    { date: "2024-01-17", price: 162.40 },
    { date: "2024-01-18", price: 163.15 },
    { date: "2024-01-19", price: 164.30 },
    { date: "2024-01-22", price: 165.75 },
    { date: "2024-01-23", price: 166.90 },
    { date: "2024-01-24", price: 167.45 },
    { date: "2024-01-25", price: 168.20 },
    { date: "2024-01-26", price: 169.10 },
    { date: "2024-01-29", price: 170.30 },
    { date: "2024-01-30", price: 171.80 },
    { date: "2024-01-31", price: 172.45 },
    { date: "2024-02-01", price: 173.20 },
    { date: "2024-02-02", price: 174.10 },
    { date: "2024-02-05", price: 175.30 },
    { date: "2024-02-06", price: 176.80 },
    { date: "2024-02-07", price: 177.45 },
    { date: "2024-02-08", price: 178.20 },
    { date: "2024-02-09", price: 179.10 },
    { date: "2024-02-12", price: 180.30 },
    { date: "2024-02-13", price: 181.80 },
    { date: "2024-02-14", price: 182.45 },
    { date: "2024-02-15", price: 183.20 },
    { date: "2024-02-16", price: 184.10 },
    { date: "2024-02-19", price: 185.30 },
    { date: "2024-02-20", price: 186.80 },
    { date: "2024-02-21", price: 187.45 },
    { date: "2024-02-22", price: 188.20 },
    { date: "2024-02-23", price: 189.10 },
    { date: "2024-02-26", price: 190.30 },
    { date: "2024-02-27", price: 191.80 },
    { date: "2024-02-28", price: 192.45 },
    { date: "2024-02-29", price: 193.20 },
    { date: "2024-03-01", price: 194.10 },
    { date: "2024-03-04", price: 195.30 },
    { date: "2024-03-05", price: 196.80 },
    { date: "2024-03-06", price: 197.45 },
    { date: "2024-03-07", price: 198.20 },
    { date: "2024-03-08", price: 199.10 },
    { date: "2024-03-11", price: 200.30 },
    { date: "2024-03-12", price: 201.80 },
    { date: "2024-03-13", price: 202.45 },
    { date: "2024-03-14", price: 203.20 },
    { date: "2024-03-15", price: 204.10 },
  ];

  const handleFetchData = async () => {
    if (!stockSymbol.trim()) {
      alert("Please enter a stock symbol.");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll use sample data
      // In a real app, you would fetch from a stock API
      onDataLoad(sampleData);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error fetching stock data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split('\n').filter(line => line.trim());
        
        const data: StockData[] = lines.slice(1).map((line, index) => {
          const [date, price] = line.split(',');
          return {
            date: date || `2024-${String(Math.floor(index / 30) + 1).padStart(2, '0')}-${String((index % 30) + 1).padStart(2, '0')}`,
            price: parseFloat(price) || 150 + Math.random() * 50
          };
        });

        if (data.length >= 10) {
          onDataLoad(data);
        } else {
          alert("Please provide at least 10 data points.");
        }
      } catch (error) {
        console.error("Error parsing file:", error);
        alert("Error parsing file. Please check the format.");
      }
    };
    reader.readAsText(file);
  };

  const handleLoadSampleData = () => {
    onDataLoad(sampleData);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          STOCK SYMBOL
        </label>
        <input
          type="text"
          value={stockSymbol}
          onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
          placeholder="e.g. AAPL, GOOGL, TSLA"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          DATE RANGE
        </label>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="7">7 days</option>
          <option value="30">30 days</option>
          <option value="90">90 days</option>
          <option value="180">180 days</option>
        </select>
      </div>

      <button
        onClick={handleFetchData}
        disabled={isLoading || !stockSymbol.trim()}
        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Fetching Data...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Fetch Historical Data
          </>
        )}
      </button>

      <div className="border-t pt-4">
        <p className="text-sm text-gray-600 mb-3">Or upload a CSV file:</p>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
      </div>

      <div className="border-t pt-4">
        <button
          onClick={handleLoadSampleData}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
        >
          Load Sample Data
        </button>
      </div>
    </div>
  );
} 