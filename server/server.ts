import express from 'express';
import path from 'path';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { startSchedule } from './scheduleNotification';
dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));

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

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

startSchedule();