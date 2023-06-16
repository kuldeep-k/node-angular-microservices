const axios = require('axios');

const productServiceHost = process.env.PRODUCT_API_URL || "http://localhost:3001";

class ProductClient {
    reduceProductQtyFromInventory(productId, qty ) {
        const data = {qty: qty};
        return axios.post(productServiceHost + '/products/'+ productId +'/reduce-qty', data)
        .then((res) => {
            console.log(`Status: ${res.status}`);
            console.log('Body: ', res.data);
            return res.data;
        }).catch((err) => {
            console.error(err);
            throw new Error(err);
        });
    }

    getProductInfo(productId ) {
        return axios.get(productServiceHost + '/products/'+ productId)
        .then((res) => {
            console.log(`Status: ${res.status}`);
            console.log('Body: ', res.data);
            return res.data;    
        }).catch((err) => {
            console.error(err);
            throw new Error(err);
        });     
    }
}

module.exports = new ProductClient;