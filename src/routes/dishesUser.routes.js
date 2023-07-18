const { Router } = require("express")

const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const dishesUserRoutes = Router();
const DishesUserController = require("../controllers/DishesUserController");

const dishesUserController = new DishesUserController();

dishesUserRoutes.get("/", ensureAuthenticated , dishesUserController.index);
dishesUserRoutes.get("/", ensureAuthenticated , dishesUserController.show);

module.exports = dishesUserRoutes; 