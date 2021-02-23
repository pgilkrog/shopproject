import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/models/Item';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-itemlist',
  templateUrl: './itemList.component.html',
  styleUrls: ['./itemList.component.sass']
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
