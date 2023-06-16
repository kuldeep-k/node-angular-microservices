import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order, OrderDetails } from '../interfaces/order.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderUrl: string = environment.ORDER_API_HOST;

  constructor(private httpClient: HttpClient,) { }

  public getOrderList(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.orderUrl);
  }

  public createOrder(): Observable<Order> {
    console.log("Item before POST ");
    
    return this.httpClient.post<Order>(this.orderUrl, {});
  }

  public getOrderDetailsList(id: String): Observable<OrderDetails[]> {
    return this.httpClient.get<OrderDetails[]>(this.orderUrl + '/' + id + "/details");
  }
  
}
