import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
import { ShoppingCartService } from 'src/app/services/shoppingcart.service';
import { Item } from '../../../models/Item';

@Component({
  selector: 'app-itemdetail',
  templateUrl: './itemDetail.component.html',
  styleUrls: ['./itemDetail.component.sass']
})

export class ItemDetailComponent implements OnInit {
  item?: Item;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private cartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: routeParams => {
        this.itemService.getItemById(routeParams.id)
          .subscribe((data: any) => {
            this.item = data.item as Item;
          });
      },
      error: error => console.log(error)
    });
  }

  buy(): void {
    if (this.item != null){
      this.cartService.addToCart(this.item);
    }
  }
}
