import { Component, Inject } from '@angular/core';
import { Product } from '../interfaces/products.interface';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[] = []; 
  actualColumns: string[] = ['_id', 'name', 'currentPrice', 'qty', 'actions'];
  displayedColumns: string[] = ['_id', 'name', 'currentPrice', 'qty', 'actions'];

  constructor(private productsService: ProductsService, private router: Router, private toastrService: ToastrService ) {
    this.products = [];

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

  openAddPage() {
    this.router.navigate(['products/add']);
  }

  openEditPage(product: Product) {
    console.log(product);
    this.router.navigate(['products/edit', product._id ] );
  }

  deleteProduct(product: Product) {
    if(confirm("If you really want to delete this product ?")) {
      this.productsService.deleteProduct(product._id).subscribe((resp) => {
        this.toastrService.success("Product Deleted successfully");
        this.router.navigate(['products']);
      }, error => {
        console.log(error);
        if(error.error && error.error.error) {
          this.toastrService.error("Service Error", error.error.error);
        } else {
          this.toastrService.error("Some error from backend", error.message);
        }          
      })
    }
  }
}
