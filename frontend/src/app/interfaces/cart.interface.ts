interface CartProductDetails {
    name: string;
}
export interface CartDetails {
    _id?: String;
    productId: String;
    qty: Number;
    price: Number;
    productDetails?: CartProductDetails; 
}

export interface CartDetailsWithAmount {
    productId: String;
    qty: Number;
    price: Number;
    productDetails?: CartProductDetails;
    amount?: Number;
}