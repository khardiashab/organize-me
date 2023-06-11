import mongoose from "mongoose";
 export default function generateUniqueObjectId(originalObjectId, date, type="tasklist") {
  let dateWithoutTime = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  // console.log("this is the date: ", dateWithoutTime)
  let timestamp = Math.floor(dateWithoutTime.getTime() / 1000);
   // Add 1 second to the timestamp for tasklist types
  if (type === 'tasklist') {
    timestamp += 1;
  }
  // Convert timestamp to an ObjectId string
  let timeId = mongoose.Types.ObjectId(timestamp).toHexString().slice(0, 8);
   // Convert original ObjectId to a string
  let originalId = mongoose.Types.ObjectId(originalObjectId).toHexString().slice(8);

   // Determine the separator character based on the specified language (default is underscore)

  return mongoose.Types.ObjectId(timeId + originalId);
}