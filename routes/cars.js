const router = require("express-promise-router")();

const CarsController = require("../controllers/cars");

router.route("/").get(CarsController.index).post(CarsController.createCar);

module.exports = router;
