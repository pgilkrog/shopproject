import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
import { Item } from '../../../models/Item';

@Component({
  selector: 'app-itemdetail',
  templateUrl: './itemDetail.component.html',
  styleUrls: ['./itemDetail.component.sass']
})

export class ItemDetailComponent implements OnInit {
  item?: Item;

  constructor(private itemService: ItemService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.itemService.getItemById(this.route.snapshot.paramMap.get('id') as string)
      .subscribe((data: any) => (this.item) = (data.item as Item));
  }
}
