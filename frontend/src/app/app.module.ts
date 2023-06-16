import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ToastrModule } from 'ngx-toastr';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { HomeComponent } from './home/home.component';
import { ShippingListComponent } from './home/shipping-list/shipping-list.component';
import { CartListComponent } from './home/cart-list/cart-list.component';
import { OrderListComponent } from './home/order-list/order-list.component';
import { OrderDetailsListComponent } from './home/order-details-list/order-details-list.component';
import { SignupComponent } from './auth/signup/signup.component'; 
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthGuardService } from './guard/auth-guard.service';
import { SignoutComponent } from './auth/signout/signout.component';
import { JwtInterceptor } from './guard/jwt.interceptor';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { BreadcrumbComponent } from './common/breadcrumb/breadcrumb.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { LeftbarComponent } from './common/leftbar/leftbar.component';
import {MatMenuModule} from '@angular/material/menu';
import { ProfileComponent } from './auth/profile/profile.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    HomeComponent,
    ShippingListComponent,
    CartListComponent,
    OrderListComponent,
    OrderDetailsListComponent,
    SignupComponent,
    SigninComponent,
    SignoutComponent,
    ProductFormComponent,
    BreadcrumbComponent,
    HeaderComponent,
    FooterComponent,
    LeftbarComponent,
    ProfileComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // NoopAnimationsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatListModule,
    MatChipsModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSkeletonLoaderModule,
    MatMenuModule,
    MatToolbarModule, MatButtonModule, MatIconModule, 
    MatInputModule,
    MatFormFieldModule,
    ToastrModule.forRoot(),
    MatTableModule,
    MatGridListModule,
    MatSidenavModule,
    MatCardModule
  ],
  providers: [AuthGuardService, {provide: HTTP_INTERCEPTORS , useClass: JwtInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
