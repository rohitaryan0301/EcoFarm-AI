import mongoose from 'mongoose';

const FarmProfileSchema = new mongoose.Schema({
  userId: { type: String, default: 'default' },
  name: { type: String, default: 'Kisan' },
  location: { type: String, required: true },
  soilType: { type: String, enum: ['sandy', 'loamy', 'clay', 'silt', 'red'], required: true },
  currentCrop: { type: String, required: true },
  farmSize: { type: Number, required: true }, // in acres
  waterSource: { type: String, enum: ['rain', 'well', 'canal', 'drip', 'sprinkler'], default: 'rain' },
  irrigationDays: { type: Number, default: 7 }, // days between irrigation
  lastIrrigated: { type: Date, default: Date.now },
  lastFertilized: { type: Date },
}, { timestamps: true });

export default mongoose.model('FarmProfile', FarmProfileSchema);
