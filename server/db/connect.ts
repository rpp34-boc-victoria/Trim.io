import mongoose from 'mongoose';
const certificate = 'X509-cert-5599539695574878670.pem';
const credentials = `${__dirname}/${certificate}`;

const connect = async () => {
  try {
    await mongoose.connect('mongodb+srv://trim-io.4p0il.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority', {
      sslKey: credentials,
      sslCert: credentials
    });
    console.log('Connected to MongoDB Atlas');
  } catch (err) {
    console.log(err);
  }
}

connect();

export default connect;