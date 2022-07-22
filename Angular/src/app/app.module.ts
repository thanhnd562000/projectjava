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

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    FooterComponent,
    ProductCategoryComponent,
    SearchComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
  
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
