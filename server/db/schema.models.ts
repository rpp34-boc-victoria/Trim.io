import mongoose from "mongoose";
const dailyEntriesName = "daily_entries";
const userName = "user_entries";
const foodName = "food_entries";

/**
 *
 * @returns Today's Date at Mightnight
 */
const todayMidnight = () => {
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

const foodItemsSchema = new mongoose.Schema(
  {
    foodItem: String,
    nutrients: { type: mongoose.Schema.Types.Mixed },
    gramsPerServing: Number,
    servings: Number
    // createTime:{type:Date, default:new Date()},
    // updateTime:{type:Date, default:new Date()},
  }
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
    default: todayMidnight(),
    index: true,
  },
  waterAmount: {
    type: Number,
    default: 0,
  },
  weightAmount: {
    type: Number
  },
  caloriesAmount: {
    type: Number,
    default: 0,
  }
  // createdTime:{type:Date, default:new Date()},
  // updatedTime:{type:Date, default:new Date()},
});

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  gender: {
    type: String,
    enum: "M" || "F" || "N",
    remark: 'F is female, M is male, N is non-binary'
  },
  email: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  height: { type: Number, required: true, remark: "height in cm" },
  weight: { type: Number, required: true, remark: "weight in kg" },
  caloriesGoal: { type: Number, default: 0, remark: "daily Calories Goal in kcal" },
  caloriesRecommanded: { type: Number, default: 0, remark: "Recommanded daily Calories in kcal" },
  waterGoal: { type: Number, default: 0, remark: "daily Water intake Goal in cups" },
  createdTime:{type:Date, default:new Date()},
  //updatedTime:{type:Date, default:new Date()},
});

export const dailyEntriesModel = mongoose.model(
  dailyEntriesName,
  dailyEntriesSchema,
);

export const userEntriesModel = mongoose.model(
  userName,
  userSchema,
)

export { todayMidnight };