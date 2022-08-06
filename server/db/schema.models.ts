import mongoose from "mongoose";
const dailyEntriesName = "daily_entries";
const userName = "user_entries";
const foodName = "food_entries";
const authName = "auth_entries";

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
const webPushSchema = new mongoose.Schema({
  endpoint: String,
  expirationTime: {
    type: String,
    default: null
  },
  keys: {
    p256dh: String,
    auth: String
  }
});

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  user_id: { type: String, required: true, unique: true, index: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  height: { type: Number, required: true, remark: "height in cm" },
  weight: { type: Number, required: true, remark: "weight in kg" },
  caloriesGoal: { type: Number, default: 0, remark: "daily Calories Goal in kcal" },
  caloriesRecommanded: { type: Number, default: 0, remark: "Recommanded daily Calories in kcal" },
  waterGoal: { type: Number, default: 0, remark: "daily Water intake Goal in cups" },
  userBMI: { type: Number, default: 0, remark: "user's BMI" },
  userBFP: { type: Number, default: 0, remark: "user's body fat percentage" },
  userBMR: { type: Number, default: 0, remark: "user's basal metabolic rate" },
  userRecommandedCaloIntake: { type: Number, default: 0, remark: "recommanded calories intake" },
  userRecommandedWaterIntake: { type: Number, default: 0, remark: "recommanded water intake" },
  createdTime:{type:Date, default:new Date()},
  webPushSubscriptions: {
    type: [webPushSchema],
    default: []
  }
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

export const foodEntriesModel = mongoose.model(
  foodName,
  userSchema,
)

const authSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  salt: { type: Number, required: true },
  email: { type: String, required: true },
  hashpass: { type: String, required: true }
});

export const authModel = mongoose.model(
  authName,
  authSchema,
);
export { todayMidnight };
