// is_active = FALSE,
const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      key SERIAL,
      is_active BOOLEAN NOT NULL DEFAULT TRUE,
      name VARCHAR NOT NULL,
      email VARCHAR NOT NULL,
      password VARCHAR,
      user_jwt_refereshtoken VARCHAR,
      user_jwt_accesstoken VARCHAR,
      google_refreshToken VARCHAR,
      image VARCHAR,
      google_id VARCHAR,
      created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
   `;

module.exports = {
  createUsersTable,
};
