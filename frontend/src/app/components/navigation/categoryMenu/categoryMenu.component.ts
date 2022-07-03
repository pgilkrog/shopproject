import { Component, OnInit } from "@angular/core";
import { CategoryService } from "src/app/services/category.service";
import { ItemService } from "src/app/services/item.service";

@Component({
  selector: 'app-category-menu',
  templateUrl: './categoryMenu.component.html',
  styleUrls: ['./categoryMenu.component.sass']
})

export class CategoryMenu implements OnInit {
  categories: string[] = [];

  constructor(
    private categoryService: CategoryService,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
      this.categories = this.categoryService.getCategories;
  }

  goToCategory(category: string): void {
      this.itemService.getItemByCategory(category);
  }
}
