// import mongoose from 'mongoose';
import connection from './connect';
import { authModel } from './schema.models'

console.log("test")

connection ();

authModel.create({
  'username': 'ahmad',
  'salt': 1234,
  'hashpass': 'b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86',
})
