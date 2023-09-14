const cartModel = require("../models/Cart");
const cartDetailsModel = require("../models/CartDetails");

const orderModel = require("../models/Order");
const orderDetailsModel = require("../models/OrderDetails");

const ProductClient = require("../helpers/product-client");
var randomstring = require("randomstring");

const ObjectId = require('mongoose').Types.ObjectId;

class OrderService {
    
    async addOrder(userId, order) {
        let cartObj = await cartModel.findOne({userId: userId});
        if(!cartObj) {
            throw new Error("No Item exists in cart");
        }
        let cartDetailsList = await cartDetailsModel.find({cartId: cartObj.id});
        if(cartDetailsList.length === 0) {
            throw new Error("No Item exists in cart");
        } 
        
        
        return Promise.all(cartDetailsList.map( async cartDetails => {
            const responseData = await ProductClient.getProductInfo(cartDetails.productId );
            if(responseData ) {
                if(responseData.stockQty < cartDetails.qty ) {
                    throw new Error("Less stock");    
                }
            } else {
                throw new Error("Facing some issue to get stock")
            }
        })).then( async (result) => {
            let cartObj = await cartModel.findOne({userId: userId});
            if(!cartObj) {
                throw new Error("No Cart exists for User");
            }
            let cartDetailsList = await cartDetailsModel.find({cartId: cartObj.id});
    
            let orderObj = {};
            let rstring = randomstring.generate({
                length: 12,
                charset: 'alphanumeric'
              });

            orderObj = await orderModel.create({
                userId: userId,
                orderNo: rstring,
                status: "Pending",
                totalAmount: cartObj.totalAmount,
                orderDate: new Date()
            });
    
            for(let i=0;i<cartDetailsList.length;i++) {
                await orderDetailsModel.create({
                    orderId: orderObj.id, 
                    productId: cartDetailsList[i].productId,
                    qty: cartDetailsList[i].qty,
                    price: cartDetailsList[i].price,                    
                });
                // ProductClient.reduceProductQtyFromInventory(cartDetailsList[i].productId, cartDetailsList[i].qty );
            }
    
            
            await cartDetailsModel.deleteMany({cartId: cartObj.id});
            await cartModel.deleteOne({userId: userId});
        

            return orderObj;
    
        }).catch((error) => {
            console.log(error);
            throw new Error("Facing some issue add order")
        });

    }

    async getOrders(userId) {
        let orders = await orderModel.find({userId: userId});
        
        return orders;
    }

    async getOrder(userId, id) {
        id = new ObjectId(id);
        let orderObj = await orderModel.findOne({_id: id, userId: userId});
        if(!orderObj) {
            throw new Error("No Order exists for User");
        }
        return orderObj;
    }

    async getOrderDetails(userId, id) {
        id = new ObjectId(id);
        let orderObj = await orderModel.findOne({_id: id, userId: userId});
        if(!orderObj) {
            throw new Error("No Order exists for User");
        }
        let orderDetailsList = await orderDetailsModel.find({orderId: id});
        let productIdList = orderDetailsList.map(order => order.productId);

        let productList = await ProductClient.getProductInfoForMultiple(productIdList);
        console.log(productList);
        let orderDetailsListUpdated = orderDetailsList.map(orderDetails => {
            let orderDetailsNew = orderDetails.toObject();
            orderDetailsNew.product = {};
            productList.forEach(product => {
                if(product._id + '' == orderDetailsNew.productId + '') {
                    orderDetailsNew.product = product;
                }
            });
            return orderDetailsNew;
        });
        return orderDetailsListUpdated;
        
    }
}

module.exports = new OrderService;