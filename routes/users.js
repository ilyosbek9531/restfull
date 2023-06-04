const router = require("express-promise-router")();

const UsersController = require("../controllers/users");

router.route("/").get(UsersController.index).post(UsersController.newUser);

router
  .route("/:userId")
  .get(UsersController.userById)
  .put(UsersController.replaceUser)
  .patch(UsersController.updateUser);

router
  .route("/:userId/cars")
  .get(UsersController.getUserCars)
  .post(UsersController.newUserCar);

module.exports = router;
