import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderDetails, OrderDetailsObject } from 'src/app/interfaces/order.interface';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-details-list',
  templateUrl: './order-details-list.component.html',
  styleUrls: ['./order-details-list.component.css']
})
export class OrderDetailsListComponent {
  orderId: String = "";
  orderDetails: OrderDetailsObject[] = []; 
  actualColumns: string[] = ['_id', 'productImageUrl', 'productName',  'qty', 'price'];
  displayedColumns: string[] = ['productImageUrl', 'productName',  'qty', 'price'];

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
        let ot: any = order;
        ot.productName = order.product.name;
        ot.productImageUrl = order.product.productImageUrl ? order.product.productImageUrl : "";
        return ot;
      });
        
    }, error => {

    });
  }

}
