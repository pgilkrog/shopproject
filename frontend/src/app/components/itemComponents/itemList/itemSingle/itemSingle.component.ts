import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'
import { Item } from 'src/app/models/Item'
import { ShoppingCartService } from 'src/app/services/shoppingcart.service'
import { currencyHelper } from '../../../../helpers/currencyDisplay'

@Component({
  selector: 'app-itemsingle',
  templateUrl: './itemSingle.component.html',
  styleUrls: ['./itemSingle.component.sass']
})

export class ItemSingleComponent {
  @Input() item?: Item

  constructor(private router: Router, private cartService: ShoppingCartService) {}

  goToItem(): void {
    if (this.item != null) {
      this.router.navigate(['ItemDetail/' + this.item._id])
    }
  }

  checkAmountLeft(): number {
    if(this.item !== undefined)
      return this.cartService.checkAmountLeftOnItem(this.item)
    else
      return 0
  }

  buy(): void {
    if (this.item){
      this.cartService.addToCart(this.item)
    }
  }

  prettyCurrency(numb: number) {
    return currencyHelper(numb)
  }
}
