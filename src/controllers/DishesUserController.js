const knex = require("../database/knex")

class DishesUserController {
  async index (request, response) {
    const {title, ingredients} = request.query;


    let dishes;

    if(ingredients) {
      const filterIngredients = ingredients.split(",").map(ingredient => ingredient.trim())
      
      dishes = await knex("ingredients")
      .select([
        "dishes.id",
        "dishes.title"
      ])
      .whereLike("dishes.title", `%${title}%`)
      .whereIn("name", filterIngredients)
      .innerJoin("dishes", "dishes.id", "ingredients.dish_id")
      .groupBy("dishes.id")
      .orderBy("dishes.title")


    } else {

      dishes = await knex("dishes")
      .whereLike("title", `%${title}%`)
      .orderBy("title")
      
    }

    const userIngredients = await knex("ingredients")
    const dishesWithIngredients = dishes.map(dish => {
      const dishIngredients = userIngredients.filter(ingredient => ingredient.dish_id === dish.id)
    
      return {
        ...dish,
        ingredients: dishIngredients
      }
    })


    return response.json(dishesWithIngredients)
  };

  async show (request, response) {
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
};

module.exports = DishesUserController;