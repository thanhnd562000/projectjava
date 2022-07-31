import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subject } from 'rxjs';
import { Cart } from 'src/app/common/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: Cart[] = [];
  storage: Storage = sessionStorage;
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0.00);
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {
    let data = JSON.parse(this.storage.getItem('cartItem')!);
    if (data != null) {
      this.cartItems = data;
      this.computeCartTotals();
    }
  }
  persistCartItem()
  {
    this.storage.setItem('cartItem',JSON.stringify(this.cartItems));
  }
  addToCart(theCartItem: Cart) {
    let alreadyExistsInCart: boolean = false;
    let existingCartItem!: Cart | undefined;
    if (this.cartItems.length > 0) {
      // for (let tempCartItem of this.cartItems) {
      //   if (tempCartItem.id === theCartItem.id) {
      //     existingCartItem = tempCartItem;
      //     break;
      //   }
      // }
      existingCartItem = this.cartItems.find(
        (tempCartItem) => tempCartItem.id === theCartItem.id
      );

      alreadyExistsInCart = existingCartItem != undefined;
    }

    if (alreadyExistsInCart) {
      existingCartItem!.quantity++;
    } else {
      this.cartItems.push(theCartItem);
    }

    this.computeCartTotals();
  }
  
  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    //
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalPriceValue, totalQuantityValue);
    this.persistCartItem();
  }
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contents of the cart');
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(
        `name: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, unitPrice=${tempCartItem.unitPrice}, subTotalPrice=${subTotalPrice}`
      );
    }

    console.log(
      `totalPrice: ${totalPriceValue.toFixed(
        2
      )}, totalQuantity: ${totalQuantityValue}`
    );
    console.log('----');
  }
  decrementQuantity(theCartItem: Cart) {
    theCartItem.quantity--;

    if (theCartItem.quantity < 1) {
      theCartItem.quantity = 1;
      this.toastr.warning('Số lượng phải lớn hơn hoặc bằng 1');
    } else {
      this.computeCartTotals();
    }
  }

  remove(theCartItem: Cart) {
    const itemIndex = this.cartItems.findIndex(
      (tempCartItem) => tempCartItem.id === theCartItem.id
    );

    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);

      this.computeCartTotals();
    }
  }

}
