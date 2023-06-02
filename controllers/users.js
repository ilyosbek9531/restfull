const User = require("../models/user");

module.exports = {
  index: async (req, res, next) => {
    const allUsers = await User.find({});
    res.status(200).json(allUsers);
  },
  newUser: async (req, res, next) => {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  },
};

/*
  We can interact with mongoose in 3 different ways
  1) callbacks
  2) Promises
  3) Async/Await (Promises)
*/
