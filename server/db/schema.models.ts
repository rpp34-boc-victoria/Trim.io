import mongoose from "mongoose";
const dailyEntriesName = "daily_entries";
const userName = "user_entries";
const foodName = "food_entries";


const foodItemsSchema = new mongoose.Schema(
  {
    label: String,
    nutrients: { type: mongoose.Schema.Types.Mixed },
    wholeWeight: {
      type: Number,
      default: 100,
    },
    // createTime:{type:Date, default:new Date()},
    // updateTime:{type:Date, default:new Date()},
  },

);

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
  caloriesAmount:{
    type: Number,
    default: 0,
  }
  // createdTime:{type:Date, default:new Date()},
  // updatedTime:{type:Date, default:new Date()},
});

const userSchema = new mongoose.Schema({
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  caloriesGoal: {type:Number, default:0, remark:"dailyCaloriesGoal"},
  waterGoal:  {type:Number, default:0, remark:"dailyWaterGoal"},
  gender: {type: Number, default:0, remark : '0 is female, 1 is male'},
  // createdTime:{type:Date, default:new Date()},
  // updatedTime:{type:Date, default:new Date()},
});

export const dailyEntriesModel = mongoose.model(
  dailyEntriesName,
  dailyEntriesSchema,
);

export const userEntriesModel = mongoose.model(
  userName,
  userSchema,
)

export const foodEntriesModel = mongoose.model(
  foodName,
  foodItemsSchema,
)