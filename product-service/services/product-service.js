const mongoose = require("mongoose");

const productModel = require("../models/Product");
const fs = require("fs");

class ProductService {
    // products = [
    //     {id: 1, name: "Sample Product 1", price: 100, color: "Red"},
    //     {id: 2, name: "Sample Product 2", price: 85, color: "Black"},
    //     {id: 3, name: "Sample Product 3", price: 140, color: "Red"},
    //     {id: 4, name: "Sample Product 4", price: 50, color: "Brown"},
    //     {id: 5, name: "Sample Product 5", price: 198, color: "White"},
    // ];
    async addProduct(product) {
        console.log("product " + product);
        // this.products.push(product);
        const productCreated = await productModel.create(product);
        return productCreated;
    }

    async getProducts(reqQuery) {
        console.log("reqQuery ", reqQuery);
        let ids = [];
        let products = [];
        if(reqQuery && reqQuery.id) {
            if(Array.isArray(reqQuery.id)) {
                ids = reqQuery.id.map(id => new mongoose.Types.ObjectId(id));        
            } else {
                ids = [new mongoose.Types.ObjectId(reqQuery.id)];
            }
            products = await productModel.find({_id: {$in: ids}});

            
        } else {
            products = await productModel.find();
        }

        products = products.map((product) => {
            product = product.toObject();
            product.productImageUrl = this.getDefaultImagePath(product.productPictures);
            return product
        });
        return products;
        
    }

    async getProduct(id) {
        let product = await productModel.findById(id);
        if(!product) {
            throw new Error("Invalid product id");
        }
        product = product.toObject();
        product.productImageUrl = this.getDefaultImagePath(product.productPictures);
        return product;
        // const selectedProduct = this.products.filter(product => product.id == id);
        // if(Array.isArray(selectedProduct) && selectedProduct.length > 0) {
        //     return selectedProduct[0];
        // }
        // return null;
    }

    async updateProduct(id, productToSave) {
        const product = await productModel.findById(id);
        if(!product) {
            throw new Error("Invalid product id");
        }
        await productModel.findByIdAndUpdate(id, productToSave);
        return await productModel.findById(id);
        // const selectedProduct = this.products.filter(product => product.id == id);
        // if(Array.isArray(selectedProduct) && selectedProduct.length > 0) {
        //     this.products = this.products.map( (product, key ) => { 
        //         if(product.id == id) {
        //             product = productToSave;        
        //         }
        //         return product;
        //     });
        //     return productToSave;
        // }
        // return null;
    }

    async deleteProduct(id) {
        // return this.products.filter( ( product, key ) => product.id != id);
        const product = await productModel.findById(id);
        if(!product) {
            throw new Error("Invalid product id");
        }
        await productModel.findByIdAndRemove(id);
        return ;
        // return null;
    }

    async reduceQtyFromProduct(id, data) {
        const product = await productModel.findById(id);
        if(!product) {
            throw new Error("Invalid product id");
        }
        if(product.stockQty < data.qty) {
            throw new Error("Insufficient qty");
        }
        await productModel.findByIdAndUpdate(id, {
            $inc: {
                stockQty: -(data.qty) 
            }
        });
        return await productModel.findById(id);
    }

    async addQtyToProduct(id, data) {
        const product = await productModel.findById(id);
        if(!product) {
            throw new Error("Invalid product id");
        }

        await productModel.findByIdAndUpdate(id, {
            $inc: {
                stockQty: (data.qty) 
            }
        });
        return await productModel.findById(id);
 
 
    }

    async uploadImage(id, productToSave, filesToSave) {
        console.log("------------------ UPLOAD IMAGE");
        const product = await productModel.findById(id);
        if(!product) {
            throw new Error("Invalid product id");
        }
        console.log(id);
        console.log(productToSave);
        console.log(filesToSave);
        const dirPath = "public/uploads";
        if(filesToSave && filesToSave.productImage) {
            console.log("In 1");
            if(!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath);
            }
            console.log("In 2");
            let fileNameToSave = +(new Date) + "-" + filesToSave.productImage.name;
            await filesToSave.productImage.mv(dirPath + "/" + fileNameToSave);
            console.log("In 3");
            let fileObj = {
                name: filesToSave.productImage.name,
                size: filesToSave.productImage.size,
                path: "uploads/" + fileNameToSave,
                mime: filesToSave.productImage.mimetype,
                default: true
            } 
            console.log("In 4 ");
            console.log(fileObj);
            
            let saveData = { productPictures: [fileObj] };
            console.log("In 5 ");
            console.log(saveData);
            product.productPictures = [fileObj];
            await product.save();
            // await productModel.findByIdAndUpdate(id, { Sset: saveData });
            // fs.copyFileSync()
        }
        
        return await productModel.findById(id);
        // const selectedProduct = this.products.filter(product => product.id == id);
        // if(Array.isArray(selectedProduct) && selectedProduct.length > 0) {
        //     this.products = this.products.map( (product, key ) => { 
        //         if(product.id == id) {
        //             product = productToSave;        
        //         }
        //         return product;
        //     });
        //     return productToSave;
        // }
        // return null;
    }

    getDefaultImagePath(productImages) {
        const productImageHost = process.env.PRODUCT_IMAGE_HOST || "http://localhost:3001/"; 
        let defaultProductImagePath = "";
        productImages.forEach(productImage => {
            if(productImage.default == true) {
                defaultProductImagePath = productImageHost + "/" + productImage.path;        
            }
        });
        return defaultProductImagePath;
    }

}

module.exports = new ProductService;