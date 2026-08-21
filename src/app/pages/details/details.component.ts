import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from '../../menu.service';
import { CartService } from '../../cart.service';

@Component({ selector: 'app-details', templateUrl: './details.component.html', styleUrls: ['./details.component.css'] })
export class DetailsComponent implements OnInit {
  item: any;
  constructor(private route: ActivatedRoute, private menuService: MenuService, private cartService: CartService) {}
  ngOnInit(): void { const id = Number(this.route.snapshot.paramMap.get('id')); this.menuService.getItem(id).subscribe(data => this.item = data); }
  addToCart(): void { this.cartService.add(this.item); alert(`${this.item.name} added to cart!`); }
}
