import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderDetails } from 'src/app/interfaces/order.interface';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-details-list',
  templateUrl: './order-details-list.component.html',
  styleUrls: ['./order-details-list.component.css']
})
export class OrderDetailsListComponent {
  orderId: String = "";
  orderDetails: OrderDetails[] = [];
  actualColumns: string[] = ['_id', 'productId', 'qty', 'price'];
  displayedColumns: string[] = ['_id', 'productId', 'qty', 'price'];

  constructor(private route: ActivatedRoute, private orderService: OrderService) {
    this.orderId = this.route.snapshot.params['id'];

    this.loadOrdersList(this.orderId);
  }

  loadOrdersList(orderId: String) {
    this.orderService.getOrderDetailsList(orderId).subscribe((data) => {
      // this.carts = data;
      this.orderDetails = data.map((order, k) => {
        // let a = structuredClone(cart);
        // let a: CartDetailsWithAmount = {...cart};
        // a.amount = Number(cart.price) * Number(cart.qty);
      
        return order;
      });
        
    }, error => {

    });
  }

}
