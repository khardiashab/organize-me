import Location from "../models/location.js";
import createPersent from "../utils/createPersent.js";

export const createLocation= async (req, res) => {
  try {
    let userId = req.user._id
    let location = await Location.create({userId : userId, ...req.body})
    // console.log(location)

    await createPersent(userId)
    res.status(200).json({
      data : location
    })
  } catch (error) {
    console.log(error)
    res.status(error.status || 500).send(error.message || "Internal server error.")
  }

}
export const deleteLocation = async (req, res) => {
  let id = req.user._id
  let location = await Location.findOneAndDelete({userId : id})
  res.status(200).send()
}
export const getLocation = async (req, res) => {
  let id = req.user._id
  let location = await Location.findOne({userId : id})
  res.status(200).json({
    data : location
  })
}

export const updateLocation = (async (req, res) => {
  let id = req.user._id
  let location = await Location.findOneAndUpdate({userId : id}, { ...req.body },
    {
      "new": true,
    })

  res.status(200).json({
    data : location
  })
})



