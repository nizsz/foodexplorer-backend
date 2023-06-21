const { Router } = require("express")

const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const checkingIfUserIsAdmin = require("../middleware/checkingIfUserIsAdmin");

const ingredientsRoutes = Router();
const IngredientsController = require("../controllers/IngredientsController");

const ingredientsController = new IngredientsController();

ingredientsRoutes.get("/", ensureAuthenticated ,checkingIfUserIsAdmin, ingredientsController.index);

module.exports = ingredientsRoutes;