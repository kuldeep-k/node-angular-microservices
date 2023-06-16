import { Component } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/interfaces/order.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent {
  orders: Order[] = [];
  actualColumns: string[] = ['_id', 'orderNo', 'totalAmount', 'orderDate', 'actions'];
  displayedColumns: string[] = ['_id', 'orderNo', 'totalAmount', 'orderDate', 'actions'];

  constructor(private orderService: OrderService, private router: Router) {
    this.loadOrdersList();
  }

  loadOrdersList() {
    this.orderService.getOrderList().subscribe((data) => {
      // this.carts = data;
      this.orders = data.map((order, k) => {
        // let a = structuredClone(cart);
        // let a: CartDetailsWithAmount = {...cart};
        // a.amount = Number(cart.price) * Number(cart.qty);
      
        return order;
      });
        
    }, error => {

    });
  }

  showOrderDetails(order: Order) {
    console.log(order);
    this.router.navigate(["/order-details", order._id]);
  }


}
