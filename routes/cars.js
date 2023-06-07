const router = require("express-promise-router")();

const CarsController = require("../controllers/cars");

router.route("/").get(CarsController.index).post(CarsController.createCar);

router.route("/:carId").get(CarsController.getCar);

module.exports = router;
