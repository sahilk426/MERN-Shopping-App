const mongoose = require('mongoose');

const orderDetailsSchema = new mongoose.Schema(
    {
        firstname:{
            type:String,
            required:true,
            maxLength:50
        },
        lastname:{
            type:String,
            required:true,
            maxLength:50
        },  
        email:{
            type:String,
            required:true,
            maxLength:50
        },
        number:{
            type:Number,
            required:true,
            maxLength:20
        },
        address:{
            type:String,
            required:true,
            maxLength:250
        },
        orders:[
            {
            }
        ],
        totalAmount:{
            type:Number,
            required:true,
        }
    }
);

module.exports = mongoose.model("orderDetails",orderDetailsSchema);