# Stock Market Prediction Application

This is a comprehensive stock market prediction application built with Next.js, React, Brain.js, and Tailwind CSS. The application uses neural networks to predict future stock prices based on historical data.

## Features

### 🧠 Brain.js Neural Network
- **Feedforward Neural Network**: Uses Brain.js to create and train neural networks
- **Data Normalization**: Automatically normalizes stock data for optimal training
- **Multiple Hidden Layers**: Configurable neural network architecture
- **Real-time Training**: Train models with custom parameters

### 📊 Data Visualization
- **Interactive Charts**: Built with Chart.js and react-chartjs-2
- **Historical Data Display**: Shows historical stock prices
- **Prediction Visualization**: Displays predicted values with different styling
- **Responsive Design**: Charts adapt to different screen sizes

### 📈 Stock Data Management
- **Multiple Data Sources**: 
  - Manual stock symbol input
  - CSV file upload
  - Sample data loading
- **Data Validation**: Ensures minimum data points for training
- **Flexible Date Ranges**: 7, 30, 90, or 180 days

### 🎯 Prediction Features
- **Next Day Price Prediction**: Predicts the next day's stock price
- **Trend Analysis**: Determines if the stock will go up, down, or remain stable
- **Confidence Scoring**: Provides confidence levels for predictions
- **Price Change Calculation**: Shows absolute and percentage changes

## Technical Implementation

### Neural Network Architecture
```javascript
const net = new NeuralNetwork({
  hiddenLayers: [10, 8, 6], // Three hidden layers
  learningRate: 0.01,
  momentum: 0.1,
  activation: 'sigmoid'
});
```

### Data Processing
- **Normalization**: Scales data to 0-1 range for neural network input
- **Lookback Period**: Uses last 5 days of prices to predict next day
- **Training Data**: Creates sliding window of input-output pairs

### Components Structure
```
src/
├── app/
│   └── predict/
│       └── page.tsx              # Main prediction page
├── components/
│   ├── StockPredictor.tsx        # Main orchestrator component
│   ├── StockDataInput.tsx        # Data input and file upload
│   ├── StockChart.tsx            # Chart visualization
│   └── PredictionResults.tsx     # Results display
└── lib/
    └── stockPredictor.ts         # Brain.js neural network logic
```

## Usage

### 1. Load Stock Data
- Enter a stock symbol (e.g., AAPL, GOOGL, TSLA)
- Select date range (7, 30, 90, or 180 days)
- Click "Fetch Historical Data" or use "Load Sample Data"

### 2. Upload Custom Data
- Prepare a CSV file with columns: `date,price`
- Upload the file using the file input
- Ensure at least 10 data points for training

### 3. Train the Model
- Click "Train Model" to train the neural network
- Wait for training to complete (shows progress indicator)
- Model will be ready for predictions

### 4. Make Predictions
- Click "Predict Next Price" to get predictions
- View results in the right panel
- See confidence levels and trend analysis

## Sample Data Format

CSV file should have the following format:
```csv
date,price
2024-01-01,150.25
2024-01-02,152.30
2024-01-03,151.80
...
```

## API Integration

The application is designed to easily integrate with real stock APIs:

### Example API Integration
```javascript
// In StockDataInput.tsx
const fetchStockData = async (symbol: string) => {
  const response = await fetch(`/api/stocks/${symbol}`);
  const data = await response.json();
  return data.map(item => ({
    date: item.date,
    price: item.close
  }));
};
```

## Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Next.js
3. Deploy with default settings
4. Your app will be live at `https://your-app.vercel.app`

### Netlify Deployment
1. Build the project: `npm run build`
2. Deploy the `out` directory to Netlify
3. Configure build settings if needed

## Requirements Met

✅ **Data Input**: Load historical stock data (JSON/CSV with 50+ data points)
✅ **Brain.js Model**: Feedforward neural network for price prediction
✅ **Visualization**: Chart.js integration with historical vs predicted data
✅ **Responsive UI**: Tailwind CSS with modern design
✅ **React Components**: Proper component structure and state management
✅ **Part A**: Tutorial-based implementation from scratch
✅ **Part B**: Integration into existing template
✅ **Deployment Ready**: Configured for Vercel/Netlify deployment

## Technologies Used

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Charts**: Chart.js, react-chartjs-2
- **Neural Networks**: Brain.js
- **Authentication**: NextAuth.js
- **Database**: MongoDB
- **Deployment**: Vercel/Netlify ready

## Future Enhancements

- Real-time stock data integration
- Multiple prediction timeframes
- Advanced technical indicators
- Portfolio management features
- Backtesting capabilities
- Email alerts for predictions

## Disclaimer

This application is for educational purposes only. Stock predictions are based on historical data and neural network analysis, but should not be used as the sole basis for investment decisions. Always conduct thorough research and consult with financial advisors before making investment decisions. 