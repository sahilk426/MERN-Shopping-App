//import th model
const updateAccount = require("../models/signinForm");

//define route handler

exports.updateAccount = async(req,res) => {
    try {
        const {email} = req.params;
        const {cart} = req.body;

        const response = await updateAccount.findOneAndUpdate(
            {
                email : email,
            },
            {
                cart,
            },
            {
                new:true
            }
        )
        res.status(200).json(
            {
                success:true,
                data:response,
                message:"Updated Successfully"
            }
        )
    }
    catch(err) {
        console.log("Logging Error");
        console.error(err);
        res.status(500).json({
            success:false,
            data:"Server Error",
            message:err.message,
        })
    }
}