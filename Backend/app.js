const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path')

app.use(cors())
app.use(express.json());
app.use(express.static(path.join(__dirname, 'Frontend')));
app.use(express.urlencoded({extended: true}));

app.get('/api/test/', (req, res) => {
   res.json({msg: "backend is connected"});
})

app.listen(5000, () => {
   console.log("server is lisetining");
})