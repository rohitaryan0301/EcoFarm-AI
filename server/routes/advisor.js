import express from 'express';
import { generateAdvice } from '../utils/advisorEngine.js';

const router = express.Router();

// GET /api/advisor
router.get('/', (req, res) => {
  try {
    // Accept profile and weather as query params for simplicity
    const profile = req.query.profile ? JSON.parse(req.query.profile) : null;
    const weather = req.query.weather ? JSON.parse(req.query.weather) : null;
    const advice = generateAdvice({ profile, weather });
    res.json({ success: true, data: advice });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/advisor (preferred)
router.post('/', (req, res) => {
  try {
    const { profile, weather } = req.body;
    const advice = generateAdvice({ profile, weather });
    res.json({ success: true, data: advice });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
