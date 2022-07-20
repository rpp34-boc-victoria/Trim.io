import mongoose from 'mongoose';
import path from 'path';
import * as dotenv from 'dotenv';
dotenv.config();


const database = process.env.MONGO_DB;
const mongo_uri = process.env.MONGO_URI;
const certificate = process.env.X509_FILE_NAME;
const credentials = path.join(__dirname, `../../${certificate}`);

const mongoConnection = async () => {
  try {
    const connection = await mongoose.connect(mongo_uri, {
      sslKey: credentials,
      sslCert: credentials,
      dbName: database,
    });
    // console.log(connection);
    console.log(`Connected to MongoDB Atlas, Database ${database}`);
    return connection;
  } catch (err) {
    console.log('Failed to connect to MongoDB Atlas')
    console.log(err);
    throw err;
  }
}

export default mongoConnection;