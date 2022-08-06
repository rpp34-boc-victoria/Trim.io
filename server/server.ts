import { startSchedule } from './scheduleNotification';
import express from "express";
import path from "path";
import dbConnection from "./db/connect"
import * as dotenv from "dotenv";
import {
  userEntriesModel,
  dailyEntriesModel,
  todayMidnight,
  authModel
} from "./db/schema.models";
import dayjs from "dayjs";
import cors from 'cors';
import { format, compareAsc, parseISO } from 'date-fns';
dotenv.config();
// var bodyParser = require('body-parser');
// import bodyParser from "body-parser";
import { resolveAny } from "dns";
import { LEGAL_TCP_SOCKET_OPTIONS } from 'mongodb';
import mongoose from 'mongoose';

dotenv.config();
const PORT = process.env.PORT || 8000;
dbConnection();
startSchedule();

if (process.env.ENVIRONMENT !== 'DEV') {
  const { exec } = require("child_process");
  exec('sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8000', (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: forwarding TCP port 80 to ${PORT}. ${stdout}`);
  });
}

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/build")));

/**************** Utility Functions *************************/


let zeroDate = (value: string) => {
  return format(parseISO(value), 'yyyy-MM-dd');
};


app.post('/notifications/subscribe', async (req, res) => {
  const subscription = req.body

  console.log('SUB', subscription)
  // add subscription to database

  let user = new userEntriesModel({
    user_id: req.body?.user_id || new mongoose.Types.ObjectId(),
    height: 1.7,
    weight: 60,
    firstName: "Spruce",
    lastName: "Ya",
    age: 20,
    caloriesGoal: 1500,
    waterGoal: 7,
    gender: "M",
    email: 'asd@fas.com',
    phoneNumber: 124123,
    webPushSubscriptions: [subscription]
  })
  await user.save();
  res.status(200).json({ 'success': true })
});

app.get('/getUserStreak', async (req, res) => {
  res.send('10');
});


/*************** DAILY ENTRIES ROUTES ********************/
app.post('/entry', (req, res) => {
  let { user_id, entryDate, weightAmount } = req.body;
  let newDate = format(parseISO(entryDate), 'yyyy-MM-dd');
  weightAmount = Number(weightAmount);

  dailyEntriesModel.findOneAndUpdate(
    { user_id: user_id, entryDate: newDate },
    { weightAmount: weightAmount },
    { new: true, upsert: true }
  )
    .then((data) => { res.status(201).send(data); })
    .catch((err) => { res.sendStatus(500); });
});

app.get("/entry", async (req, res) => {
  let { user_id, entryDate } = req.body;
  entryDate = zeroDate(entryDate);
  dailyEntriesModel.find({ user_id: user_id, entryDate: entryDate })
    .then((data) => { res.status(200).send(data); })
    .catch((err) => { res.sendStatus(500); });
});

app.post("/water", async (req, res) => {
  let { user_id, entryDate, changeAmount } = req.body;
  entryDate = zeroDate(entryDate);
  changeAmount = Number(changeAmount);

  let filter = { user_id: user_id, entryDate: entryDate };
  let update = {
    $inc: { 'waterAmount': changeAmount },
  };

  dailyEntriesModel.findOneAndUpdate(filter, update, { new: true, upsert: true })
    .then((data) => { res.status(201).send(data); })
    .catch((err) => { res.sendStatus(500); });
})

app.post("/weight", (req, res) => {
  let { user_id, entryDate, changeAmount } = req.body;
  entryDate = zeroDate(entryDate);
  changeAmount = Number(changeAmount);

  let filter = { user_id: user_id, entryDate: entryDate };
  let update = {
    $inc: { 'weightAmount': changeAmount },
  };

  dailyEntriesModel.findOneAndUpdate(filter, update, { new: true, upsert: true })
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => { res.sendStatus(500); });
});

app.post("/foodItem", async (req, res) => {
  let { user_id, entryDate, foodItem, nutrients, gramsPerServing, servings } = req.body;
  entryDate = zeroDate(entryDate);

  let filter = { user_id: user_id, entryDate: entryDate };

  let newFoodItem = {
    foodItem: foodItem,
    nutrients: nutrients,
    gramsPerServing: gramsPerServing,
    servings: servings
  };

  dailyEntriesModel.findOneAndUpdate(filter, { $push: { 'foodItems': newFoodItem } }, { new: true })
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

app.put("/foodItem", async (req, res) => {
  let { user_id, entryDate, foodItem_id, foodItem, nutrients, gramsPerServing, servings } = req.body;
  entryDate = zeroDate(entryDate);

  let filter = { 'user_id': user_id, 'entryDate': entryDate, 'foodItems._id': foodItem_id };

  let newFoodItem = {
    foodItem: foodItem,
    nutrients: nutrients,
    gramsPerServing: gramsPerServing,
    servings: servings
  };

  dailyEntriesModel.findOneAndUpdate(filter, { $set: { 'foodItems.$': newFoodItem } }, { returnDocumet: 'after' })
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});


/*************** HISTORY / WEEKLY ROUTES ********************/

app.get("/api/getWeekly", async (req, res) => {
  const start = dayjs().subtract(7, "day");
  var query = {
    entryDate: {
      $gt: start.toISOString(),
      $lt: new Date(),
    },
    // user_id: {}, // Will need to be given the user_id by authentication middleware
  };

  try {
    let results = await dailyEntriesModel.find(query).limit(7).sort({ _id: -1 });
    if (results.length >= 1) {
      results.reverse();
      res.status(200);
      res.send(results);
    }
    else {
      throw new Error('data query failure')
    }
  } catch (error) {
    res.status(404)
    res.send(error.message);
  }
});

/******************** Daily Get Route ***********************/

app.get('/api/daily', async (req, res) => {
  console.log('/api/daily params:', req.query)
  let query = {
    entryDate: { $gte: todayMidnight() },
    user_id: req.query?.user_id, // Will need to be given the user_id by authentication middleware
  }
  try {
    let result = await dailyEntriesModel.findOne(query).sort({ _id: -1 });
    res.status(200);
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(err);
  }
});

app.get('/api/latestEntry', async (req, res) => {
  console.log('/api/latestEntry params:', req.query)
  let query = {
    user_id: req.query?.user_id, // Will need to be given the user_id by authentication middleware
  }
  try {
    let result = await dailyEntriesModel.findOne(query).sort({ _id: -1 });
    res.status(200);
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(err);
  }
});

app.post('/api/daily', async (req, res) => {
  console.log('Daily Post body:', req.body);
  let query = {
    entryDate: { $gte: todayMidnight() },
    user_id: req.body?.user_id, // Will need to be given the user_id by authentication middleware
  }
  let payload = {
    weight: req.body.weight,
  };
  try {
    let result = await dailyEntriesModel.findOneAndUpdate(
      query,
      payload,
      {
        upsert: true,
        new: true
      });
    console.log(result);
    res.status(200);
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(err);
  }
});

app.get("/api/generateDaily", async (req, res) => {
  console.log('/api/generateDaily [params]: ', req.query)
  /**
   * Do something with req.query/params to configure advanced Data Generation
   */
  const skipDays = req.query?.skipToday ? 0 : 1;
  let foodItems = []
  for (let i = 0; i < 5; i++) {
    foodItems.push(
      {
        foodItem: 'Big Mac',
        nutrients: {
          "ENERC_KCAL": 257,
          "PROCNT": 11.82,
          "FAT": 14.96,
          "CHOCDF": 20.08,
          "FIBTG": 1.6
        },
        gramsPerServing: 213,
        servings: 1,
      }
    );
  }

  let randData = [];
  const numDaysAgo = 10;

  for (let i = 0; i < numDaysAgo; i++) {
    var daily = {
      user_id: req.query?.user_id,
      foodItems,
      entryDate: dayjs().startOf('day').subtract(numDaysAgo - skipDays - i, "day").toISOString(),
      waterAmount: Math.floor(Math.random() * 16),
      weightAmount: Math.floor(Math.random() * (150 - 40) + 40),
      caloriesAmount: Math.floor(Math.random() * (2200 - 3) + 3),
    }
    randData.push(daily);
  }

  try {
    await dailyEntriesModel.insertMany(randData);
    res.status(201);
    res.send({ message: `Generated ${numDaysAgo} random data entries!` });
  } catch (err) {
    console.log(err.message);
    res.status(500);
    res.send(err);
  }
})

// Not sure what this is for......????
app.get("/api/register", async (req, res) => {

  let user = new userEntriesModel({
    user_id: req.query?.user_id || new mongoose.Types.ObjectId(),
    height: 1.7,
    weight: 60,
    firstName: "Spruce",
    lastName: "Ya",
    age: 20,
    caloriesGoal: 1500,
    waterGoal: 7,
    gender: "M",
    email: 'asd@fas.com',
    phoneNumber: 124123,
    webPushSubscriptions: [
      {
        endpoint: 'https://fcm.googleapis.com/fcm/send/dY2vomoPgS8:APA91bEqP3EsCkTlUwoE5WtZxE9SmJZJv3aBwMQWn4wkRgP5aRQU18AsbsNnp_RqYJuzK_gRkUuLuTEDDNqfgpY5tk4yQHqopjxRu2Y6VwsqvPPcS7q0E8dK2uGdhLnq_oOz4PpIcb3K',
        expirationTime: null,
        keys: {
          p256dh: 'BMaslJakEW0Zu2o2mGhqjVB2XPTWQD67ird8EIfSy8pxMcuSyX6wm5AuvnKmM-5H1NWJ2BC5wmTHPAXljvQN2bI',
          auth: 'wZxamv5cgcsv5UU04_plkw'
        }
      }
    ]
  })
  try {
    await user.save();
    res.sendStatus(201);
  } catch (err) {
    res.status(501);
    res.send(err);
  }

});

app.post("/auth/login", async (req, res) => {
  // const data = null;

  let username = req.body.username;
  const query = {
    user_id: username
  };
  authModel.find(query, (error, result) => {
    if (error) res.send('Failed');
    res.send(result);
  })
})


/******************** AUTH ROUTES ***********************/

app.post("/auth/checkUser", (req, res) => {
  // const data = null;

  let user_id = req.body.username;
  const query = {
    user_id: user_id
  };
  authModel.find(query, (error, result) => {
    if (error) res.send('Failed');
    res.send(result);
  })
})

app.post("/auth/CreateUser", (req, res) => {

  let username = req.body.username;
  let email = req.body.email;
  let hashedFunction = req.body.hashedFunction;
  let salt = req.body.salt;
  const query = {
    user_id: username,
    email: email,
    salt: salt,
    hashpass: hashedFunction
  };

  const newAuthModel = new authModel(query);
  newAuthModel.save().then((result) => {
    res.send(result);
  })

})

/******************** USER Routes ***********************/

//Below is a post request for the users to register
app.post('/api/register', async (req, res) => {
  let userData = req.body;
  userData.caloriesRecommanded = "2000"; // THIS NEEDS TO BE CALCULATED!!
  console.log('hi')
  console.log(userData.user_id);
  let userReg = new userEntriesModel({
    user_id: userData.user_id,
    firstName: userData.firstName,
    lastName: userData.lastName,
    age: +userData.age,
    gender: userData.gender.value,
    email: userData.email,
    phoneNumber: userData.phoneNumber,
    height: +userData.height,
    weight: +userData.weight,
    caloriesGoal: +userData.targetCalories,
    caloriesRecommanded: +userData.caloriesRecommanded,
    waterGoal: +userData.targetWater,
    userBMI: +userData.userBMI,
    userBFP: +userData.userBFP,
    userBMR: +userData.userBMR,
    userRecommandedCaloIntake: +userData.userRecommandedCaloIntake,
    userRecommandedWaterIntake: +userData.userRecommandedWaterIntake,
    createdTime: new Date(),

  });
  try {
    await userReg.save();
    res.sendStatus(201);
  } catch (err) {
    res.status(501);
    res.send(err);
  }
});

app.get("/api/fetchUser", async (req, res) => {
  let user_id = req.query?.user_id;
  try {
    let result = await userEntriesModel.findOne({ user_id }).sort({ _id: -1 });
    res.status(200);
    res.send(result);
  } catch (err) {
    res.status(501);
    res.send(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
