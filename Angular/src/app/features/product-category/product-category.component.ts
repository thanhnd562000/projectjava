import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css'],
})
export class ProductCategoryComponent implements OnInit {
  productCategories: ProductCategory[];
  constructor(private productServices: ProductService) {}

  ngOnInit() {
    this.listProductCategories();
  }
  listProductCategories() {
 
    this.productServices.getProductCategories().subscribe(
      data => {
        //console.log('Product Categories=' + JSON.stringify(data));
        this.productCategories = data;
      }
    );
  }
}
