const Wine = require("../models/Wine.model.js")

const getWines = async (req, res, next) => {
  try {
    const allWines = await Wine.find()
    return res.status(200).json(allWines)
  } catch (error) {
    return res.status(400).json(`error at getWines: ${error}`)
  }
}

const getWineById = async (req, res, next) => {
  try {
    const { id } = req.params
    const wine = Wine.findById(id)
    return res.status(200).json(wine)
  } catch (error) {
    return res.status(400).json(`error at getWineById: ${error}`)
  }
}

const getWinesByTaste = async (req, res, next) => {
  try {
    const {taste} = req.params
    const winesByTaste = Wine.find({taste: req.body.taste})
    return res.status(200).json(winesByTaste)
  } catch (error) {
    return res.status(400).json(`error at getWinesByTaste: ${error}`)
  }
}

const getWinesByColor = async (req, res, next) => {
  try {
    const {color} = req.params
    const winesByColor = Wine.find({taste: req.body.color})
    return res.status(200).json(winesByColor)
  } catch (error) {
    return res.status(400).json(`error at getWinesByColor: ${error}`)
  }
} 

const getWinesByTemperature = async (req, res, next) => {
  try {
    const { idealTemperature } = req.params
    const winesByTemp = Wine.find({idealTemperature: req.body.idealTemperature})
    return res.status(200).json(winesByTemp)
  } catch (error) {
    return res.status(400).json(`error at getWinesByTemperature: ${error}`)
  }
}

const getWinesByOrigin = async (req, res, next) => {
  try {
    const { origin } = req.params
    const winesByOrigin = Wine.find({origin: req.body.origin})
    return res.status(200).json(winesByOrigin)
  } catch (error) {
    return res.status(400).json(`error at getWinesByOrigin: ${error}`)
  }
}

const getWinesByScores = async (req, res, next) => {
  try {
    const { scores } = req.params
    //! NEED TO CHECK HOW TO CALCULATE THE AVERAGE SCORE
  } catch (error) {
    return res.status(400).json(`error at getWinesByScore: ${error}`)
  }
}

//! PREPARE A PRICE FILTER GIVEN A MINMAX

const deleteWineById = async (req, res, next) => {
  try {
    const { id } = req.params
    const wineToDelete = await Wine.findById(id)

    const wineDeleted = await Wine.findByIdAndDelete(id)

    return res.status(200).json(wineDeleted)

  } catch (error) {
    return res.status(400).json(`error at deleteWine: ${error}`)
  }
}

const updateWineById = async (req, res, next) => {
  try {
    const { id } = req.params
    const wineToUpdate = await Wine.findById(id)

    const newWine = new Wine({
      name: req.body.name ,
      brand: req.body.brand ,
      picture: req.body.picture ,
      taste: req.body.taste ,
      color: req.body.color ,
      idealTemperature: req.body.idealTemperature ,
      origin: req.body.origin ,
      scores: req.body.scores ,
      price: req.body.price ,
    })

    newWine._id = id
    if(req.file){newWine.picture = req.file.path}
    const updatedWine = await Wine.findByIdAndUpdate(id, newWine, {new: true})

    return res.status(200).json(updatedWine)

  } catch (error) {
    return res.status(400).json(`error at updateWineById: ${error}`)
  }
}

module.exports = { getWines, getWineById, getWinesByTaste, getWinesByColor, getWinesByTemperature, getWinesByOrigin, getWinesByScores, deleteWineById, updateWineById }