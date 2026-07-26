const productsMediaModel = `   
    CREATE TABLE IF NOT EXISTS products_media (
      id SERIAL PRIMARY KEY,
      products_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
      asset_folder TEXT NOT NULL,
      public_id VARCHAR(500) NOT NULL,
      secure_url TEXT NOT NULL,
      resource_type VARCHAR(30) NOT NULL,
      format VARCHAR(30) NOT NULL,
      original_filename VARCHAR(200) NOT NULL
    )
   `
   module.exports={productsMediaModel}

