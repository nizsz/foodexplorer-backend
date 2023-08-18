const knex = require("../database/knex");
const { hash } = require("bcryptjs");

const createUserAdmin = async() => {
  try {
    const adminUserEmail = process.env.ADMINNAME;
    const adminPassword = process.env.ADMINPASSWORD;
    const isAdmin = 1;

    const adminUser = await knex("users").where("email", adminUserEmail).first();

    if(!adminUser) {
      const newUserAdmin = {email: adminUserEmail, isAdmin: isAdmin, password: await hash(adminPassword, 10)};
      await knex("users").insert(newUserAdmin);
    }else if(adminUser) {
      return
    };

  } catch (error) {
    console.error("Failed to create admin user:", error);
  }
};

module.exports = createUserAdmin; 