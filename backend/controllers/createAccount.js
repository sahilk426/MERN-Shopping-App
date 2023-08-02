const signinForm = require('../models/signinForm');
const bcrypt = require('bcrypt');

exports.createAccount= async(req,res) => {
    try {
        const {firstname,lastname,email,number,password,confirmPassword,address} = req.body;
        const checkEmail = await signinForm.findOne({email});
        if (checkEmail) {
            return res.status(500).json({
                success:false,
                message:"User Already Exists"
            })
        }
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch (err) {
            return res.status(503).json({
                success: false,
                message: "Error in hashing password",
            })
        }
        const response = await signinForm.create({firstname,lastname,email,number,password:hashedPassword,address});
        res.status(200).json(
            {
                success:true,
                data:response,
                message:"Entry Created Successfully"
            }
        )
    }catch(err) {
        console.log("Logging Error");
        console.error(err);
        res.status(500).json({
            success:false,
            data:"Server Error",
            message:err.message,
        })
    }
}