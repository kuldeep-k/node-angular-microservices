import { Injectable } from '@angular/core';
import { Product, ProductRequest } from '../interfaces/products.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productsUrl: string = environment.PRODUCT_API_HOST;

  constructor(private httpClient: HttpClient,) { }

  public getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.productsUrl);
  }

  public addProduct(product: ProductRequest): Observable<Product> {
    return this.httpClient.post<Product>(this.productsUrl, product);
  }

  public updateProduct(id: String, product: ProductRequest): Observable<Product> {
    return this.httpClient.patch<Product>(this.productsUrl + "/" + id, product);
  }

  public deleteProduct(id: String): Observable<void> {
    return this.httpClient.delete<void>(this.productsUrl + "/" + id);
  }

  public getProduct(id: String): Observable<Product> {
    return this.httpClient.get<Product>(this.productsUrl + "/" + id);
  }

  public uploadProductImage(id: String, data: FormData): Observable<Product> {
    return this.httpClient.patch<Product>(this.productsUrl + "/" + id + "/upload-image", data);
  }
  
}
