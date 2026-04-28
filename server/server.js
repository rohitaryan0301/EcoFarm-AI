import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import profileRoutes from './routes/profile.js';
import cropRoutes from './routes/crop.js';
import advisorRoutes from './routes/advisor.js';
import weatherRoutes from './routes/weather.js';
import chatbotRoutes from './routes/chatbot.js';
import healthRoutes from './routes/health.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecofarm';

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// Connect MongoDB (optional – app works without it)
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.warn('⚠️  MongoDB not connected – running without DB:', err.message));

// Routes
app.use('/api/profile', profileRoutes);
app.use('/api/crop', cropRoutes);
app.use('/api/advisor', advisorRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/health', healthRoutes);

// Health check
app.get('/api/ping', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => console.log(`🌱 Eco Farm AI server running on http://localhost:${PORT}`));
