import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/models/Item';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.sass']
})

export class HomepageComponent implements OnInit, OnDestroy {
  items: Item[] = [];
  private ItemSub: Subscription = new Subscription();

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.ItemSub = this.itemService.getTopFiveItem().subscribe((itemData) => {
      this.items = itemData;
    });
  }

  ngOnDestroy(): void {
    this.ItemSub.unsubscribe();
  }
}
