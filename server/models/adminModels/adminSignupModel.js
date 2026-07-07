

const createAdminTable=
    ` 
    CREATE TABLE IF NOT EXISTS admin (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      admin_type VARCHAR(255),
      admin_jwt_refereshToken VARCHAR,
      contact_no VARCHAR(255),
      created_dat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
   `


module.exports={createAdminTable}