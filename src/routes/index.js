const {Router} = require("express");

const usersRouter = require("./users.routes");
const dishesRouter = require("./dishes.routes");
const sessionsRouter = require("./sessions.routes");
const ingredientsRouter = require("./ingredients.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/dishes", dishesRouter);
routes.use("/ingredients", ingredientsRouter);
routes.use("/sessions", sessionsRouter);

module.exports = routes