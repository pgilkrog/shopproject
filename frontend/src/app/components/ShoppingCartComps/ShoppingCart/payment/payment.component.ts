import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.sass']
})

export class PaymentComponent {
  @Input() paymentMethodNumb = 0;
  @Output() eventName = new EventEmitter();
  @Output() paymentSuccessful = new EventEmitter();

  showSpinner = false;
  paymentSuccess = false;

  close(): void {
    this.eventName.emit();
  }

  simulatePayment(): void {
    this.showSpinner = true;
    setInterval(() => {
      this.showSpinner = false;
      this.paymentSuccess = true;
      this.paymentSuccessful.emit();
    }, 1500);
  }
}
