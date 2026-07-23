const createProductCategoriesTable=
    ` 
    CREATE TABLE IF NOT EXISTS product_categories (
      id SERIAL PRIMARY KEY,
      category_name VARCHAR(255) NOT NULL,
      is_parent BOOLEAN DEFAULT false NOT NULL,
      isactive_category BOOLEAN DEFAULT true NOT NULL ,
      parent_id INTEGER REFERENCES product_categories(id) ON DELETE CASCADE,
      created_dat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
   `


module.exports={createProductCategoriesTable}