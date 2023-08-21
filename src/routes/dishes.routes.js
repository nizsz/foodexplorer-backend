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
//dishesRoutes.use(checkingIfUserIsAdmin);

dishesRoutes.get("/",  dishesController.index);
dishesRoutes.post("/", checkingIfUserIsAdmin, upload.single("avatar"), dishesController.create);
dishesRoutes.put("/:id", checkingIfUserIsAdmin, dishesController.update);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.delete("/:id", checkingIfUserIsAdmin, dishesController.delete);
dishesRoutes.patch("/avatar/:id", checkingIfUserIsAdmin, upload.single("avatar"), dishAvatarController.update);



module.exports = dishesRoutes;  