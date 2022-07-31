import express from "express";
import path from "path";
// import connection from "./db/connect"
import * as dotenv from "dotenv";
import {
  userEntriesModel,
  dailyEntriesModel,
  foodEntriesModel,
  authModel
} from "./db/schema.models";
import db from "../server/db/connect";
import dayjs from "dayjs";
import cors from 'cors';
dotenv.config();
// var bodyParser = require('body-parser');
import bodyParser from "body-parser";
import { resolveAny } from "dns";

const PORT = process.env.PORT || 8000;

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../client/build")));

db();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get("/api/hello", (req, res) => {
  res.send({ message: "Hello" });
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.get("/api/getWeekly", async (req, res) => {
  // console.log(req, res)
  console.log(1);
  const start = dayjs().subtract(7, "day");
  var query = {
    entryDate: {
      $gt: start.toISOString(),
      $lt: new Date(new Date().toISOString()),
    },
  };
  // 再使用mongodb查询调用这个query作为查询条件
  const results = await dailyEntriesModel.find(query);
  if (results.length) {
    res.send({
      code: 200,
      essmsg: "success",
      data: results,
    });
  }else{
    res.send({
      code: 201,
      essmsg: "data query failure",
      data: null,
    });
  }
});

app.get("/api/register", (req, res) => {
  let foodItems = new foodEntriesModel({
    label: "apply",
    nutrients: "test",
  });
  let daily = new dailyEntriesModel({
    user_id: "62da35785754355239a691f3",
    foodItems,
    waterAmount: 8,
    weightAmount: 45,
    entryDate: new Date("2022-07-18T02:34:03.326+00:00"),
  });
  daily.save();
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