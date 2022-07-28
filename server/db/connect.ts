import mongoose from 'mongoose';
import path from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

const database = process.env.MONGO_DB;

var mongoConnection;

if (process.env.AUTH__METHOD === 'X509') {
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

      console.log(`Connected to MongoDB Atlas, Database ${database}`);

      return connection;
    } catch (err) {
      console.log('Failed to connect to MongoDB Atlas')
      console.log(err);
      throw err;
    }
  }
} else {
  mongoConnection = async () => {
    try {
      const connection = await mongoose.connect(process.env.MONGO_FULL_URI, {
        dbName: database,
      });

      console.log(`Connected to MongoDB Atlas, Database ${database}`);

      return connection;
    } catch (err) {
      console.log('Failed to connect to MongoDB Atlas')
      console.log(err);
      throw err;
    }
  }
}

export default mongoConnection;