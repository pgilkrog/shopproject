import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/Category';
import { CategoryService } from 'src/app/services/category.service';
import { ItemService } from 'src/app/services/item.service';
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

  constructor(
    private itemService: ItemService,
    private userService: UserService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe((result: any) => {
      this.categories = result.categories.sort((one: Category, two: Category) => (one.name < two.name ? -1 : 1));
    });

    this.userService.autoAuthUser();
    this.userRole = this.userService.getRole();
    this.userIsAuthenticated = this.userService.getIsAuth();

    this.authListenerSubs = this.userService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }

  signout(): void{
    this.userService.signout();
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
}
