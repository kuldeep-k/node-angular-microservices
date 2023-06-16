import { Component } from '@angular/core';
import { CartItem, Product } from '../../interfaces/products.interface';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shipping-list',
  templateUrl: './shipping-list.component.html',
  styleUrls: ['./shipping-list.component.css']
})
export class ShippingListComponent {
  qtySetBoxOpen: boolean = false;
  products: Product[] = [];
  carts: CartItem[] = [];
  selectedProduct: Product = {} as Product;
  selectedProductQty: number = 0;
  constructor(private productsService: ProductsService, private cartService: CartService, private toastr: ToastrService ) {
    this.products = [

    ];

    this.loadProducts();
  }
  loadProducts() {
    console.log("IN LOAD PRODUTS");
    // this.products = this.productsService.getProducts();
    this.productsService.getProducts().subscribe(data => {
      console.log("IN API REQEU SUCCESS ");
      data = data.map((row) => {
        row.primaryImage = "";
        if(row.productPictures && row.productPictures.length ) {
          row.primaryImage = "http://localhost:3001/" + row.productPictures[0].path;
        } else {
          row.primaryImage = "http://localhost:4200/assets/default.png";
        }
        return row;
      })
      this.products = data;
    }, error => {
      console.error(error);
    });    
  }

  openCartQtyBox(product: Product) {
    this.toastr.success('Success!', "SS");
    console.log("this.carts ", this.carts);
    console.log("product ", product);
    const temp = this.carts.filter(e => ( e.id == product._id ) );
    if(temp.length > 0) {
      alert("Item is already exists in cart");
    } else {
      this.selectedProduct = product;
      this.qtySetBoxOpen = true;
    }
  }

  // setQty(product: Product) {

  // }

  addToCart() {
    console.log("this.carts ", this.carts);
    console.log("selectedProduct ", this.selectedProduct);
    const temp = this.carts.filter(e => ( e.id == this.selectedProduct._id ) );
    if(temp.length > 0) {
      alert("Item is already exists in cart");
    } else {
      this.carts.push({
        id: this.selectedProduct.id,
        name: this.selectedProduct.name,
        price: this.selectedProduct.currentPrice,
        qty: this.selectedProductQty
      });

      this.cartService.addItemToCart({
        productId: this.selectedProduct._id,
        price: this.selectedProduct.currentPrice,
        qty: this.selectedProductQty
      }).subscribe(data => {
        console.log("Data added to cart " + data);
        this.toastr.error('Added to Cart!', "In Cart");
      }, err => {
        console.log("Failure in adding to cart ");
        console.log(err);
        this.toastr.error(err.error.error, 'Error!' );
      });

      console.log(this.carts);
      this.selectedProduct = {} as Product;
      this.qtySetBoxOpen = false;
    }
    
  }

}
