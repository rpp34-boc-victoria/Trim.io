import mongoose from 'mongoose';
import connection from './connect';
import { authModel } from './schema.models'

console.log("test")

connection ();

authModel.create({
  'username': 'ahmad',
  'salt': 1234,
  'hashpass': 'password',
})
