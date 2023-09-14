var express = require('express');
var router = express.Router();
var { expressjwt: jwt } = require("express-jwt");

var ProductService = require('../services/product-service');

const secret = process.env.TOKEN_SECRET || "ABCDEFGH";
const algo = process.env.TOKEN_ALGO ?  [process.env.TOKEN_ALGO] : ["HS256"];

router.get('/', async (req, res) => {
    const products = await ProductService.getProducts(req.query);
    // setTimeout(() => {
        return res.status(200).json(products);
    // }, 3000)
    
});

router.post('/', jwt({ secret: secret, algorithms: algo }), async (req, res) => {
    try {
        console.log("req.body " + req.body);
        const newproduct = await ProductService.addProduct(req.body);
        return res.status(201).json(newproduct);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await ProductService.getProduct(req.params.id);
        return res.status(200).json(product);
    } catch (error) {
        next(error);
    }
});

router.patch('/:id', jwt({ secret: secret, algorithms: algo }), async (req, res) => {
    try {
        const product = await ProductService.updateProduct(req.params.id, req.body);
        return res.status(200).json(product);
    } catch (error) {
        next(error);
    }
});
router.patch('/:id/upload-image', jwt({ secret: secret, algorithms: algo }), async (req, res) => {
    try {
        const product = await ProductService.uploadImage(req.params.id, req.body, req.files);
        return res.status(200).json(product);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', jwt({ secret: secret, algorithms: algo }), async (req, res) => {
    try {
        await ProductService.deleteProduct(req.params.id);
        return res.status(204).send();
    } catch (error) {
        next(error);
    }
});

router.patch('/:id/reduce-qty', jwt({ secret: secret, algorithms: algo }), async (req, res) => {
    try {
        const product = await ProductService.reduceQtyFromProduct(req.params.id, req.body);
        return res.status(200).json(product);
    } catch (error) {
        next(error);
    }
});

router.patch('/:id/add-qty', jwt({ secret: secret, algorithms: algo }), async (req, res) => {
    try {
        const product = await ProductService.addQtyToProduct(req.params.id, req.body);
        return res.status(200).json(product);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
