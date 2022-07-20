import mongoConnection from '../db/connect';
import {dailyEntriesModel} from '../db/schema.models';


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

  // test('Connects to DB', async () => {
  //   dailyEntriesModel.create({

  //   })
  // });

});
