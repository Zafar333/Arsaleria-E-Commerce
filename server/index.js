const express = require ("express");
const router =require("./routes/index.js")
const cors = require("cors");
const { initDB } = require("./database/db.js");
const cookieParser = require("cookie-parser");
require("dotenv").config();


const app = express();
// app.use(cors())
// Custom configuration (recommended):
app.use(cors({
  origin: process.env.FRONTEND_DEVELOPMENT_BASE_URL, // Allow only this origin
  methods: ['GET', 'POST', 'PUT','DELETE','PATCH'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, 
}));
// Custom configuration (recommended):
app.use(cookieParser()) //it is use to set token in a cookie storage of the browser
app.use(express.json()) //it is use to accept json data
app.use(express.urlencoded({ extended: true })); // it is used to accept form data


app.use(router())

const port = process.env.BACKEND_DEVELOPMENT_PORT_URL || 5000;
 initDB(); // ✅ create tables before server starts



(async () => {
  try{
  // await initDB(); // ✅ create tables before server starts
   app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

}catch(err){
  console.error("❌ Failed to initialize the server:", err?.message);
}
})();
