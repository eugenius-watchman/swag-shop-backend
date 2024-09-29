var express = require("express");
var app = express();

var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// connection to DB
var db = mongoose.connect("mongodb://localhost/swag-shop")

// import models into server.js
var Product = require("./models/product");
var WishList = require("./models/wishlist");


// middle ware to user body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));


// api product endpoint post
app.post('/product', function(request, response){
    var product = new Product();
    product.title = request.body.title;
    product.price = request.body.price;

    // product.save(function(err, savedProduct){
    //     if (err) {
    //         response.status(500).send({error:"Could not save product."});
    //     } else {
    //         response.send(savedProduct);
    //     }

    product.save()
        .then(function(savedProduct){
            response.send(savedProduct);
        })
        .catch(function(err) {
            response.status(500).send({error: "Could not save product."});
        })
});


// api product endpoint get
app.get('/product', function(request, response){
    // Product.find({}, function(err, products){
    //     if (err){
    //         response.status(500).send({error: "Could not fetch products"});
    //     } else {
    //         response.send(products);
    //     }
    // })
    Product.find({})
        .then(products => response.send(products))
        .catch(err => response.status(500).send({error: "Could not fetch products."}));
});

/* wishlists */
app.post('/wishlist', function(request, response){
     // Validate that the 'title' field is present in the request body
    if (!request.body.title) {
        return response.status(400).send({ error: "Title is required." });
    }

    // creating a new WishList instance
    var wishList = new WishList();
    
    // set the title of the wishlist to value sent in the request body
    wishList.title = request.body.title;

    // save the wishlist to the database 
    wishList.save()
            // if successful, send the saved wishlist as the response
        .then(function(savedwishList){
            response.send(savedwishList)
        })
        .catch(function(err){
                // if there is an error during the save operation, send error message 
            response.status(500).send({error: "Could not create wishlist."})
        })
})

// api wishlist endpoint get
app.get('/wishlist', function(request, response){
    WishList.find({})
    .populate({path:"products", model: "Product"})
    .exec()
    .then(wishlists => response.status(200).send(wishlists))
    .catch(err => response.status(500).send({error: "Could not fetch wishlists."}))

});

// update the wish list
// app.put('/wishlist/product/add', function(request, response){
//     // find product in db 
//     Product.findOne({_id: request.body.productId}, function(err, product){
//         if (err) {
//             response.status(500).send({error: "Could not add item to wishlist."})
//         } else {
//             WishList.updateMany({_id: request.body.wishListId}, 
//                 {$addToSet: {products: product._id}}, function(err, wishlist){
//                     if (err){
//                         response.status(500).send({error: "Could not add item to wishlist."})

//                     } else {
//                         response.send(wishList)
//                     }
//                 });
//         }
//     })
// });

app.put('/wishlist/product/add', function(request, response){
    // find the product in the db using Promises
    Product.findOne({_id: request.body.productId})
        .then(function(product){
            // if no product exists, send a 404 response
            if (!product){
                return response.status(404).send({ error: "Product not found."});
            } 
            
            // update wishlist by adding product using $addToSet 
            return WishList.updateMany(
                {_id: request.body.wishListId },
                {$addToSet: {products: product._id }}
            );
        })
        .then(function(updatedWishList) {
            // if the wishlist is successfully updated, send the updated wishlist
            response.send("Successfully added to wishlist.");
        })
        .catch(function(err) {
            // if any error occurs during product find or wishlist update, send 500 error
            response.status(500).send({ error: "Could not add item to wishlist." });
        });
});


// get server running
app.listen(3000, function() {
    console.log("Swag Shop API running on port 3000...");
})