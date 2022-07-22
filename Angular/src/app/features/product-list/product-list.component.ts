import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[];
  currentCategoryId: number;
  constructor(
    private productServices: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }
  listProducts() {
    //

    const hasCategoryId: boolean = this.route.snapshot.params['id'];
   if(hasCategoryId)
   {
    this.currentCategoryId=+ this.route.snapshot.params['id'];
   }
   else{
    this.currentCategoryId=1;
   }

   this.productServices.getProductList(this.currentCategoryId).subscribe(
    data => {
      this.products = data;
      console.log(this.products);
    }
  )
  }
}
