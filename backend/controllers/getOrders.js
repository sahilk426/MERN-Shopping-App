const getOrders = require('../models/orderDetails');

exports.getOrders = async(req,res) => {
    try {
        const response = await getOrders.find({});
        res.status(200).json(
            {
                success:true,
                data:response,
                message:"Orders Fetched Successfully"
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