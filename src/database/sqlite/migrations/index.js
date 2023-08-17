const createUserAdmin = require("../../../utils/CreateUserAdmin");
const sqliteConnection = require("../../sqlite");
const createUsers = require("./createUsers");

async function migrationsRun(){
  const schemas = [
    createUsers
  ].join("");
  
  sqliteConnection()
  .then(db => db.exec(schemas))
  .catch(error => console.error(error))
};

createUserAdmin();

module.exports = migrationsRun;
