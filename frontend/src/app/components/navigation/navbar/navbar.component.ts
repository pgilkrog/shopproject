import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/Category';
import { CategoryService } from 'src/app/services/category.service';
import { ItemService } from 'src/app/services/item.service';
import { ShoppingCartService } from 'src/app/services/shoppingcart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})

export class NavbarComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  ItemsInBasket = 0;

  showSearchbar = false;

  userRole = '';
  userIsAuthenticated = false;

  private authListenerSubs: Subscription = new Subscription();
  private itemListenerSub: Subscription = new Subscription();

  constructor(
    private itemService: ItemService,
    private userService: UserService,
    private categoryService: CategoryService,
    private cartService: ShoppingCartService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe({
      error: () => {  },
      next: (data: any) => this.categories = data.categories,
    });

    this.userService.autoAuthUser();
    this.userRole = this.userService.getRole();
    this.userIsAuthenticated = this.userService.getIsAuth();

    this.authListenerSubs = this.userService.getAuthStatusListener().subscribe({
        next: isAuthenticated => this.userIsAuthenticated = isAuthenticated,
        error: (error) => console.log(error)
      });

    this.itemListenerSub = this.cartService.getTotalAmount().subscribe({
      next: data => this.ItemsInBasket = data,
      error: error => console.log(error)
    });
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
    this.itemListenerSub.unsubscribe();
  }

  signout(): void{
    this.userService.signout();
  }

  goToSale(): void {
    this.itemService.getItemsOnSale();
  }

  gotoProducts(): void {
    this.itemService.getAllItems();
  }

  goToCategory(category: string): void {
    this.itemService.getItemByCategory(category);
  }

  toggleSearchMenu(): void {
    this.showSearchbar = !this.showSearchbar;
  }

  changeLanguage(language: string): void {
    this.translate.use(language);
  }
}
