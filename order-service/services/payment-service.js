const orderModel = require("../models/Order");

const ObjectId = require('mongoose').Types.ObjectId;


class PaymentService {
    async doPayment(userId, id) {
        id = new ObjectId(id);
        let orderObj = await orderModel.findOne({_id: id, userId: userId});
        if(!orderObj) {
            throw new Error("No Order exists for User");
        }

        await orderModel.findByIdAndUpdate(id, {
            $set: {
                status: "Paid",
                paidDate: new Date()
            }
        });
        return await orderModel.findOne({_id: id, userId: userId});
    }    
}

module.exports = new PaymentService;