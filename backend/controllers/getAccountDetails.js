const signinForm = require('../models/signinForm');
const bcrypt = require('bcrypt');

exports.getAccountDetails = async(req,res) => {
    try {
        const response = await signinForm.find({});
        res.status(200).json(
            {
                success:true,
                data:response,
                message:"Entry Fetched Successfully"
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
exports.getLoginDeatail = async(req,res) => {
    try {
        const {email} = req.params;
        const response = await signinForm.find({email:email});
        res.status(200).json(
            {
                success:true,
                data:response,
                message:"Entry Fetched Successfully"
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

exports.login = async(req,res) => {
    const {email,password} = req.body;
    if (!email || !password){
        return res.status(400).json({
            success:false,
            message:'Please Fill all the details',
        });
    }
    const user = await signinForm.findOne({email});
    //not registered
    if (!user) {
        return res.status(401).json({
            success:false,
            message:"User not found",
        });
    }

    //verify password
    if (await bcrypt.compare(password,user.password)){
        //password match
        //add jwt
        res.status(200).json(
            {
                success:true,
                data:user,
                message:"User Fetched Successfully"
            }
        )
    }else {
        return res.status(403).json({
            success:false,
            message:"Incorrect Password"
        });
    }
}