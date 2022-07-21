import mongoose from 'mongoose';
import path from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

const database = process.env.MONGO_DB;

var mongoConnection: Function;

if (process.env.AUTH__METHOD === 'X509') {
  console.log('MongoDB Auth Using X509 Certificate Authentication');
  const mongo_uri = process.env.MONGO_URI_X509;
  const certificate = process.env.X509_FILE_NAME;
  const credentials = path.join(__dirname, `../../${certificate}`);

  mongoConnection = async () => {
    try {
      const connection = await mongoose.connect(mongo_uri, {
        sslKey: credentials,
        sslCert: credentials,
        dbName: database,
      });
      // console.log(`Connected to MongoDB Atlas, Database ${database}`);
      return connection;
    } catch (err) {
      console.log('Failed to connect to MongoDB Atlas')
      console.log(err);
      throw err;
    }
  }
} else {
  const username = process.env.MONGO_USER;
  const password = process.env.MONGO_USER_PASSWORD;
  const prefix = process.env.MONGO_SCRAM_PREFIX
  const mongo_uri = `${prefix}${username}:${password}@${process.env.MONGO_URI_SCRAM}`;
  console.log('\n**********Using URI*********\n', mongo_uri, '\n\n');
  mongoConnection = async () => {
    try {
      const connection = await mongoose.connect(mongo_uri, {
        dbName: database,
      });
      // console.log(`Connected to MongoDB Atlas, Database ${database}`);
      return connection;
    } catch (err) {
      console.log('Failed to connect to MongoDB Atlas')
      console.log(err);
      throw err;
    }
  }
}

export default mongoConnection;