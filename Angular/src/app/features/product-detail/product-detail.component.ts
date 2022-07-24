import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/common/cart.model';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product:Product =new Product();
  constructor(private productService:ProductService,
              private route:ActivatedRoute,
              private cartService:CartService,
              private toastrService:ToastrService
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.handleProductDetails();
    })
  }
  handleProductDetails() {
   //get id
   const theProductId:number= + this.route.snapshot.paramMap.get("id")!;
   this.productService.getProduc(theProductId).subscribe(
    data=>{
      this.product=data;
    }
   )
  }
  addToCart()
  {
const theCartItem=new Cart(this.product);
this.cartService.addToCart(theCartItem);
this.toastrService.success("Thêm vào giỏ hàng thành công!!!")
  }
}
