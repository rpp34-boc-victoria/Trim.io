import mongoConnection from './connect';
import { dailyEntriesModel, todayMidnight } from './schema.models';
import mongoose from 'mongoose';

describe('Connects to DB', () => {
  test('Connects to DB', async () => {
    try {
      const connection = await mongoConnection();

      // Successful connection will call this code.
      expect(true).toBeTruthy();
      await mongoose.connection.close();
    } catch (err) {
      console.log(err.message);
      // Error in connection will call this code.
      expect(false).toBeTruthy();
    }
  });
});

describe('Connects to DB', () => {
  beforeAll(async () => {
    await mongoConnection();
  });

  afterAll(async () => {
    await mongoose.connection.close();;
  });

  test('Makes Daily Entries', async () => {
    var entryObject = {
      user_id: new mongoose.Types.ObjectId().toString(),
      entryDate: todayMidnight(),
      foodItems: [{
        label: 'Big Mac',
        nutrients: {
          "ENERC_KCAL": 257,
          "PROCNT": 11.82,
          "FAT": 14.96,
          "CHOCDF": 20.08,
          "FIBTG": 1.6
        },
        wholeWeight: 213,
      }],
      waterAmount: 1,
      weightAmount: 1,
    };
    entryObject = JSON.parse(JSON.stringify(entryObject));
    try {
      var result = await dailyEntriesModel.create(entryObject);
      result = JSON.parse(JSON.stringify(result));
      expect(result).toMatchObject(entryObject);
    } catch (err) {
      throw err;
    }

    await dailyEntriesModel.findOneAndDelete({}, { "sort": { "_id": -1 } });
  });

});

