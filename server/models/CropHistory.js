import mongoose from 'mongoose';

const CropHistorySchema = new mongoose.Schema({
  userId: { type: String, default: 'default' },
  soilType: String,
  temperature: Number,
  rainfall: Number,
  humidity: Number,
  predictedCrop: String,
  reason: String,
  waterReq: String,
  yieldEstimate: String,
  profitEstimate: String,
}, { timestamps: true });

export default mongoose.model('CropHistory', CropHistorySchema);
