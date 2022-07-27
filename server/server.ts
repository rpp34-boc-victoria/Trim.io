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
    if (results.length) {
      res.status(200);
      res.send(results);
    }
    else {
      throw new Error('data query failure')
    }
  } catch (error) {
    res.status(201)
    res.send(error.message);
  }
});

app.get("/api/register", (req, res) => {
  res.send({ message: "Hello" });
});
