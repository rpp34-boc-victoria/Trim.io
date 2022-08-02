import express from "express";
import path from "path";
// import connection from "./db/connect"
import * as dotenv from "dotenv";
import {
  userEntriesModel,
  dailyEntriesModel,
  foodEntriesModel,
} from "./db/schema.models";
import db from "../server/db/connect";
import dayjs from "dayjs";
import cors from 'cors';
import { format, compareAsc, parseISO } from 'date-fns';


dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../client/build")));

db();

let zeroDate = (value: string)=>{
  return format(parseISO(value), 'yyyy-MM-dd');
};

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get("/api/hello", (req, res) => {
  res.send({ message: "Hello" });
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.post('/entry', (req, res)=>{
  let {user_id, entryDate, weightAmount} = req.body;
  let newDate = format(parseISO(entryDate), 'yyyy-MM-dd');
  weightAmount = Number(weightAmount);

  dailyEntriesModel.findOneAndUpdate(
    {user_id: user_id, entryDate: newDate},
    {weightAmount: weightAmount},
    {new: true, upsert: true}
  )
  .then((data)=>{ res.status(201).send(data);})
  .catch((err)=>{ res.sendStatus(500); });
});

app.get("/entry", async (req, res)=>{
  let {user_id, entryDate} = req.body;
  entryDate = zeroDate(entryDate);
  dailyEntriesModel.find({user_id: user_id, entryDate: entryDate})
  .then((data)=>{ res.status(200).send(data);})
  .catch((err)=>{ res.sendStatus(500); });
});

app.post("/water", async (req, res)=>{
  let {user_id, entryDate, changeAmount} = req.body;
  entryDate = zeroDate(entryDate);
  changeAmount = Number(changeAmount);

  let filter = {user_id : user_id, entryDate: entryDate};
  let update = {
    $inc : {'waterAmount' : changeAmount},
  };

  dailyEntriesModel.findOneAndUpdate(filter, update, {new: true, upsert: true})
  .then((data)=>{ res.status(201).send(data);})
  .catch((err)=>{ res.sendStatus(500); });
})

app.post("/weight", (req, res)=>{
  let {user_id, entryDate, changeAmount} = req.body;
  entryDate = zeroDate(entryDate);
  changeAmount = Number(changeAmount);

  let filter = {user_id : user_id, entryDate: entryDate};
  let update = {
    $inc : {'weightAmount' : changeAmount},
  };
  dailyEntriesModel.find(filter)
  .then((data)=>{console.log('find weight', data)});

  dailyEntriesModel.findOneAndUpdate(filter, update, {new: true, upsert: true})
  .then((data)=>{
    res.status(201).send(data);})
  .catch((err)=>{ res.sendStatus(500); });
});

app.post("/foodItem", async (req, res)=>{
  let {user_id, entryDate, foodItem, nutrients, gramsPerServing, servings} = req.body;
  entryDate = zeroDate(entryDate);

  let filter = {user_id : user_id, entryDate: entryDate};

  let newFoodItem = {
    foodItem: foodItem,
    nutrients: nutrients,
    gramsPerServing: gramsPerServing,
    servings: servings
  };

  dailyEntriesModel.findOneAndUpdate(filter, {$push: {'foodItems': newFoodItem}}, {new: true})
  .then((data)=>{
    console.log('new item', data);
    res.status(201).send(data);
  })
  .catch((err)=>{
    console.log('err', err);
    res.sendStatus(500); });
});

// app.put("/foodItem", async (req, res)=>{
//   let {user_id, entryDate, index, foodItem, nutrients, gramsPerServing, servings} = req.body;
//   entryDate = zeroDate(entryDate);

//   let filter = {user_id : user_id, entryDate: entryDate};

//   let newFoodItem = {
//     foodItem: foodItem,
//     nutrients: nutrients,
//     gramsPerServing: gramsPerServing,
//     servings: servings
//   };

//   let updateIndex = `foodItems.${index}`;
//   dailyEntriesModel.findOneAndUpdate(filter, {'foodItems.0': newFoodItem})
//   .then((data)=>{
//     console.log('new item', data);
//     res.status(201).send(data);
//   })
//   .catch((err)=>{
//     console.log('err', err);
//     res.sendStatus(500); });
// });

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
