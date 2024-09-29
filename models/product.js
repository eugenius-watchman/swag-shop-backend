var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// var ObjectId = mongoose.Schema.Types.ObjectId;

// constructor 
var productSchema = new Schema({
    // define data 
    title: String,
    price: Number,
    likes: {type: Number, default: 0}
})

// export 
module.exports = mongoose.model("Product", productSchema)