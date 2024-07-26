const Car = require("../models/car_model");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../routes/extraRoutes");

const getAllCar = async (req, res) => {
  try {
    const cars = await Car.find();
    if (!cars) {
      res.send("we have no cars");
    }
    res.status(200).send(cars);
  } catch (error) {
    res.send(error);
  }
};

const addNewCar = async (req, res) => {
  const { token } = req.cookies;
  try {
    if (!token) {
      res.status(404).send("you are not loged in");
    } else {
      jwt.verify(token, jwtSecret, {}, async (err, userDoc) => {
        if (err) throw err;
        const {
          ism,
          telefon,
          narx,
          marka,
          model,
          yil,
          probeg,
          manzil,
          rang,
          qoshimchaMalumotlar,
          rasimlar,
        } = req.body;

        const newCar = await Car.create({
          ism,
          telefon,
          narx,
          marka,
          model,
          yil,
          probeg,
          manzil,
          rang,
          qoshimchaMalumotlar,
          rasimlar,
          ega: userDoc.id,
        });
        res.status(201).send(newCar);
      });
    }
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

const getCar = async (req, res) => {
  try {
    const getCarbyId = await Car.findById(req.params.id);
    if (!getCarbyId) {
      res.status(404).send("car is not defined");
    }
    res.status(200).send(getCarbyId);
  } catch (error) {
    res.send(error);
  }
};

const deleteCar = async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);

    res.json({
      message: "deleted",
    });
  } catch (error) {
    res.send(error);
  }
};

const updateCar = async (req, res) => {
  try {
    const id = res.body.id;
    const {
      ism,
      telefon,
      narx,
      marka,
      model,
      yil,
      probeg,
      manzil,
      rang,
      qoshimchaMalumotlar,
      rasimlar,
    } = req.body();

    const editedCar = await Car.findByIdAndUpdate(id, {
      ism,
      telefon,
      narx,
      marka,
      model,
      yil,
      probeg,
      manzil,
      rang,
      qoshimchaMalumotlar,
      rasimlar,
    });
    res.status(201).json(editedCar);
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  getAllCar,
  getCar,
  addNewCar,
  deleteCar,
  updateCar,
};
