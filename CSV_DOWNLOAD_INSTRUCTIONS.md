# CSV Files for Stock Prediction Testing

I've created several CSV files with different stock data patterns for testing the prediction feature. Here's how to download and use them:

## 📁 Available CSV Files

### 1. **stock-data-samples.csv** (Steady Growth)
- **Pattern**: Consistent upward trend
- **Price Range**: $150.25 → $235.30
- **Characteristics**: Stable growth with minimal volatility
- **Best for**: Testing bullish predictions

### 2. **volatile-stock-data.csv** (High Volatility)
- **Pattern**: Dramatic price swings with overall upward trend
- **Price Range**: $100.00 → $300.30
- **Characteristics**: High volatility with sharp ups and downs
- **Best for**: Testing model performance with volatile data

### 3. **declining-stock-data.csv** (Bearish Trend)
- **Pattern**: Consistent downward trend
- **Price Range**: $200.00 → $0.00
- **Characteristics**: Steady decline over time
- **Best for**: Testing bearish predictions

## 📥 How to Download

### Method 1: Direct Download from Browser
1. Go to your application: `http://localhost:3000` (or 3001)
2. Navigate to the predict page: `/predict`
3. In the file upload section, you can access these files at:
   - `http://localhost:3000/public/stock-data-samples.csv`
   - `http://localhost:3000/public/volatile-stock-data.csv`
   - `http://localhost:3000/public/declining-stock-data.csv`

### Method 2: Copy from File System
The files are located in your project at:
- `public/stock-data-samples.csv`
- `public/volatile-stock-data.csv`
- `public/declining-stock-data.csv`

## 🧪 Testing Instructions

### Step 1: Access the Prediction Page
1. Login to your application
2. Navigate to `/predict`
3. You should see the stock prediction interface

### Step 2: Upload CSV File
1. Click "Choose File" in the file upload section
2. Select one of the CSV files
3. The data should automatically load

### Step 3: Train the Model
1. Click "Train Model" button
2. Wait for training to complete
3. You should see "Model trained successfully!"

### Step 4: Make Predictions
1. Click "Predict Next Price" button
2. View the results in the right panel
3. Check the chart for visualization

## 📊 Expected Results

### For stock-data-samples.csv:
- **Predicted Trend**: UP
- **Confidence**: High (70-85%)
- **Price Movement**: Small to moderate increase

### For volatile-stock-data.csv:
- **Predicted Trend**: UP (with lower confidence)
- **Confidence**: Medium (50-70%)
- **Price Movement**: Variable due to volatility

### For declining-stock-data.csv:
- **Predicted Trend**: DOWN
- **Confidence**: High (70-85%)
- **Price Movement**: Continued decline

## 🔧 Troubleshooting

### If files don't upload:
1. Ensure the CSV format is correct (date,price headers)
2. Check that the file has at least 10 data points
3. Verify the file is not corrupted

### If training fails:
1. Try with the sample data first
2. Ensure you have at least 10 data points
3. Check browser console for errors

### If predictions seem inaccurate:
1. This is expected - the model is for educational purposes
2. Try different datasets to see varying results
3. Remember this is a simplified neural network

## 📈 CSV Format Requirements

Your CSV files must follow this exact format:
```csv
date,price
2024-01-01,150.25
2024-01-02,152.30
...
```

- **date**: YYYY-MM-DD format
- **price**: Numeric value (can include decimals)
- **Headers**: Must be exactly "date,price"
- **Minimum**: At least 10 data points required

## 🎯 Testing Scenarios

1. **Steady Growth Test**: Use `stock-data-samples.csv`
2. **Volatility Test**: Use `volatile-stock-data.csv`
3. **Declining Market Test**: Use `declining-stock-data.csv`
4. **Sample Data Test**: Use the "Load Sample Data" button

These files will help you thoroughly test the stock prediction functionality and see how the Brain.js neural network performs with different types of market data. 