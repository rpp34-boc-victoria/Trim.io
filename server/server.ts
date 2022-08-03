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
dotenv.config();
// var bodyParser = require('body-parser');
// import bodyParser from "body-parser";
import { resolveAny } from "dns";
import { LEGAL_TCP_SOCKET_OPTIONS } from 'mongodb';

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

app.post('/notifications/subscribe', async (req, res) => {
  const subscription = req.body

  console.log('SUB', subscription)
  // add subscription to database

  let user = new userEntriesModel({
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
  res.status(200).json({'success': true})
});

app.get('/getUserStreak', async (req, res) => {
  res.send('10');
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
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
  let query = {
    entryDate: { $gte: todayMidnight() },
    // user_id: String, // Will need to be given the user_id by authentication middleware
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
  let query = {
    // user_id: String, // Will need to be given the user_id by authentication middleware
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
  let query = {
    entryDate: { $gte: todayMidnight() },
    // user_id: String, // Will need to be given the user_id by authentication middleware
  }
  let payload = req.body;
  console.log(req.body);
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
  console.log('/api/generateDaily [params]: ', req.params)
  /**
   * Do something with req.params to configure advanced Data Generation
   */
  let foodItems = []
  for (let i = 0; i < 5; i++) {
    foodItems.push(
      {
        label: 'Big Mac',
        nutrients: {
          "ENERC_KCAL": 257,
          "PROCNT": 11.82,
          "FAT": 14.96,
          "CHOCDF": 20.08,
          "FIBTG": 1.6
        },
        wholeWeight: 213,
      }
    );
  }

  let randData = [];
  const numDaysAgo = 10;

  for (let i = 0; i < numDaysAgo; i++) {
    var daily = {
      user_id: "62e99b03eccc7148176fcf85",
      foodItems,
      entryDate: dayjs().startOf('day').subtract(numDaysAgo - 1 - i, "day").toISOString(),
      waterAmount: Math.floor(Math.random() * 10),
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
      {endpoint: 'https://fcm.googleapis.com/fcm/send/dY2vomoPgS8:APA91bEqP3EsCkTlUwoE5WtZxE9SmJZJv3aBwMQWn4wkRgP5aRQU18AsbsNnp_RqYJuzK_gRkUuLuTEDDNqfgpY5tk4yQHqopjxRu2Y6VwsqvPPcS7q0E8dK2uGdhLnq_oOz4PpIcb3K',
        expirationTime: null,
        keys: {
          p256dh: 'BMaslJakEW0Zu2o2mGhqjVB2XPTWQD67ird8EIfSy8pxMcuSyX6wm5AuvnKmM-5H1NWJ2BC5wmTHPAXljvQN2bI',
          auth: 'wZxamv5cgcsv5UU04_plkw'}
        }
    ]
  })
  await user.save();
  res.send({ message: "Hello" });
});

app.post("/auth/login", async (req, res) => {
  // const data = null;

  let username = req.body.username;
  console.log(username, 'usernaem')
  const query = {
    username: username
  };
  authModel.find(query, (error, result) => {
    if (error) res.send('Failed');
    res.send(result);
  })
})

app.post("/auth/checkUser", (req, res) => {
  // const data = null;

  let username = req.body.username;
  const query = {
    username: username
  };
  authModel.find(query, (error, result) => {
    if (error) res.send('Failed');
    res.send(result);
  })
})

app.post("/auth/CreateUser", (req, res) => {
  // const data = null;
  console.log(req.body)

  let username = req.body.username;
  let email = req.body.email;
  let hashedFunction = req.body.hashedFunction;
  let salt = req.body.salt;
  console.log(username, salt, hashedFunction, email)
  const query = {
    username: username,
    email: email,
    salt: salt,
    hashpass: hashedFunction
  };

  const newAuthModel = new authModel (query);
  newAuthModel.save().then((result) => {
    res.send(result);
  })

})

//Below is a post request for the users to register
app.post("/api/register", async (req, res) => {
  //console.log('req here:!!', req.body);
  let userData = req.body;
  userData.caloriesRecommanded = "2000";
  let userReg = new userEntriesModel({
    firstName: userData.firstName,
    lastName: userData.lastName,
    age: +userData.age,
    gender: userData.gender.value,
    email: userData.email,
    phoneNumber: +userData.phoneNumber,
    height: +userData.height,
    weight: +userData.weight,
    caloriesGoal: +userData.targetCalories,
    caloriesRecommanded: +userData.caloriesRecommanded,
    waterGoal: +userData.targetWater,
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

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
