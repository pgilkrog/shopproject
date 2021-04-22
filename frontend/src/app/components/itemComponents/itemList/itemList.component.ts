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
  private ItemSub: Subscription = new Subscription();
  items: Item[] = [];
  itemsNew: Item[] = [];
  searchName = '';
  showSpinner = true;
  displayNumb = 10;

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.ItemSub = this.itemService.getItemsListener().subscribe({
        next: (itemsData: { items: Item[] }) => {
          // putt all items into items
          this.items = itemsData.items;
          // slice itemsNew array, so it only shows a specific amount
          this.itemsNew = itemsData.items.slice(0, this.displayNumb);
          this.showSpinner = false;
        },
        error: error => console.log(error)
    });
  }

  ngOnDestroy(): void {
    this.ItemSub.unsubscribe();
  }

  // on scrolling, add more items to list.
  onScroll(): void {
    this.showSpinner = true;
    this.itemsNew = this.items.slice(0, (this.displayNumb += 5));
    this.showSpinner = false;
  }
}
