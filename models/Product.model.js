const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        min: 1
    },
    hasStock: {
        type: Boolean,
        default: true
    },
    tags: {
        type: [String],
        enum: ["spirits", "drink", "italian", "japanise", "best-sellers"]
    },
    imageFile: {
        type: String,
        default: "default.jpg"
    },
    store: {
        type: String,
        enum: ["online", "germany", "colombia"]
    }
});


const Product = mongoose.model('Product', productSchema);


module.exports = Product;