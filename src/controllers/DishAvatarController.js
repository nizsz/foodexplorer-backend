const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage")

class DishAvatarController {
  async create (request, response) {
    const user_id = request.user.id;

    const dishFilename = request.file.filename;
    // Instanciando o diskstorage
    const diskStorage = new DiskStorage()
    // Caso ainda não exista
    const avatar = await diskStorage.saveFile(dishFilename);
    console.log(avatar)

    await knex("dishes").insert({avatar});

    return response.json()
  };

  async update (request, response) {
    const { id } = request.params;
    const avatarFileName = request.file.filename;

    
    const diskStorage = new DiskStorage() 

    const dish = await knex("dishes")
    .where({ id }).first();


    if(!dish) {
      throw new AppError("Prato não encontrado!", 401);
    };

    if(dish.avatar){
      await diskStorage.deleteFile(dish.avatar);
    };

    const filename = await diskStorage.saveFile(avatarFileName);
    dish.avatar = filename;

    await knex("dishes").where({id}).update(dish);

    return response.json(dish);
  } 
};

module.exports = DishAvatarController;