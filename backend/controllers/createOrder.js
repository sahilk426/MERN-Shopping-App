const orderDetails = require('../models/orderDetails');

exports.createOrder = async(req,res) => {
    try {
        const {firstname,lastname,email,number,address,orders,totalAmount} = req.body;
        const response = await orderDetails.create({firstname,lastname,email,number,address,orders,totalAmount});
        res.status(200).json(
            {
                success:true,
                data:response,
                message:"Order Placed Successfully"
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