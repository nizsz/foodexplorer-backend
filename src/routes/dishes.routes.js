const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload")

const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const checkingIfUserIsAdmin = require("../middleware/checkingIfUserIsAdmin");

const dishesRoutes = Router();
const DishesController = require("../controllers/DishesController");
const DishAvatarController = require("../controllers/DishAvatarController");


const dishAvatarController = new DishAvatarController()
const dishesController = new DishesController();
const upload = multer(uploadConfig.MULTER);

dishesRoutes.use(ensureAuthenticated);
dishesRoutes.use(checkingIfUserIsAdmin);

dishesRoutes.get("/",  dishesController.index);
dishesRoutes.post("/", upload.single("avatar"), dishesController.create);
dishesRoutes.put("/:id",  dishesController.update);
dishesRoutes.get("/:id",  dishesController.show);
dishesRoutes.delete("/:id",  dishesController.delete);
dishesRoutes.patch("/avatar/:id", upload.single("avatar"), dishAvatarController.update);

//dishesRoutes.post("/avatar", upload.single("avatar"), dishAvatarController.create);


module.exports = dishesRoutes;  