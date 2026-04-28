import express from 'express';
import { predictCrop } from '../utils/cropEngine.js';
import CropHistory from '../models/CropHistory.js';

const router = express.Router();

// POST /api/crop/predict
router.post('/predict', async (req, res) => {
  try {
    const { soilType, temperature, rainfall, humidity } = req.body;
    if (!soilType || temperature == null || rainfall == null || humidity == null) {
      return res.status(400).json({ error: 'All fields required: soilType, temperature, rainfall, humidity' });
    }
    const result = predictCrop({ soilType, temperature: +temperature, rainfall: +rainfall, humidity: +humidity });

    // Save to history if DB available
    try {
      await CropHistory.create({ soilType, temperature: +temperature, rainfall: +rainfall, humidity: +humidity, ...result, predictedCrop: result.crop });
    } catch (_) {}

    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/crop/history
router.get('/history', async (req, res) => {
  try {
    const history = await CropHistory.find().sort({ createdAt: -1 }).limit(10);
    res.json({ data: history });
  } catch (err) {
    res.json({ data: [], message: 'DB not connected' });
  }
});

export default router;
