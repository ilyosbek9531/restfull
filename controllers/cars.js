const Car = require("../models/car");
const User = require("../models/user");

module.exports = {
  index: async (req, res, next) => {
    // Get all the cars
    const cars = await Car.find({});
    res.status(200).json(cars);
  },

  createCar: async (req, res, next) => {
    // Find actual seller
    const seller = await User.findById(req.body.seller);

    // Create car
    const car = new Car(req.body);
    await car.save();

    // add newly created car to the actual seller
    seller.cars.push(car);
    await seller.save();

    res.status(201).json(car);
  },

  getCar: async (req, res, next) => {
    const { carId } = req.params;
    const car = await Car.findById(carId);
    res.status(200).json(car);
  },
};
