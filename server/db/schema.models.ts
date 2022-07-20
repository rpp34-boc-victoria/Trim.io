import mongoose from 'mongoose';
const dailyEntriesName = 'daily_entries';

const foodItemsSchema = new mongoose.Schema({
  label: String,
  nutrients: { type: mongoose.Schema.Types.Mixed },
  wholeWeight: {
    type: Number,
    default: 100,
  },
}, { _id: false });

const dailyEntriesSchema = new mongoose.Schema({
  user_id: {
    type: String,
    index: true,
    required: true,
  },
  foodItems: [foodItemsSchema],
  entryDate: {
    type: Date,
    default: new Date(),
    index: true,
  },
  waterAmount: {
    type: Number,
    default: 0,
  },
  weightAmount: {
    type: Number,
    default: 0,
  },
});

export const dailyEntriesModel = mongoose.model(dailyEntriesName, dailyEntriesSchema)
