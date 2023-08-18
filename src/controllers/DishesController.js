const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class DishesController{
  async create(request, response) {
    const {title, description, price, category, ingredients} = request.body;
    const user_id = request.user.id;
    
    const date = new Date();
    const hours = date.toLocaleTimeString();
    const day = date.toLocaleDateString();
    const created_at = `${day} às ${hours}`;
    const updated_at = `${day} às ${hours}`;
    

    //const dishFilename = request.file.filename;
    
    //const diskStorage = new DiskStorage()
    
    //const avatar = await diskStorage.saveFile(dishFilename);


    const [dish_id] = await knex("dishes").insert({
      user_id,
      title,
      description,
      price, 
      //avatar,
      category,  
      created_at,  
      updated_at 
    }); 
  
    const ingredientsArray = JSON.parse(ingredients)
    const ingredientsInsert = ingredientsArray.map(ingredient => {
      return {
        dish_id,
        name: ingredient,
        user_id 
      }
    })

    
    if(ingredients.length > 0) {
      await knex("ingredients").insert(ingredientsInsert);
    }
    

    await knex("category").insert({
      dish_id,
      name: category
    });

    

    return response.json();
 
  };
 
  async update(request, response) {
    const {title, description, price, category, ingredients} = request.body;
    const { id } = request.params;
    const user_id = request.user.id;
 
    const date = new Date();
    const hours = date.toLocaleTimeString();
    const day = date.toLocaleDateString();
    const updated_at = `${day} às ${hours}`;

    const dish = await knex("dishes").where({id}).first();

    if(!dish) {
      throw new AppError("Prato não encontrado");
    };

    const dishWhithUpdatedTitle = await knex("dishes").where({title}).first();

    if(dishWhithUpdatedTitle && dishWhithUpdatedTitle.title === dish.title) {
      throw new AppError("O título do prato já está em uso")
    };


    dish.title = title === "" ? dish.title : title;
    dish.description = description === "" ? dish.description : description;
    dish.price = price === "" ? dish.price : price;
    dish.category = category === "" ? dish.category : category;
    
    
    await knex("dishes").where({id}).update(dish);
    await knex("dishes").where({id}).update({updated_at});


    const newIngredient = await knex("ingredients").where({dish_id: id});
    
    const ingredientsInsert = ingredients.map(ingredient => {  
      if(newIngredient && newIngredient.name !== ingredient){
        return {
          name: ingredient,
          dish_id: id,
          user_id,
        }
      }
    });

    
    if (ingredients.length > 0){

      await knex("ingredients").insert(ingredientsInsert);
    }

  
    return response.status(200).json();
  };

  async show(request, response) {
    const {id} = request.params;

    const dish = await knex("dishes").where({ id }).first();
    const ingredients = await knex("ingredients").where({dish_id: id}).orderBy("name");
    const category = await knex("category").where({dish_id: id}).orderBy("name");

    return response.json({
      ...dish,
      ingredients,
      category
    })
  };

  async index (request, response) {
    const { title, ingredients } = request.query;
    const user_id = request.user.id;
    
    let dishes;

    if(ingredients) {
      const filterIngredients = ingredients.split(",").map(ingredient => ingredient.trim());

      dishes = await knex("ingredients")
      .select([
        "dishes.id",
        "dishes.title",
        "dishes.user_id",
      ])
      .where("dishes.user_id", user_id)
      .whereLike("dishes.title",  `%${title}%`)
      .whereIn("name", filterIngredients)
      .innerJoin("dishes", "dishes.id", "ingredients.dish_id")
      .groupBy("dishes.id")
      .orderBy("dishes.title")

    } else{

      dishes = await knex("dishes")
      .where({ user_id })
      .whereLike("title", `%${title}%`)
      .orderBy("title")
    }

    const userIngredients = await knex("ingredients").where({ user_id })
    const dishesWithIngredients = dishes.map(dish => {
      const dishIngredients = userIngredients.filter(ingredient => ingredient.dish_id === dish.id)
    
      return {
        ...dish,
        ingredients: dishIngredients
      }
    })


    return response.json(dishesWithIngredients)
  };

  async delete(request, response){
    const {id}= request.params;

    await knex("dishes").where({id}).delete();

    return response.json();
  };

}; 

module.exports = DishesController;