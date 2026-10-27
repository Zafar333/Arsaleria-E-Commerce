const orderDetailModel = ` 
    CREATE TABLE IF NOT EXISTS orders_detail (
      id SERIAL PRIMARY KEY,
      order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
      products_variantid INTEGER REFERENCES products_variants(id) ON DELETE SET NULL, 
      product_name VARCHAR (300) NOT NULL,
      sellproduct_price DECIMAL(20,2) NOT NULL,
      image_url TEXT,
      size VARCHAR(255) NOT NULL,
      unit VARCHAR(50) NOT NULL,
      buy_qunatity BIGINT NOT NULL,
      delivery_charges  DECIMAL(10,2) 
    )
   `;

module.exports = { orderDetailModel };
