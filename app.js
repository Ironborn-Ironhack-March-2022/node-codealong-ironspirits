const express = require('express');
const app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

app.use(express.static('public'));




/* Routes */

app.get("/", (req, res, next)=>{
    res.render("home");
});


app.get("/about", (req, res, next) => {
    res.render("about");
});


app.get("/contact", (req, res, next) => {
    res.render("contact");
});




app.get("/limoncello", (req, res, next) => {

    const data = {
        title: "Limoncello",
        price: 20,
        imageFile: "product-limoncello.png",
        stores: ["Online", "Albacete", "Freiburg", "Amsterdam"]
    }

    res.render("product", data);
});


app.get("/whisky", (req, res, next) => {

    const data = {
        title: "Single Malt Whisky Yamakazi",
        price: 105,
        imageFile: "whisky-yamazaki.jpg"
    }

    res.render("product", data);
});


app.get("/tequila", (req, res, next) => {

    const data = {
        title: "Tequila Don Julio",
        price: 35,
    }

    res.render("product", data);
});







app.listen(3001, () => {
    console.log("server listening to requests...")
});


