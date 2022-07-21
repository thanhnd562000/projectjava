import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[];
  constructor(private productServices: ProductService) {}

  ngOnInit(): void {
   this.ListProducts();
  }
  ListProducts()
  {
    this.productServices.getProductList().subscribe((res) => {
      this.products = res;
    });
  }
}
