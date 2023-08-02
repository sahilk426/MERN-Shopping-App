const express = require('express');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 5000;


app.use(express.json());

const shoppingAppRoutes = require('./routes/shoppingAppRoutes');

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions));
app.use("/api/v1",shoppingAppRoutes);

app.listen(PORT,() => {
    console.log(`Server Started Successfully at Port ${PORT}`);
});

const dbConnect = require('./config/database');
dbConnect();

app.get('/',(req,res) => {
    res.send(`<h1 style="color:green">THIS IS MY HOMEPAGE</h1>`);
});
