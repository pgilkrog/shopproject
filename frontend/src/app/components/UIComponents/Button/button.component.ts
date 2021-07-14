import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})

export class ButtonComponent {
  @Input() label: String = '';
  @Output() onClick = new EventEmitter<any>();

  onClickButton(event: any) {
    this.onClick.emit(event);
  }
}
