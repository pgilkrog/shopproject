import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/Category';
import { CategoryService } from 'src/app/services/category.service';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})

export class NavbarComponent implements OnInit {
  categories: Category[] = [];

  constructor(private itemService: ItemService, private categoryService: CategoryService, private router: Router) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe((result: any) => this.categories = result.categories);
  }

  gotoProducts(): void {
    this.itemService.getAllItems();
  }

  goToCategory(category: string): void {
    this.itemService.getItemByCategory(category);
  }
}
