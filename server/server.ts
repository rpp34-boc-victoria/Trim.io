import { startSchedule } from './scheduleNotification';
import express from "express";
import path from "path";
// import connection from "./db/connect"
import * as dotenv from "dotenv";
import {
  userEntriesModel,
  dailyEntriesModel,
  foodEntriesModel,
} from "./db/schema.models";
import db from "./db/connect";
import dayjs from "dayjs";

import cors from "cors";
import { METHODS } from "http";

dotenv.config();
const PORT = process.env.PORT || 8000;

const { exec } = require("child_process");
exec(
  "sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8000",
  (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: forwarding TCP port 80 to ${PORT}. ${stdout}`);
  }
);

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../client/build")));

db();

app.get("/api/hello", (req, res) => {
  res.send({ message: "Hello" });
});

app.post('/notifications/subscribe', (req, res) => {
  const subscription = req.body

  console.log('SUB', subscription)
  // add subscrition to database
  res.status(200).json({'success': true})
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.get("/api/getWeekly", async (req, res) => {
  const start = dayjs().subtract(7, "day");
  var query = {
    entryDate: {
      $gt: start.toISOString(),
      $lt: new Date(new Date().toISOString()),
    },
  };
  // 再使用mongodb查询调用这个query作为查询条件
  try {
    const results = await dailyEntriesModel.find(query);
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

app.get("/api/register", (req, res) => {
  let user = new userEntriesModel({
    height: 1.7,
    weight: 60,
    firstName: "Spruce",
    lastName: "Ya",
    age:20,
    caloriesGoal: 1500,
    waterGoal: 7,
    gender: 1
  })
  user.save()
  res.send({ message: "Hello" });
});

app.get("/api/generateDaily",(req, res) => {
  for (let i = 0; i < 100; i++) {
    let daily = {
      user_id : "62e0ed5f9c63f6892fcbaa68",
      foodItem_ids: "",
      entryDate: dayjs().subtract(i, "day").toISOString(),
      waterAmount: Math.floor(Math.random()*10),
      weightAmount: Math.floor(Math.random()*(150 - 40) + 40),
      caloriesAmount: Math.floor(Math.random()*(2200 - 3) + 3),
    }
    new dailyEntriesModel(daily).save();
  }
  res.send({message:"generated 100 datas!"});
})

<<<<<<< HEAD
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

startSchedule();

=======
>>>>>>> bc6f25a (added userReg API post request)
//Below is a post request for the users to register
app.post("/api/register", (req, res) => {
  //console.log('req here:!!', req.body);
  let userData = req.body;
  //will implemnetnt caloriesRecommanded cals on next PR
  userData.caloriesRecommanded = "2000";
  console.log(+userData.caloriesRecommanded);
  //will implemnetnt caloriesRecommanded cals on next PR
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
    userReg.save();
    res.sendStatus(201);
  } catch (err) {
    res.status(501);
    res.send(err);
  }
});