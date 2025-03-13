const {
  deleteImgCloudinary,
} = require("../../middlewares/files.middleware.js");
const Wine = require("../models/Wine.model.js");

const getWines = async (req, res, next) => {
  try {
    const allWines = await Wine.find();
    return res.status(200).json(allWines);
  } catch (error) {
    return res.status(400).json(`error at getWines: ${error}`);
  }
};

const getWineById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const wine = await Wine.findById(id);
    return res.status(200).json(wine);
  } catch (error) {
    return res.status(400).json(`error at getWineById: ${error}`);
  }
};

const getWineByIdNumber = async (req, res, next) => {
  try {
    const { idNumber } = req.params;
    const wine = await Wine.findOne({ idNumber: idNumber });
    return res.status(200).json(wine);
  } catch (error) {
    return res.status(400).json(`error at getWineById: ${error}`);
  }
};

const getWinesByFilters = async (req, res, next) => {
  try {
    const  payload  = {...req.body}
    console.log(payload)

    const keys = ['origin', 'taste', 'temperature', 'price']

    const query = {};

    keys.forEach((key)=>{
      if(payload[key]){
        if(key === 'temperature'){
            query.idealTemperature = {$lte: payload[key]}
          } else if (key === 'price'){
            query[key] = {$lte:payload[key]}
          } else {
            query[key] = payload[key]
          }
        }
    })


    console.log(query)

    const wines = await Wine.find(query)
    console.log(payload)
    return res.status(200).json(wines)
  } catch (err) {
    return res.status(400).json(`error at getWinesByFilters`)
  }
}

// const getWinesByTaste = async (req, res, next) => {
//   try {
//     const { taste } = req.params;
//     const winesByTaste = await Wine.find({ taste: taste });
//     return res.status(200).json(winesByTaste);
//   } catch (error) {
//     return res.status(400).json(`error at getWinesByTaste: ${error}`);
//   }
// };

// const getWinesByColor = async (req, res, next) => {
//   try {
//     const { color } = req.params;
//     const winesByColor = await Wine.find({ color: color });
//     return res.status(200).json(winesByColor);
//   } catch (error) {
//     return res.status(400).json(`error at getWinesByColor: ${error}`);
//   }
// };

// const getWinesByTemperature = async (req, res, next) => {
//   try {
//     const { idealTemperature } = req.params;
//     const winesByTemp = await Wine.find({ idealTemperature: idealTemperature });
//     return res.status(200).json(winesByTemp);
//   } catch (error) {
//     return res.status(400).json(`error at getWinesByTemperature: ${error}`);
//   }
// };

const getWinesByOrigin = async (req, res, next) => {
  try {
    const { origin } = req.params;
    const winesByOrigin = await Wine.find({ origin: origin });
    return res.status(200).json(winesByOrigin);
  } catch (error) {
    return res.status(400).json(`error at getWinesByOrigin: ${error}`);
  }
};

const getWinesByScores = async (req, res, next) => {
  try {
    const { scores } = req.params;
    //! NEED TO CHECK HOW TO CALCULATE THE AVERAGE SCORE
  } catch (error) {
    return res.status(400).json(`error at getWinesByScore: ${error}`);
  }
};

//! PREPARE A PRICE FILTER GIVEN A MINMAX
// find all documents named john and at least 18
// await MyModel.find({ name: 'john', age: { $gte: 18 } }).exec();

const deleteWineById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const wineToDelete = await Wine.findById(id);

    wineToDelete.picture && deleteImgCloudinary(wineToDelete.picture);

    const wineDeleted = await Wine.findByIdAndDelete(id);

    return res.status(200).json(wineDeleted);
  } catch (error) {
    return res.status(400).json(`error at deleteWine: ${error}`);
  }
};

const createWine = async (req, res, next) => {
  try {
    const newWine = new Wine({
      ...req.body,
    });

    if (req.file) {
      newWine.picture = req.file.path;
    }

    const wineDuplicated = await Wine.findOne({ name: req.body.name });
    if (wineDuplicated) {
      return res.status(400).json(`that wine name already exists`);
    }
    const wineSaved = await newWine.save();
    return res.status(201).json(wineSaved);
  } catch (error) {
    return res.status(400).json(`error at createWine: ${error}`);
  }
};

const updateWineById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const wineToUpdate = await Wine.findById(id);
    if (wineToUpdate.picture) {
      deleteImgCloudinary(wineToUpdate.picture);
    }

    const newWine = new Wine({
      name: req.body.name,
      brand: req.body.brand,
      picture: req.body.picture,
      taste: req.body.taste,
      color: req.body.color,
      idealTemperature: req.body.idealTemperature,
      origin: req.body.origin,
      scores: req.body.scores,
      price: req.body.price,
    });

    newWine._id = id;
    if (req.file) {
      newWine.picture = req.file.path;
    }
    const updatedWine = await Wine.findByIdAndUpdate(id, newWine, {
      new: true,
    });

    return res.status(200).json(updatedWine);
  } catch (error) {
    return res.status(400).json(`error at updateWineById: ${error}`);
  }
};

const populateWines = async (req, res, next) => {
  try {
    const wines = await Wine.find().populate("scores");
    return res.status(200).json(`wines populated`);
  } catch (error) {
    return res.status(400).json(`error at populateWines: ${error}`);
  }
};

module.exports = {
  createWine,
  getWines,
  getWineById,
  getWineByIdNumber,
  // getWinesByTaste,
  // getWinesByColor,
  // getWinesByTemperature,
  getWinesByFilters,
  getWinesByOrigin,
  getWinesByScores,
  deleteWineById,
  updateWineById,
  populateWines,
};
