import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product, ProductRequest } from 'src/app/interfaces/products.interface';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, AfterViewInit {
  selectedProductId: String = "";
  // productImages: File[] = [];
  productImage: File =  {} as File;
  productImagePath: String = "";

  productForm = this.fb.group({
    productImage: ['', Validators.required],
    name: ['', Validators.required],
    brand: [''],
    currentPrice: [0, Validators.required],
    originalPrice: [0],
    stockQty: [0, Validators.required],
    attributes: this.fb.array([])
  })

  constructor(private router: Router, private route: ActivatedRoute, 
    private fb: FormBuilder, private productService: ProductsService, private toastrService: ToastrService) {

  }

  ngAfterViewInit(): void {
    this.addAttribute();
  }

  ngOnInit(): void {
    if(this.route.snapshot.params['id']) {
      this.selectedProductId = this.route.snapshot.params['id'];
      this.getProduct();
      
    }
    
  }

  // ngAfterViewInit(): void [

  // ]

  uploadImage(event: any) {
    const file:File = event.target.files[0];
    this.productImage = file;
    
    const formData = new FormData;
    formData.append('productImage', this.productImage)

    this.productService.uploadProductImage(this.selectedProductId, formData).subscribe((resp) => {
      this.toastrService.success("Product Image Uploaded Updated successfully");
      // this.router.navigate(['products']);
      this.ngOnInit();

    }, error => {
      console.log(error);
      if(error.error && error.error.error) {
        this.toastrService.error("Service Error", error.error.error);
      } else {
        this.toastrService.error("Some error from backend", error.message);
      }          
    });

  }

  get attributes() {
    return this.productForm.controls["attributes"] as FormArray;
  }

  addAttribute() {
    const attributeForm = this.fb.group({
        name: ['', Validators.required],
        value: ['', Validators.required]
    });
  
    this.attributes.push(attributeForm);
  }

  deleteAttribute(index: number) {
    this.attributes.removeAt(index);
  }

  getProduct() {
    this.productService.getProduct(this.selectedProductId).subscribe((productInfo: Product) => {
      productInfo.attributes.map((w) => {
        this.addAttribute();
      });

      this.productImagePath = "http://localhost:4200/assets/default.png";
      if(productInfo.productPictures.length) {
        console.log("imae ---------------------------");
        this.productImagePath = "http://localhost:3001/" + productInfo.productPictures[0].path;
        console.log(this.productImagePath) 
      }
      this.productForm.patchValue({
        name: productInfo.name,
        currentPrice: productInfo.currentPrice,
        stockQty: productInfo.stockQty,
        attributes: productInfo.attributes
      })
    }, error => {
      console.log(error);
      if(error.error && error.error.error) {
        this.toastrService.error("Service Error", error.error.error);
      } else {
        this.toastrService.error("Some error from backend", error.message);
      }
    });
  }

  saveProduct() {
    console.log(this.productForm.value);
    if(this.productForm.valid) {
      let dt: any = this.productForm.value;
      let data: ProductRequest = {} as ProductRequest; 
      data.name = dt.name; 
      data.currentPrice = dt.currentPrice;
      data.stockQty = dt.stockQty;
      data.attributes = dt.attributes;
      
      console.log("data ", data);
      if(this.selectedProductId) {
        this.productService.updateProduct(this.selectedProductId, data).subscribe((resp) => {
          this.toastrService.success("Product Updated successfully");
          this.router.navigate(['products']);
        }, error => {
          console.log(error);
          if(error.error && error.error.error) {
            this.toastrService.error("Service Error", error.error.error);
          } else {
            this.toastrService.error("Some error from backend", error.message);
          }          
        })      
      } else {
        this.productService.addProduct(data).subscribe((resp) => {
          this.toastrService.success("Product Added successfully");
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

}
