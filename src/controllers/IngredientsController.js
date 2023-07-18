const knex = require("../database/knex");

class IngredientsController {
  async index (request,response) {
    const user_id = request.user.id;
   
    const ingredients = await knex("ingredients")
    .where({ user_id })

    return response.json(ingredients);
  };

  async delete (request, response) {
    const user_id = request.user.id;

    const ingredients = await knex("ingredients").where({user_id}).first();


    console.log(ingredients.id)
   
    await knex("ingredients").where({id: ingredients.id}).delete();
    

    return response.json();
  }
};
 
module.exports = IngredientsController;