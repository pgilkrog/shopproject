import { trigger, transition, query, style, stagger, animate, keyframes } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/models/Item';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-itemlist',
  templateUrl: './itemList.component.html',
  styleUrls: ['./itemList.component.sass'],
  animations: [
    trigger('aliasesAnimation', [
      transition('* <=> *', [
        query(':enter', style({opacity: 0}), {optional: true}),
        query(':enter', stagger('50ms', [
          animate('450ms ease-in', keyframes([
            style({opacity: 0, transform: 'translateX(-20%)', offset: 0}),
            style({opacity: 0.5, transform: 'translateX(5%)', offset: 0.3}),
            style({opacity: 1, transform: 'translateX(0)', offset: 1.0})
          ]))
        ]), {optional: true}),
        query(':leave', stagger('50ms', [
          animate('450ms ease-in', keyframes([
            style({opacity: 1, transform: 'translateX(0)', offset: 0}),
            style({opacity: 0.5, transform: 'translateX(5%)', offset: 0.3}),
            style({opacity: 0, transform: 'translateX(-20%)', offset: 1.0})
          ]))
        ]), {optional: true})
      ])
    ])
  ]
})

export class ItemListComponent implements OnInit, OnDestroy {
  items: Item[] = [];
  itemsNew: Item[] = [];
  name = '';
  private ItemSub: Subscription = new Subscription();

  showSpinner = true;
  numb = 10;

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.ItemSub = this.itemService.getItemsListener()
      .subscribe((itemsData: { items: Item[] }) => {
        this.items = itemsData.items;
        this.itemsNew = itemsData.items.slice(0, this.numb);
      });

    this.getItems();
  }

  ngOnDestroy(): void {
    this.ItemSub.unsubscribe();
  }

  onScroll(): void {
    this.showSpinner = true;
    this.numb += 5;
    this.getItems();
  }

  getItems(): void {
    this.itemsNew = this.items.slice(0, this.numb);
    this.showSpinner = false;
  }
}
