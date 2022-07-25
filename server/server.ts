import express from 'express';
import path from 'path';
import cors from 'cors';
import * as dotenv from 'dotenv';
import webpush from 'web-push';
import schedule from 'node-schedule';
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

  res.status(200).json({'success': true})
});

const job = schedule.scheduleJob('*/10 * * * * *', async () => {
  const payload = JSON.stringify({
    title: 'Hello!',
    description: 'It ',
  })
  const sub = {
    endpoint: 'https://fcm.googleapis.com/fcm/send/fG20vaUTLFw:APA91bFZj5P2gR3tOAr-Gv8lVSUy5kmM_4V1WPHy3y2fnWPENOzRkm87TOhLJLWaaIcAPSS3iMdjkfcCNRNU13IVLJ4xyXUNdbpma9Ntpy-f4BOqVjPU3rm7hRXKBZyivBRn2_P_N91p',
    expirationTime: null,
    keys: {
      p256dh: 'BGSGUOoqYiynV-WBTR03ZlnOSZxw5KEQK6UJQyZyWi4zRuqXfD3ZdEc6rNJMUNVg7KS7lWABusk6s3EoB7xWt7w',
      auth: 'z8kYHIdEL3Oby22LQ6fcFw'
    }
  }
  webpush.sendNotification(sub, payload)
    .then(result => console.log('AYOOO', result))
    .catch(e => console.log(e.stack))
});



app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});