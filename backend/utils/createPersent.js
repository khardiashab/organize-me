import Persent from "../models/persent.js";
import Location from "../models/location.js";
import generateUniqueObjectId from "./GenrateUniqueId.js";

async function createPersent(userId){
  const date = new Date()
  const location = await Location.findOne({userId : userId})
    if(!!location){
      const persentId = generateUniqueObjectId(userId, date, "persent")
      let persent = new Persent({
       _id : persentId,
       persent : true
      })
      await persent.save()
    }
}

export default createPersent;