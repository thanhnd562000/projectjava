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
  currentCategoryId: number=1;
  searchMode:boolean;
  previousCategoryId:number=1;

  thePageNumber: number = 1;
  thePageSize: number = 8;
  theTotalElements: number = 0;
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

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }

  }

  handleSearchProducts() {

    const theKeyword : string = this.route.snapshot.paramMap.get('keyword')!;

    // now search for the products using keyword
    this.productServices.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data;
      }
    )
  }

  handleListProducts() {
    //

    const hasCategoryId: boolean = this.route.snapshot.params['id'];
   if(hasCategoryId)
   {
    this.currentCategoryId=+ this.route.snapshot.params['id'];
   }
   else{
    this.currentCategoryId=1;
   }
//
if(this.previousCategoryId!=this.currentCategoryId)
{
  this.thePageNumber=1;
}
this.previousCategoryId=this.currentCategoryId
console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);

// now get the products for the given category id
this.productServices.getProductListPaginate(this.thePageNumber - 1,
                                           this.thePageSize,
                                           this.currentCategoryId)
                                           .subscribe(this.processResult());
  }
  processResult() {
    return (data:any) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }
  // updatePageSize(pageSize: number) {
  //   this.thePageSize = pageSize;
  //   this.thePageNumber = 1;
  //   this.listProducts();
  // }
}
