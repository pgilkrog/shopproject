import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/models/Item';

@Component({
  selector: 'app-itemsingle',
  templateUrl: './itemSingle.component.html',
  styleUrls: ['./itemSingle.component.sass']
})

export class ItemSingleComponent {
  @Input() item?: Item;

  constructor(private router: Router) {}

  goToItem(): void {
    if (this.item != null) {
      this.router.navigate(['ItemDetail/' + this.item._id]);
    }
  }
}
