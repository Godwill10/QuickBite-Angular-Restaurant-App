import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CartService } from '../../cart.service';

@Component({ selector: 'app-checkout', templateUrl: './checkout.component.html', styleUrls: ['./checkout.component.css'] })
export class CheckoutComponent {
  name = '';
  email = '';
  constructor(private http: HttpClient, public cartService: CartService, private router: Router) {}

  submitOrder(): void {
    if (!this.name.trim() || !this.email.trim()) { alert('Please enter your name and email.'); return; }
    if (this.cartService.cart.length === 0) { alert('Your cart is empty.'); return; }
    const order = { customer: this.name, email: this.email, items: this.cartService.getCart(), total: this.cartService.getTotal() };
    this.http.post('http://localhost:3000/api/order', order).subscribe({
      next: () => { alert('Order placed successfully!'); this.cartService.clear(); this.router.navigate(['/']); },
      error: err => { alert('Error placing order. Make sure the API server is running.'); console.error(err); }
    });
  }
}
