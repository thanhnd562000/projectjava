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

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.ListProducts();
    })
   
  }
  ListProducts() {
    //
    const hasCategoryId:boolean=this.route.snapshot.paramMap.has('id');
   if(hasCategoryId)
   {
    this.currentCategoryId=+this.route.snapshot.paramMap.has('id');
   }
   else{
    this.currentCategoryId=1;
   }

    this.productServices.getProductList(this.currentCategoryId).subscribe((res) => {
      this.products = res;
    });
  }
}
