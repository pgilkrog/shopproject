import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { currencyHelper } from "src/app/helpers/currencyDisplay";
import { Order } from "src/app/models/Order";
import { ShoppingCart } from "src/app/models/ShoppingCart";
import { OrderService } from "src/app/services/order.service";

@Component({
  selector: "app-overview",
  templateUrl: "./overview.component.html"
})

export class OverviewComponent {
  @Input() infoForm: FormGroup = new FormGroup({});
  @Input() cart: ShoppingCart = {
    cartItems: [] = [],
    itemsAmount: 0,
    totalPrice: 0
  };
  @Output() progreesEvent = new EventEmitter();

  constructor(private orderService: OrderService){}

  completeOrder(): void {
    const order: Order = {
      _id: '',
      items: this.cart.cartItems,
      totalPrice: this.cart.totalPrice,
      totalNumberItems: this.cart.itemsAmount,
      status: 'order made',
      userEmail: this.infoForm.value.userEmail,
      address: this.infoForm.value.address,
      city: this.infoForm.value.city
    };

    this.orderService.completeOrder(order);
  }

  orderProcess() {
    this.progreesEvent.emit();
  }

  prettyCurrency(numb: number) {
    return currencyHelper(numb);
  }
}
