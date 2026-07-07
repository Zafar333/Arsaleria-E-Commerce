const { Pool } = require("pg");
const { createUsersTable } = require("../models/userModels/userModel");
const { createAdminTable } = require("../models/adminModels/adminSignupModel");
const { createProductCategoriesTable } = require("../models/adminModels/productCategoriesModel");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "admin",
  database: "Ecommerce",
  port: 5432,
});

// initDB function is for calling a function whose create tables start from here
async function initDB() {
     try{
      // await pool.connect()
      await pool.query(createAdminTable)
      await pool.query(createUsersTable)
      await pool.query(createProductCategoriesTable)
      
      console.log("✅ Tables created.");

    }catch(err){
    console.error("❌ Error creating tables:", err);
     }
    //  finally{
    //   await pool.end()
    //  }
     
}

// initDB function is for calling a function whose create tables is end here
module.exports ={
  initDB,
  pool,
}


