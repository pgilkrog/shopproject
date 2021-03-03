import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent {
  title = 'Gamer Gear';
  screenWidth = 0;

  constructor(){
    this.screenWidth = window.screen.width;
  }

}
