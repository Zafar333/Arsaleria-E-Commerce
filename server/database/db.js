const { Pool } = require("pg");
const { createUsersTable } = require("../models/userModels/userModel");
const { createAdminTable } = require("../models/adminModels/adminSignupModel");
const {
  createProductCategoriesTable,
} = require("../models/adminModels/productCategoriesModel");
const {
  productsModel,
} = require("../models/adminModels/productmodels/productsModel");
const {
  productsMediaModel,
} = require("../models/adminModels/productmodels/productsMediaModel");
const { orderDetailModel } = require("../models/adminModels/orderDetailModel");
const {
  productsVariantModel,
} = require("../models/adminModels/productmodels/productsVariantModel");
const {
  HomeCarouselMediaModel,
} = require("../models/adminModels/HomeCarouselMediaModel");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "admin",
  database: "Ecommerce",
  port: 5432,
});

// initDB function is for calling a function whose create tables start from here
async function initDB() {
  try {
    // await pool.connect()
    await pool.query(createAdminTable);
    await pool.query(createUsersTable);
    await pool.query(createProductCategoriesTable);
    await pool.query(productsModel);
    await pool.query(productsMediaModel);
    await pool.query(orderDetailModel);
    await pool.query(productsVariantModel);
    await pool.query(HomeCarouselMediaModel);

    console.log("✅ Tables created.");
  } catch (err) {
    console.error("❌ Error creating tables:", err?.message);
  }
  //  finally{
  //   await pool.end()
  //  }
}

// initDB function is for calling a function whose create tables is end here
module.exports = {
  initDB,
  pool,
};
