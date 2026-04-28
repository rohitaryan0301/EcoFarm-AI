import express from 'express';
import { calculateHealthScore } from '../utils/healthEngine.js';

const router = express.Router();

// POST /api/health/score
router.post('/score', (req, res) => {
  try {
    const { profile, weather } = req.body;
    const result = calculateHealthScore({ profile, weather });
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
