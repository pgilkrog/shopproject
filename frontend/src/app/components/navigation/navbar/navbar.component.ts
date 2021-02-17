import { Component, OnDestroy, OnInit } from '@angular/core';
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

  userIsAuthenticated = false;
  private authListenerSubs: Subscription = new Subscription();

  constructor(
    private itemService: ItemService,
    private cartService: ShoppingCartService,
    private userService: UserService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe((result: any) => this.categories = result.categories);

    this.userService.autoAuthUser();
    this.ItemsInBasket = this.cartService.getTotalItems();
    this.userIsAuthenticated = this.userService.getIsAuth();

    this.authListenerSubs = this.userService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  signout(): void{
    this.userService.signout();
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }

  gotoProducts(): void {
    this.itemService.getAllItems();
  }

  goToCategory(category: string): void {
    this.itemService.getItemByCategory(category);
  }
}
