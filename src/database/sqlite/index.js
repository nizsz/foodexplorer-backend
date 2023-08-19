const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
const path = require("path");

const createUserAdmin = require("../../../utils/CreateUserAdmin");

async function sqliteConnection() {
  const database = await sqlite.open({
    filename: path.resolve(__dirname, "..", "database.db"),
    driver: sqlite3.Database
  });
  
  await createUserAdmin(); 
  return database
};

module.exports = sqliteConnection;