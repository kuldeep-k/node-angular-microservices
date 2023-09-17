import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatDialogModule} from '@angular/material/dialog';

@Component({
    selector: 'cart-quantity-dialog',
    templateUrl: 'cart-quantity-dialog.component.html',
    standalone: true,
    imports: [MatDialogModule, FormsModule]
})
export class CartQuantityDialogComponent {
    selectedProductQty = 0;
    constructor(public dialogRef: MatDialogRef<CartQuantityDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,) {}

    // addToCart() {
    //     alert(this.selectedProductQty)
    //     this.data.qty = this.selectedProductQty;
    //     this.dialogRef.close();
    // }    

    closeMe() {
        this.dialogRef.close();
    }

}