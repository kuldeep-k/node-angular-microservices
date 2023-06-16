import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartDetails } from '../interfaces/cart.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartUrl: string = environment.CART_API_HOST;

  constructor(private httpClient: HttpClient,) { }

  public getCartList(): Observable<CartDetails[]> {
    return this.httpClient.get<CartDetails[]>(this.cartUrl);
  }

  public addItemToCart(cart: CartDetails): Observable<CartDetails[]> {
    console.log("Item before POST ", cart);
    
    return this.httpClient.post<CartDetails[]>(this.cartUrl, cart);
  }

  public removeItemFromCart(cartId?: String): Observable<CartDetails[]> {
    console.log("Item before DELETE ", cartId);
    
    return this.httpClient.delete<CartDetails[]>(this.cartUrl + "/" + cartId);
  }

  
}
