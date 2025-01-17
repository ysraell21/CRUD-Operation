# Build a RESTful CRUD API ( NodeJS + ExpressJS + MongoDB )

## Instructions for Testing Sample Queries in Postman
- Get all products
  - http://localhost:3000/products
- Insert a specific product
  - http://localhost:3000/insert_product
- Insert multiple products
  - http://localhost:3000/insert_products
- Get specific product
  - http://localhost:3000/products/{id}
- Update Specific Product
  - http://localhost:3000/products/{id}
- Remove Specific Product
  - http://localhost:3000/remove_product/{id}  

### Here is the URL for the deployed version.
__https://crud-operation-nodejs-expressjs-mongodb.onrender.com/products__
#### Below is the sample body
`{
    "product_name": "San Miguel Beer Super Dry Bottle - 330ml",
    "product_quantity": 130,
    "product_price": 70,
    "product_image": "https://boozeshop.ph/pub/media/catalog/product/cache/6f78ceed2ded4343fc044eeb4cc87722/s/a/san_mig_super_dry_bottle_330ml_x6.png"
}`
