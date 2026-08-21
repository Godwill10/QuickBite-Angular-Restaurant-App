import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CartService {
  cart: any[] = [];

  add(item: any): void {
    const existing = this.cart.find(x => x.id === item.id);
    if (existing) existing.quantity += 1;
    else this.cart.push({ ...item, quantity: 1 });
  }

  remove(id: number): void { this.cart = this.cart.filter(x => x.id !== id); }
  getCart(): any[] { return this.cart; }
  clear(): void { this.cart = []; }
  getTotal(): number { return this.cart.reduce((total, item) => total + item.price * item.quantity, 0); }
}
