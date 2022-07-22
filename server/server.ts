import express from "express";
import path from "path";
// import connection from "./db/connect"
import * as dotenv from "dotenv";
import { userEntriesModel,dailyEntriesModel , foodEntriesModel} from "./db/schema.models";
import db from "../server/db/connect";
import dayjs from 'dayjs'
import { log } from "console";
dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

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

app.get("/api/getWeekly", (req, res) => {
  // console.log(req, res)
  console.log(1)
  // const start = dayjs().subtract(7, 'day')
  // var query = {
  //   createTime: {
  //     $gt: start.toISOString(),
  //     $lt: new Date(new Date().toISOString()),
  //   },
  // };
  // 再使用mongodb查询调用这个query作为查询条件
  const results = dailyEntriesModel.find({});
  res.send(results)
});

app.get("/api/register", (req, res) => {
  let foodItems=new foodEntriesModel({
    label: 'apply',
    nutrients: 'test'
  })
  let daily = new dailyEntriesModel({
    user_id:'62da35785754355239a691f3',
    foodItems,
    waterAmount:8,
    weightAmount:50
  })
  daily.save()
  res.send({ message: "Hello" });
});