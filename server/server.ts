import express from "express";
import path from "path";
import dbConnection from "./db/connect"
import * as dotenv from "dotenv";
import {
  userEntriesModel,
  dailyEntriesModel,
  foodEntriesModel,
  todayMidnight,
} from "./db/schema.models";
import dayjs from "dayjs";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 8000;
dbConnection();

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
    const results = await dailyEntriesModel.find(query).limit(7).sort({ _id: -1 });
    if (results.length >= 1) {
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
    let result = await dailyEntriesModel.find(query).limit(1);
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
    let result = await dailyEntriesModel.find(query).sort({ _id: -1 }).limit(1);
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
  try {
    let result = await dailyEntriesModel.findOneAndUpdate(
      query,
      payload,
      {
        upsert: true,
        new: true
      });
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
      user_id: "62e0ed5f9c63f6892fcbaa68",
      foodItems,
      entryDate: dayjs().startOf('day').subtract(i, "day").toISOString(),
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

app.get("/api/register", (req, res) => {

  let user = new userEntriesModel({
    height: 1.7,
    weight: 60,
    firstName: "Spruce",
    lastName: "Ya",
    age: 20,
    caloriesGoal: 1500,
    waterGoal: 7,
    gender: 1
  })
  user.save();
  res.send({ message: "Hello" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
