const knex = require("../database/knex");
const AppError = require("../utils/AppError");

async function checkingIfUserIsAdmin (request, response, next) {
  const user_id = request.user.id;

  try {
    const user = await knex("users").where("id", user_id).first();

    if(user && user.isAdmin === 1) {
      return next();
    }else {
      throw new AppError("Acesso não autorizado.", 401);
    }
  } catch (error) {
    throw new AppError("Erro ao verificar o usuário.", 500);
  }
  
   return response();
}; 
 
module.exports = checkingIfUserIsAdmin
  