const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/monitoring-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Simple model
const LogEntry = mongoose.model('LogEntry', {
  message: String,
  timestamp: { type: Date, default: Date.now }
});

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Sample endpoint
app.post('/log', async (req, res) => {
  try {
    const entry = new LogEntry({ message: req.body.message });
    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  try {
    const count = await LogEntry.countDocuments();
    res.status(200).json({ logEntries: count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});