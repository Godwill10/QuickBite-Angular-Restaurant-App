import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../menu.service';
import { CartService } from '../../cart.service';

@Component({ selector: 'app-menu', templateUrl: './menu.component.html', styleUrls: ['./menu.component.css'] })
export class MenuComponent implements OnInit {
  items: any[] = [];
  quantities: { [key: number]: number } = {};

  constructor(private menuService: MenuService, private cartService: CartService) {}

  ngOnInit(): void {
    this.menuService.getMenu().subscribe(data => {
      this.items = data;
      this.items.forEach(item => this.quantities[item.id] = 1);
    });
  }

  addToCart(item: any): void {
    let qty = Number(this.quantities[item.id]) || 1;
    qty = Math.max(1, Math.min(10, qty));
    for (let i = 0; i < qty; i++) this.cartService.add(item);
    alert(`${qty} ${item.name} added to cart!`);
    this.quantities[item.id] = 1;
  }
}
