require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path')
const products = require("./Routes/productsRoute");


app.use(cors())
app.use(express.json());
app.use(express.static(path.join(__dirname, 'Frontend')));
app.use(express.urlencoded({extended: true}));

app.use('/api/products', products);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log("server is lisetining");
})