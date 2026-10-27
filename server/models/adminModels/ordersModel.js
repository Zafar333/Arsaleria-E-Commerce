const ordersModel = ` 
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      user_name VARCHAR(255) NOT NULL, 
      users_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
      total_price DECIMAL(20,2) NOT NULL,
      payment_status VARCHAR(255) NOT NULL,
      order_status VARCHAR(255) DEFAULT 'pending',
      contact_no VARCHAR(255),
      city VARCHAR(255),
      postal_code VARCHAR(255),
      Shipping_address VARCHAR(255),
      created_dat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
   `;

module.exports = { ordersModel };
