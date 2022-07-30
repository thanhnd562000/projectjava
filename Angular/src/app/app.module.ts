import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './features/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './core/services/product.service';
import { FooterComponent } from './features/footer/footer.component';
import { ProductCategoryComponent } from './features/product-category/product-category.component';
import { SearchComponent } from './features/search/search.component';
import { ProductDetailComponent } from './features/product-detail/product-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './features/cart-status/cart-status.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartDetailsComponent } from './features/cart-details/cart-details.component';
import { CheckOutComponent } from './features/check-out/check-out.component';
import { LoginComponent } from './features/login/login.component';
import { LoginStatusComponent } from './features/login-status/login-status.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    FooterComponent,
    ProductCategoryComponent,
    SearchComponent,
    ProductDetailComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckOutComponent,
    LoginComponent,
    LoginStatusComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
      progressBar: true,
    }),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ProductService],
  bootstrap: [AppComponent],
})
export class AppModule {}
