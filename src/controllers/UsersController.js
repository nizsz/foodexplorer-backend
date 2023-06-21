const AppError = require("../utils/AppError");
const { hash } = require("bcryptjs");

const sqliteConnection = require("../database/sqlite/")

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;
    const date = new Date();
    const hours = date.toLocaleTimeString();
    const day = date.toLocaleDateString();
    const created_at = `${day} às ${hours}`;
    const updated_at = `${day} às ${hours}`;
    
    if(!name) {
      throw new AppError("Nome é necessário");
    };

    if(!email) {
      throw new AppError("Email é obrigatório");
    };

    if(!password) {
      throw new AppError("Senha é obrigatório");
    };

    const database = await sqliteConnection();
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]);


    if(checkUserExists) {
      throw new AppError("Email já está em uso!!");
    }; 
 
    const hashedPassword = await hash(password, 8);

    await database.run(
      "INSERT INTO users (name, email, password, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
        [name, email, hashedPassword, created_at, updated_at]
      );

    return response.status(201).json();
  }
};

module.exports = UsersController;