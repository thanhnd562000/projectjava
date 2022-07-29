import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/common/cart.model';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[];
  currentCategoryId: number = 1;
  searchMode: boolean;
  previousCategoryId: number = 1;
  previousKeyword?: string ;
  thePageNumber: number = 1;
  thePageSize: number = 8;
  theTotalElements: number = 0;
  constructor(
    private productServices: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private toatstr :ToastrService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }
  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;
    if (this.previousKeyword != theKeyword) {
      this.thePageNumber = 1;
    }
    this.previousKeyword = theKeyword;
    // console.log(
    //   `previousKeyword=${this.previousKeyword}, thePageNumber=${this.thePageNumber}`
    // );
    this.productServices
      .searchProductsPaginate(
        this.thePageNumber - 1,
        this.thePageSize,
        theKeyword
      )
      .subscribe(
        this.processResult()
      );
    
    this.productServices.searchProducts(theKeyword).subscribe((data) => {
      this.products = data;
    });
  }

  handleListProducts() {
    //

    const hasCategoryId: boolean = this.route.snapshot.params['id'];
    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.params['id'];
    } else {
      this.currentCategoryId = 1;
    }
    //
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;
    // console.log(
    //   `currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`
    // );

    // now get the products for the given category id
    this.productServices
      .getProductListPaginate(
        this.thePageNumber - 1,
        this.thePageSize,
        this.currentCategoryId
      )
      .subscribe(this.processResult());
  }
  processResult() {
    return (data: any) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
      console.log(data);
    };
  }

  updatePageSize(pageSize: any) {
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }
  addToCart(theProduct: Product) {
    //console.log(`Add to cart:${theProduct.name}`);
    const theCartItem = new Cart(theProduct);

    this.cartService.addToCart(theCartItem);
    this.toatstr.success("Thêm sản phẩm thành công");
  }
}
