var express = require('express');
var router = express.Router();
var { expressjwt: jwt } = require("express-jwt");

var OrderService = require('../services/order-service');
var PaymentService = require('../services/payment-service');

/* GET users listing. */
const secret = process.env.TOKEN_SECRET || "ABCDEFGH";
const algo = process.env.TOKEN_ALGO ?  [process.env.TOKEN_ALGO] : ["HS256"];

router.post('/', jwt({ secret: secret, algorithms: algo }), async (req, res, next) => {
    try {
        const body = req.body;
        const orderDetails = await OrderService.addOrder(req.auth.id, req.body);
        return res.status(200).json(orderDetails);
    } catch (error) {
        next(error)
    }
});

router.get('/', jwt({ secret: secret, algorithms: algo }), async (req, res, next) => {
    try {
        const orders = await OrderService.getOrders(req.auth.id);
        return res.status(200).json(orders);
    } catch (error) {
        next(error)
    }
});

router.get('/:id', jwt({ secret: secret, algorithms: algo }), async (req, res, next) => {
    try {
        const orders = await OrderService.getOrder(req.auth.id, req.params.id);
        return res.status(200).json(orders);
    } catch (error) {
        next(error)
    }
});

router.get('/:id/details', jwt({ secret: secret, algorithms: algo }), async (req, res, next) => {
    try {
        const orders = await OrderService.getOrderDetails(req.auth.id, req.params.id);
        return res.status(200).json(orders);
    } catch (error) {
        next(error)
    }
});

router.patch('/:id/payment', jwt({ secret: secret, algorithms: algo }), async (req, res, next) => {
    try {
        const orders = await PaymentService.doPayment(req.auth.id, req.params.id);
        return res.status(200).json(orders);
    } catch (error) {
        next(error)
    }
});

module.exports = router;
