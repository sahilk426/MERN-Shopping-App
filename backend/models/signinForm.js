const mongoose = require('mongoose');

const signInSchema = new mongoose.Schema(
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
        password:{
            type:String,
            required:true,
        },
        confirmPassword:{
            type:String,
            required:false,
        },
        address:{
            type:String,
            required:true,
            maxLength:250
        },
        cart:[
            {
                
            }
        ]
    }
);

module.exports = mongoose.model("signinForm",signInSchema);