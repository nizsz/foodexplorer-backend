const knex = require("../database/knex");
const AppError = require("../utils/AppError");

async function checkingIfUserIsAdmin (request, response, next) {
  const isAdmin = await knex("users").select("email").whereLike("email", `%admin%`).orderBy("email");  

  if(!isAdmin) {
    throw new AppError("Somente um usuário Admin pode criar ou alterar o prato!", 401); 
  };
  
  if(isAdmin) {
    return next();
  }
  
  return response()
}; 
 
module.exports = checkingIfUserIsAdmin
  