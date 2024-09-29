Swag Shop API

The Swag Shop API is a Node.js and Express-based API for managing products and wishlists in a shopping app. It connects to a MongoDB database using Mongoose and provides endpoints to add, retrieve, and update products and wishlists.
Features

    Add new products to the database
    Retrieve a list of all products
    Create and retrieve wishlists
    Add products to wishlists

Prerequisites

Make sure you have the following installed:

    Node.js
    MongoDB
    npm (Node Package Manager)

Getting Started
1. Clone the Repository

bash

git clone https://github.com/your-username/swag-shop-backend.git
cd swag-shop-backend

2. Install Dependencies

Use npm or yarn to install the required packages:

bash

npm install

3. Start MongoDB

Ensure MongoDB is running on your system. You can run it locally by executing:

bash

mongod

4. Run the API

bash

node server.js

The API will start on port 3000:

arduino

Swag Shop API running on port 3000...

API Endpoints
1. Add a Product

POST /product

Add a new product to the database.

Request Body:

json

{
  "title": "Product Name",
  "price": 100
}

Response:

json

{
  "_id": "product_id",
  "title": "Product Name",
  "price": 100
}

2. Get All Products

GET /product

Retrieve a list of all products in the database.

Response:

json

[
  {
    "_id": "product_id",
    "title": "Product Name",
    "price": 100
  }
]

3. Create a Wishlist

POST /wishlist

Create a new wishlist. The title is required.

Request Body:

json

{
  "title": "My Wishlist"
}

Response:

json

{
  "_id": "wishlist_id",
  "title": "My Wishlist",
  "products": []
}

4. Get All Wishlists

GET /wishlist

Retrieve a list of all wishlists, including the products added to each wishlist.

Response:

json

[
  {
    "_id": "wishlist_id",
    "title": "My Wishlist",
    "products": [
      {
        "_id": "product_id",
        "title": "Product Name",
        "price": 100
      }
    ]
  }
]

5. Add a Product to Wishlist

PUT /wishlist/product/add

Add a product to an existing wishlist.

Request Body:

json

{
  "productId": "product_id",
  "wishListId": "wishlist_id"
}

Response:

json

{
  "message": "Successfully added to wishlist."
}

Error Handling

All endpoints provide error responses with meaningful messages. For example:

    400: Missing required fields (e.g., "Title is required")
    404: Product or Wishlist not found
    500: Internal server errors during operations

Project Structure

bash

.
├── models
│   ├── product.js         # Mongoose Product schema
│   └── wishlist.js        # Mongoose Wishlist schema
├── server.js              # Main server and routes
├── package.json           # Project dependencies
└── README.md              # This file

Technologies Used

    Node.js: JavaScript runtime
    Express: Web framework for Node.js
    MongoDB: NoSQL database
    Mongoose: MongoDB object modeling for Node.js
    body-parser: Middleware to parse request bodies

License

This project is licensed under the MIT License.
