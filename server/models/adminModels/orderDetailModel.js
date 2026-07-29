
const orderDetailModel=
    ` 
    CREATE TABLE IF NOT EXISTS orders_detail (
      id SERIAL PRIMARY KEY,
      products_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
      users_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      price BIGINT NOT NULL,
      payment_status VARCHAR(255) NOT NULL,
      order_status VARCHAR(255),
      contact_no VARCHAR(255),
      created_dat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
   `


module.exports={orderDetailModel}