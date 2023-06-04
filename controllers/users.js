const User = require("../models/user");
const Car = require("../models/car");

module.exports = {
  index: async (req, res, next) => {
    const allUsers = await User.find({});
    res.status(200).json(allUsers);
  },
  newUser: async (req, res, next) => {
    const newUser = new User(req.body);
    const user = await newUser.save();
    res.status(201).json(user);
  },

  userById: async (req, res, next) => {
    const userById = await User.findById(req.params.userId);
    res.status(200).json(userById);
  },

  replaceUser: async (req, res, next) => {
    const { userId } = req.params;
    const newUser = req.body;
    await User.findByIdAndUpdate(userId, newUser);
    res.status(200).json({ success: "Successfully updated" });
  },

  updateUser: async (req, res, next) => {
    const { userId } = req.params;
    const newUser = req.body;
    await User.findByIdAndUpdate(userId, newUser);
    res.status(200).json({ success: "Successfully updated" });
  },

  getUserCars: async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("cars");
    res.status(200).json(user.cars);
  },

  newUserCar: async (req, res, next) => {
    const { userId } = req.params;
    // Create a new car
    const newCar = new Car(req.body);
    // Get user
    const user = await User.findById(userId);
    // Assign user as a car's seller
    newCar.seller = user;
    // Save the car
    await newCar.save();
    // Add car to the user's selling array 'cars'
    user.cars.push(newCar);
    // save the user
    await user.save();

    res.status(201).json(newCar);
  },
};

/*
  We can interact with mongoose in 3 different ways
  1) callbacks
  2) Promises
  3) Async/Await (Promises)
*/
