import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Item } from 'src/app/models/Item';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-navsearch',
  templateUrl: './navSearch.component.html',
  styleUrls: ['./navSearch.component.sass']
})

export class NavSearchComponent implements OnInit {
  autoSearchItems: Item[] = [];
  showSearchbar = false;
  showDropDown = false;

  searchForm: FormGroup = new FormGroup({});
  queryField: FormControl = new FormControl();

  @Output() newItemEvent = new EventEmitter();

  constructor(private itemService: ItemService, private route: Router) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      search: new FormControl(null, {
        validators: [Validators.required]
      })
    });

    this.queryField.valueChanges.pipe(
      debounceTime(500), distinctUntilChanged(),
      switchMap(search => this.itemService.autoSearchItems(search)))
      .subscribe((result: any) => {
        this.autoSearchItems = [];
        Object.keys(result).map((index: any) => {
          this.autoSearchItems.push(result[index]);
        });
      });
  }

  search(): void {
    if(this.CheckText()) {
      this.itemService.searchItems(this.queryField.value.trim());
      this.newItemEvent.emit();
      this.route.navigate(['FilteredList/' + this.searchForm.value.search]);
    }
  }

  CheckText(): boolean {
    if (this.queryField.value.trim() !== '') {
      return true;
    }
    else {
      return false;
    }
  }

  onAutoClick(id: string): void {
    this.route.navigate(['/ItemDetail/' + id]);
    this.newItemEvent.emit();
  }

  onKeydown(event: any): void {
    if (event.key === 'Enter' && (this.queryField.value.trim() !== '' && this.queryField.value.trim() !== ' ')) {
      this.search();
    }
  }
}
