import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
import { ShoppingCartService } from 'src/app/services/shoppingcart.service';
import { Item } from '../../../models/Item';
import { currencyHelper } from 'src/app/helpers/currencyDisplay';

@Component({
  selector: 'app-itemdetail',
  templateUrl: './itemDetail.component.html',
  styleUrls: ['./itemDetail.component.sass']
})

export class ItemDetailComponent implements OnInit {
  item: Item = {
    _id: "",
    name: "",
    description: "",
    price: 0,
    image: "",
    companyName: "",
    category: "",
    amountInStock: 0,
    numberBought: 0,
    saleAmount: 0,
    onSale: false,
  };
  amountLeft: number = 0;
  checkIfBuy = true;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private cartService: ShoppingCartService,
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

  checkAmountLeft(): number {
    return this.cartService.checkAmountLeftOnItem(this.item);
  }

  buy(): void {
    if (this.item){
      this.cartService.addToCart(this.item);
    }
  }

  prettyCurrency(numb: number) {
    return currencyHelper(numb);
  }
}
