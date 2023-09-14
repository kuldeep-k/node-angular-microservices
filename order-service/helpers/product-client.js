const axios = require('axios');

const productServiceHost = process.env.PRODUCT_API_URL || "http://localhost:3001";
console.log("productServiceHost : " + productServiceHost);
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

    getProductInfoForMultiple(productIds ) {
        let url = productServiceHost + '/products?';
        let pharse = productIds.map(productId => "id=" + productId).join("&");
        console.log("In getProductInfoForMultiple", [url, pharse]);
        return axios.get(url + pharse)
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