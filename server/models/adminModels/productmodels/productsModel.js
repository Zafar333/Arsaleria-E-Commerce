const productsModel = `   
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      product_category INTEGER REFERENCES product_categories(id) ON DELETE CASCADE,
      product_name VARCHAR(500) NOT NULL,
      actualproduct_price_1kg INT NOT NULL,
      sellproduct_price_1kg INT NOT NULL,
      delivery_type VARCHAR(50) NOT NULL,
      delivery_charges INT,
      product_description TEXT NOT NULL,
      product_discount INT,
      productbrand_name VARCHAR(255),
      dairyfarm_expiryDate DATE,
      dairyfarm_material VARCHAR(255),
      productpromo_code VARCHAR(255),
      created_dat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
   `;
module.exports = { productsModel };
