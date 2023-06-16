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


export interface OrderDetails {
    orderId: String;
    productId: String;
    qty: Number;
    price: Number;
}