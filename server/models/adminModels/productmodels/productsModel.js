const productsModel = `   
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      productCategory INTEGER REFERENCES product_categories(id) ON DELETE CASCADE,
      productName VARCHAR(500) NOT NULL,
      sellProductPrice INT NOT NULL,
      actualproductPrice INT NOT NULL,
      productQuantity INT NOT NULL,
      stockStatus VARCHAR(100) NOT NULL,
      deliveryType VARCHAR(50) NOT NULL,
      deliveryCharges INT,
      productDescription TEXT NOT NULL,
      dairyFarmWeight INT NOT NULL,
      dairyFarmUnit VARCHAR(255) NOT NULL,
      productDiscount INT,
      productBrandName VARCHAR(255),
      dairyFarmExpiryDate DATE,
      dairyFarmMaterial VARCHAR(255),
      productPromoCode VARCHAR(255),
      sku VARCHAR(255),
      created_dat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
   `
   module.exports={productsModel}

