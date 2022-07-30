import schedule from 'node-schedule';
import webpush from 'web-push';
import * as dotenv from 'dotenv';

dotenv.config();

webpush.setVapidDetails(process.env.WEB_PUSH_CONTACT, process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY)

// loop through all subscript and process/send out custom notifications
export function startSchedule() {
  const job = schedule.scheduleJob('* * * * *', async () => {

    const payload = JSON.stringify({
      title: 'Different',
      description: 'Big Diff',
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
};
