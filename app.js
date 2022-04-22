const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Product = require('./models/Product.model');
const app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

/* Connect to DB */
mongoose
    .connect('mongodb://localhost/ironborn-ecommerce')
    .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch(err => console.error('Error connecting to mongo', err));



/* Routes */

app.get("/", (req, res, next) => {
    res.render("home");
});


app.get("/about", (req, res, next) => {
    res.render("about");
});


app.get("/contact", (req, res, next) => {
    res.render("contact");
});


app.get("/products", (req, res, next) => {

    let filter;
    const max = req.query.maxPrice;
    
    if(max === undefined){
        filter = {};
    } else {
        filter = {price: {$lte: max} };
    }

    Product.find(filter)
        .then( productsArr => {
            res.render("productList", {products: productsArr} );
        })
        .catch( error => console.log("error getting products from DB", error) );
})


app.get("/products/:productId", (req, res, next) => {
    Product.findById(req.params.productId)
        .then(productDetails => {
            res.render("product", productDetails);
        })
        .catch(error => console.log("error getting product from DB", error));
})


app.post("/products/new", (req, res, next) => {

    const newProduct = {
        title: req.body.title,
        price: req.body.price
    };

    Product.create(newProduct)
        .then( newProduct => {
            res.redirect("/products"); //redirect to the products page
        })
        .catch(error => {
            console.log("error creating new product", error);
            res.redirect("/"); //@todo: display a nice error msg
        });

})


app.listen(3001, () => {
    console.log("server listening to requests...")
});


