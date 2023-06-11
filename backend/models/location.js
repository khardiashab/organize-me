import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const locationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    unique : true
  },
  place: {
    type: String,
    default: ""
  },
  longitude: {
    type: Number,
    default: NaN
  },
  latitude: {
    type: Number,
    default: NaN
  }
});

const Location = new model('Location', locationSchema);

export default  Location;
