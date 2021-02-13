import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/Category';
import { Item } from 'src/app/models/Item';
import { CategoryService } from 'src/app/services/category.service';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-createstuff',
  templateUrl: './createstuff.component.html'
})

export class CreateStuffComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  categoryName = '';
  categories: Category[] = [];

  constructor(private itemService: ItemService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        validators: [Validators.required]
      }),
      price: new FormControl(null, {
        validators: [Validators.required]
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
      }),
      companyName: new FormControl(null, {
        validators: [Validators.required]
      }),
      category: new FormControl(null, {
        validators: [Validators.required]
      })
    });

    this.categoryService.getAllCategories().subscribe((result: any) => this.categories = result.categories);
  }

  createItem(): void {
    const item: Item = {
      _id: '',
      name: this.form.value.name,
      description: this.form.value.description,
      price: this.form.value.price,
      image: this.form.value.image,
      companyName: this.form.value.companyName,
      category: this.form.value.category
    };

    this.itemService.createItem(item);
  }

  createCategory(): void {
    const category: Category = {
      _id: '',
      name: this.categoryName
    };

    this.categoryService.createCategory(category);
  }
}
