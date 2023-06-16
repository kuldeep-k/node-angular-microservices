const cartModel = require("../models/Cart");
const cartDetailsModel = require("../models/CartDetails");
const ObjectId = require('mongoose').Types.ObjectId;
const ProductClient = require("../helpers/product-client");
class CartService {
    async addItemIntoCart(userId, cartItem) {
        let cartObj = await cartModel.findOne({userId: userId});
        if(!cartObj) {
            cartObj = await cartModel.create({
                userId: userId,
                totalAmount: 0
            });
        }
        let cartDetailsObj = await cartDetailsModel.findOne({cartId: cartObj.id, productId: cartItem.productId});
        if(!cartDetailsObj) {
            cartDetailsObj = await cartDetailsModel.create({
                cartId: cartObj.id, 
                productId: cartItem.productId,
                qty: cartItem.qty,
                price: cartItem.price,
                
            });
        } else {
            throw new Error("Item already exists in cart");
        }
        
        let cartDetailsList = await cartDetailsModel.find({cartId: cartObj.id});
        const totalAmount = cartDetailsList.reduce( (a, b) => a + ( b.price * b.qty ) , 0);

        await cartModel.findByIdAndUpdate(cartObj.id, {$set: {totalAmount: totalAmount}});
        console.log("cartDetailsList " + cartDetailsList);
        // this.cart.push(Item);
        return cartDetailsList;
    }

    async findCartItems(userId) {
        let cartObj = await cartModel.findOne({userId: userId});
        if(!cartObj) {
            throw new Error("No Cart exists for User");
        }
        let cartDetailsList = await cartDetailsModel.find({cartId: cartObj.id});

        // Inter Service Communication
        return Promise.all(cartDetailsList.map( async (cartDetails) => {
            console.log("LAST 0");
            const productData = await ProductClient.getProductInfo(cartDetails.productId );
            const cartDetailsNew = {...(cartDetails.toObject())}; 
            console.log(productData);
            cartDetailsNew.productDetails = {
                name: productData.name
            };
            console.log("LAST 1");
            console.log(cartDetailsNew);
            return cartDetailsNew;
        }));
        // return cartDetailsList;
    }

    getItemFromCart() {
        // return this.cart;
    }

    
    async updateItemQty(userId, id, cartItem) {
        id = new ObjectId(id);
        let cartObj = await cartModel.findOne({userId: userId});
        if(!cartObj) {
            throw new Error("No Cart exists for User");
        }
        let cartDetailsObj = await cartDetailsModel.findById(id);
        if(!cartDetailsObj) {
            throw new Error("No Cart Item exists for Id");
        } 
        
        await cartDetailsModel.findByIdAndUpdate(id, {$set: {qty: cartItem.qty}});
        
        let cartDetailsList = await cartDetailsModel.find({cartId: cartObj.id});
        const totalAmount = cartDetailsList.reduce( (a, b) => a + ( b.price * b.qty ) , 0);


        await cartModel.findByIdAndUpdate(cartObj.id, {$set: {totalAmount: totalAmount}});
        console.log("cartDetailsList " + cartDetailsList);
        // this.cart.push(Item);
        return cartDetailsList;
        
    }

    async deleteItemFromCart(userId, id) {
        id = new ObjectId(id);
        let cartObj = await cartModel.findOne({userId: userId});
        if(!cartObj) {
            throw new Error("No Cart exists for User");
        }
        let cartDetailsObj = await cartDetailsModel.findById(id);
        if(!cartDetailsObj) {
            throw new Error("No Cart Item exists for Id");
        } 
        
        await cartDetailsModel.findByIdAndRemove(id);
        
        let cartDetailsList = await cartDetailsModel.find({cartId: cartObj.id});
        const totalAmount = cartDetailsList.reduce( (a, b) => a + ( b.price * b.qty ) , 0);

        
        await cartModel.findByIdAndUpdate(cartObj.id, {$set: {totalAmount: totalAmount}});
        console.log("cartDetailsList " + cartDetailsList);
        // this.cart.push(Item);
        return cartDetailsList;
        // return null;
    }

}

module.exports = new CartService;