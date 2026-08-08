const productsVariantModel = `
 CREATE TABLE IF NOT EXISTS products_variants (
      id SERIAL PRIMARY KEY,
      products_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
      product_size VARCHAR (255) NOT NULL,
      dairyfarm_unit VARCHAR(30) NOT NULL,
      product_quantity INT NOT NULL,
      sellproduct_price DECIMAL(10,2) NOT NULL,
      stock_status VARCHAR(100) NOT NULL,
      sku VARCHAR(255)
    )
   `;
module.exports = { productsVariantModel };
