import { Component } from '@angular/core';
import { CartService } from '../../cart.service';
@Component({ selector:'app-cart', templateUrl:'./cart.component.html', styleUrls:['./cart.component.css'] })
export class CartComponent {
  constructor(public cartService:CartService) {}
  remove(id:number):void { this.cartService.remove(id); }
  getTotal():number { return this.cartService.getTotal(); }
}
