const express = require("express")
const dotenv = require("dotenv").config()
const cors = require('cors');
const app = express()

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

require("./db/db")()

const users = require("./router/user");
app.use("/user", users);

const products = require("./router/product")
app.use("/product", products)

const basket = require("./router/basket")
app.use("/basket", basket)

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server ${process.env.PORT} portunda çalışıyor`);
});