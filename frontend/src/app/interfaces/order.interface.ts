export interface Order {
    _id: String;
    userId: String;
    orderNo: String;
    totalAmount: Number;
    status: String;
    paid: Boolean;
    shipped: Boolean;
    orderDate: Date
    paidDate: Date 
    shipDate: Date
}

export interface Product {
    _id: String;
    name: String;    
}

export interface OrderDetails {
    orderId: String;
    productId: String;
    product: Product;
    qty: Number;
    price: Number;
}

export interface OrderDetailsObject {
    orderId: String;
    productId: String;
    productName: String;
    qty: Number;
    price: Number;
}