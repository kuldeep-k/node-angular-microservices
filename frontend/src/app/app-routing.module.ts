import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { ShippingListComponent } from './home/shipping-list/shipping-list.component';
import { CartListComponent } from './home/cart-list/cart-list.component';
import { OrderListComponent } from './home/order-list/order-list.component';
import { OrderDetailsListComponent } from './home/order-details-list/order-details-list.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthGuard } from './guard/auth.guard';
import { SignoutComponent } from './auth/signout/signout.component';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';

const routes: Routes = [
  {path: '', redirectTo: '/shopping-list', pathMatch: 'full'},
  {path: '', component: HomeComponent,
  children: [
    { path: 'shopping-list', component: ShippingListComponent },
    { path: 'cart-list', component: CartListComponent, canActivate: [AuthGuard] },
    { path: 'order-list', component: OrderListComponent, canActivate: [AuthGuard] },
    { path: 'order-details/:id', component: OrderDetailsListComponent, canActivate: [AuthGuard] },
    { path: 'products', component: ProductsComponent, canActivate: [AuthGuard], data: {
      role: "ADMIN"
    } },
    { path: 'products/add', component: ProductFormComponent, canActivate: [AuthGuard], data: {
      role: "ADMIN"
    }  }, 
    { path: 'products/edit/:id', component: ProductFormComponent, canActivate: [AuthGuard], data: {
      role: "ADMIN"
    }  } ,
    
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] } ,
    { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard] } ,
  ] 
  },
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'signout', component: SignoutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
