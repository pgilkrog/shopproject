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
  name = '';
  private ItemSub: Subscription = new Subscription();

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.ItemSub = this.itemService.getItemsListener()
      .subscribe((itemsData: { items: Item[] }) => {
        this.items = itemsData.items;
      });
  }

  ngOnDestroy(): void {
    this.ItemSub.unsubscribe();
  }
}
