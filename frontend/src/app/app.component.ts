import { Component } from '@angular/core';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { ItemService } from './services/item.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent {
  title = 'Gamer Gear';
  screenWidth = 0;

  constructor(private translate: TranslateService, private itemService: ItemService){
    this.itemService.saveToSessionstorage();
    translate.setDefaultLang('en');
    this.screenWidth = window.screen.width;
  }

}
