const HomeCarouselMediaModel = ` CREATE TABLE IF NOT EXISTS homecarousel_media (
    id SERIAL PRIMARY KEY,
    secure_url TEXT NOT NULL,
    resource_type VARCHAR(30) NOT NULL,
    format VARCHAR(30) NOT NULL,
    original_filename VARCHAR(200) NOT NULL,
      asset_folder TEXT NOT NULL,
      public_id VARCHAR(500) NOT NULL
    )`;
module.exports = { HomeCarouselMediaModel };
