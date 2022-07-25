import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/common/cart.model';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {
cartItems:Cart[]=[];
totalPrice:number=0;
totalQuantity:number=0;
  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }
  listCartDetails() {
    this.cartItems=this.cartService.cartItems;
    this.cartService.totalPrice.subscribe(
      data=>this.totalPrice=data
    )
    this.cartService.totalQuantity.subscribe(
      data=>this.totalQuantity=data
    )
    this.cartService.computeCartTotals();
   }
   incrementQuantity(item:Cart)
   {
this.cartService.addToCart(item)
   }
   decrementQuantity(item:Cart)
   {
this.cartService.decrementQuantity(item)
   }
   remove(item:Cart)
   {
    this.cartService.remove(item);
   }
}
