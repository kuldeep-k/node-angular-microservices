import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { ToastrService } from 'ngx-toastr';

import { CartDetails, CartDetailsWithAmount } from '../../interfaces/cart.interface';
import { Order } from '../../interfaces/order.interface';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent {
  carts: CartDetailsWithAmount[] = []
  totalAmount: number = 0;
  grandAmount: number = 0;
  tax: number = 0;
  constructor(private toastrService: ToastrService, private cartService: CartService, private orderService: OrderService) {
    this.loadCartList();
  }

  loadCartList() {
    this.cartService.getCartList().subscribe((data) => {
      // this.carts = data;
      this.carts = data.map((cart, k) => {
        // let a = structuredClone(cart);
        let a: CartDetailsWithAmount = {...cart};
        a.amount = Number(cart.price) * Number(cart.qty);
      
        return cart;
      });
        
      this.totalAmount = this.carts.reduce( (a, b) => {
        return a + ( Number(b.price) * Number(b.qty) )
      } , 0);
      this.tax = this.totalAmount * 5 / 100;
      this.grandAmount = this.totalAmount + this.tax;
    }, error => {

    });
  }

  deleteCartItem(cart: CartDetails) {
  
    this.cartService.removeItemFromCart(cart._id).subscribe((data) => {
      // this.carts = data;
      this.carts = data.map((cart, k) => {
        // let a = structuredClone(cart);
        let a: CartDetailsWithAmount = {...cart};
        a.amount = Number(cart.price) * Number(cart.qty);
      
        return cart;
      });
        
      this.totalAmount = this.carts.reduce( (a, b) => {
        return a + ( Number(b.price) * Number(b.qty) )
      } , 0);
      this.tax = this.totalAmount * 5 / 100;
      this.grandAmount = this.totalAmount + this.tax;
    }, error => {

    });
  }

  createOrder() {
    this.orderService.createOrder().subscribe((data) => {
      this.toastrService.success("Order Created Successfully", "Order Created");
    }, error => {
      this.toastrService.error("Order Creation Failed", "Order Failed");
    })
  }
}
