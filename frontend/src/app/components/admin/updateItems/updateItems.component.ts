import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/Category';
import { Item } from 'src/app/models/Item';
import { CategoryService } from 'src/app/services/category.service';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-updateitems',
  templateUrl: './updateItems.component.html'
})

export class UpdateItemsComponent implements OnInit, OnDestroy {
  updateForm: FormGroup = new FormGroup({});
  items: Item[] = [];
  categories: Category[] = [];
  private ItemSub: Subscription = new Subscription();

  constructor(private itemService: ItemService, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.updateForm = new FormGroup({
      id: new FormControl(null, {
        validators: [Validators.required]
      }),
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
      }),
      amountInStock: new FormControl(null, {
        validators: [Validators.required]
      })
    });

    this.ItemSub = this.itemService.getItems()
      .subscribe((itemsData) => {
        this.items = itemsData;
      });

    this.categoryService.getAllCategories().subscribe((result: any) => {
      this.categories = result.categories.sort(
        (one: Category, two: Category) => (one.name < two.name ? -1 : 1)
      );
    });
  }

  ngOnDestroy(): void {
    this.ItemSub.unsubscribe();
  }

  focusItem(item: Item): void {
    /* tslint:disable:no-string-literal */
    this.updateForm.controls['id'].setValue(item._id);
    this.updateForm.controls['name'].setValue(item.name);
    this.updateForm.controls['description'].setValue(item.description);
    this.updateForm.controls['price'].setValue(item.price);
    this.updateForm.controls['image'].setValue(item.image);
    this.updateForm.controls['companyName'].setValue(item.companyName);
    this.updateForm.controls['category'].setValue(item.category);
    this.updateForm.controls['amountInStock'].setValue(item.amountInStock);
    /* tslint:enable:no-string-literal */
  }

  updateItem(): void {
    const newItem: Item = {
      _id: this.updateForm.value.id,
      name: this.updateForm.value.name,
      description: this.updateForm.value.description,
      price: this.updateForm.value.price,
      image: this.updateForm.value.image,
      companyName: this.updateForm.value.companyName,
      category: this.updateForm.value.category,
      amountInStock: this.updateForm.value.amountInStock,
      numberBought: 0
    };

    this.itemService.updateItem(newItem);
  }
}
