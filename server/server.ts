import express from 'express';
import path from 'path';
import cors from 'cors';
import * as dotenv from 'dotenv';
import webpush from 'web-push';
dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));

webpush.setVapidDetails(process.env.WEB_PUSH_CONTACT, process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY)

app.get("/api/hello", (req, res) => {
  res.send({ message: "Hello" });
});

app.post('/notifications/subscribe', (req, res) => {
  const subscription = req.body

  console.log('SUB', subscription)

  const payload = JSON.stringify({
    title: 'Hello!',
    description: 'It ',
  })

  webpush.sendNotification(subscription, payload)
    .then(result => console.log('AYOOO', result))
    .catch(e => console.log(e.stack))
  res.status(200).json({'success': true})
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});