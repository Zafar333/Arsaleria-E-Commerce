const createUsersTable =
   `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      key SERIAL,
      name VARCHAR NOT NULL,
      email VARCHAR NOT NULL,
      password VARCHAR,
      user_jwt_refereshToken VARCHAR,
      user_jwt_accessToken VARCHAR,
      google_refreshToken VARCHAR,
      image VARCHAR,
      google_id VARCHAR,
      created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
   `
// const getAllExamples = async () => {
//   const { rows } = await db.query('SELECT * FROM examples');
//   return rows;
// };

// const createExample = async (name, description) => {
//   const { rows } = await db.query(
//     'INSERT INTO examples (name, description) VALUES ($1, $2) RETURNING *',
//     [name, description]
//   );
//   return rows[0];
// };

module.exports = {
  createUsersTable
//   getAllExamples,
//   createExample,
};