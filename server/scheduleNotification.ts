import schedule from 'node-schedule';
import webpush from 'web-push';
import * as dotenv from 'dotenv';
import mongoConnection from './db/connect';
import {
  userEntriesModel,
  dailyEntriesModel
} from './db/schema.models';

dotenv.config();

webpush.setVapidDetails(process.env.WEB_PUSH_CONTACT, process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY)

// loop through all subscript and process/send out custom notifications
export function startSchedule() {
  const job = schedule.scheduleJob('* * * * *', async () => {
    await mongoConnection();
    const allUsers = await userEntriesModel.find();
    for (const user of allUsers) {
      const subscriptions = user['webPushSubscriptions'];
      if (subscriptions.length > 0) {
        const message = await getUserResultsFromYesterday(user._id, user.caloriesGoal);
        if (message === null) {
          continue;
        }
        const payload = JSON.stringify({
          title: 'Daily Goals',
          description: message
        })
        for (const subscription of subscriptions) {
          // in the case of invalid/expired subscriptions
          try {
            await webpush.sendNotification(subscription, payload);
          } catch(e) {
            continue;
          }
        }
      }
    }
  });
};

async function getUserResultsFromYesterday(userId, userCalorieGoal) {
  let query = {
    user_id: userId
  }
  const userEntryYesterday = await dailyEntriesModel.findOne(query).sort({ _id: -1 });
  try {
    const caloriesConsumedYesterday = userEntryYesterday['caloriesAmount'];
    const diff = Math.abs(caloriesConsumedYesterday - userCalorieGoal);
    if (diff <= 50) {
      return 'Congrats on hitting your goal yesterday!! Keep it up!';
    } else {
      return 'Looks like you missed your goal yesterday. Let\'s give it another try today!'
    }
  } catch (e) {
    return null
  }
}
