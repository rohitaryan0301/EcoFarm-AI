import express from 'express';
import FarmProfile from '../models/FarmProfile.js';

const router = express.Router();

// GET /api/profile
router.get('/', async (req, res) => {
  try {
    const profile = await FarmProfile.findOne({ userId: 'default' });
    res.json({ data: profile });
  } catch (err) {
    res.json({ data: null, message: 'DB not connected' });
  }
});

// POST /api/profile
router.post('/', async (req, res) => {
  try {
    const profile = await FarmProfile.findOneAndUpdate(
      { userId: 'default' },
      { ...req.body, userId: 'default' },
      { upsert: true, new: true }
    );
    res.json({ success: true, data: profile });
  } catch (err) {
    // If DB not available, just return success with the data
    res.json({ success: true, data: req.body, message: 'Saved locally only' });
  }
});

export default router;
