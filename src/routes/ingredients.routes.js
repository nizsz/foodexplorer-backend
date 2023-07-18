const { Router } = require("express")

const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const checkingIfUserIsAdmin = require("../middleware/checkingIfUserIsAdmin");

const ingredientsRoutes = Router();
const IngredientsController = require("../controllers/IngredientsController");

const ingredientsController = new IngredientsController();

ingredientsRoutes.get("/", ensureAuthenticated ,checkingIfUserIsAdmin, ingredientsController.index);
ingredientsRoutes.delete("/", ensureAuthenticated ,checkingIfUserIsAdmin, ingredientsController.delete);

module.exports = ingredientsRoutes;