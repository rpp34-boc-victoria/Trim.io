import mongoConnection from '../db/connect';
import { dailyEntriesModel } from '../db/schema.models';
import mongoose from 'mongoose';


describe('DB Tests', () => {
  test('Connects to DB', async () => {
    try {
      const connection = await mongoConnection();

      // Successful connection will call this code.
      expect(true).toBeTruthy();
    } catch (err) {
      console.log(err.message);
      // Error in connection will call this code.
      expect(false).toBeTruthy();
    }
  });

  test('Makes Daily Entries', async () => {
    var entryObject = {
      user_id: new mongoose.Types.ObjectId().toString(),
      entryDate: new Date(),
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
