import mongoose from 'mongoose';
const dailyEntriesName = 'dailyEntries';

const nutrientSchema = new mongoose.Schema({
  label: String,
  ENERC_KCAL: Number,
});

const foodItemsSchema = new mongoose.Schema({
  label: String,
  nutrients: nutrientSchema,
});

const dailyEntriesSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    index: true,
  },
  fooditems: [foodItemsSchema],
  entryDate: {
    type: Date,
    default: new Date(),
    index: true,
  },
  waterAmount: Number,
  weightAmount: Number,
});

export const dailyEntriesModel = mongoose.model(dailyEntriesName, dailyEntriesSchema)
