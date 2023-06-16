var express = require('express');
var { expressjwt: jwt } = require("express-jwt");
var router = express.Router();
var CartService = require('../services/cart-service');
/* GET users listing. */

const secret = process.env.TOKEN_SECRET || "ABCDEFGH";
const algo = process.env.TOKEN_ALGO ?  [process.env.TOKEN_ALGO] : ["HS256"];

router.post('/', jwt({ secret: secret, algorithms: algo }), async (req, res, next) => {
    try {
        const body = req.body;
        const cartDetails = await CartService.addItemIntoCart(req.auth.id, req.body);
        return res.status(200).json(cartDetails);
    } catch (error) {
        next(error);
    }
    
});

router.patch('/:id', jwt({ secret: secret, algorithms: algo }), async (req, res, next) => {
    try {
        console.log("req.body " + req.body);
        const body = req.body;
        const cartDetails = await CartService.updateItemQty(req.auth.id, req.params.id, req.body);
        return res.status(200).json(cartDetails);
    } catch (error) {
        next(error);
    }
    
});

router.get('/', jwt({ secret: secret, algorithms: algo }), async (req, res, next) => {
    try {
        const cartDetails = await CartService.findCartItems(req.auth.id);
        return res.status(200).json(cartDetails);
    } catch (error) {
        next(error);
    }
    
});

router.delete('/:id', jwt({ secret: secret, algorithms: algo }), async (req, res, next) => {
    try {
        const cartDetails = await CartService.deleteItemFromCart(req.auth.id, req.params.id);
        return res.status(200).json(cartDetails);
    } catch (error) {
        next(error);
    }
    
});


module.exports = router;
