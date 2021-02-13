import { Injectable } from '@angular/core';
import { Item } from '../models/Item';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

const BACKEND_URL = environment.apiUrl + 'item';

@Injectable({ providedIn: 'root' })

export class ItemService {
  private items: Item[] = [];
  private itemsUpdated = new Subject<{ items: Item[] }>();

  constructor(private http: HttpClient) {}

  getItemsListener(): Observable<{items: Item[]}> {
    return this.itemsUpdated.asObservable();
  }

  getAllItems(): void {
    this.http.get<{ items: any }>(BACKEND_URL).pipe(map((itemData) => {
      return { items: itemData.items.map((item: Item) => {
        return {
          _id: item._id,
          name: item.name,
          description: item.description,
          price: item.price,
          image: item.image,
          companyName: item.companyName,
          category: item.category
        };
      })};
    }))
    .subscribe(data => {
      this.items = data.items;
      this.itemsUpdated.next({
        items: [...this.items]
      });
    });
  }

  getItemById(id: string): any {
    return this.http.get<{ item: Item }>(BACKEND_URL + '/' + id);
  }

  getItemByCategory(category: string): any {
    return this.http.get<{items: any}>(BACKEND_URL + '/cat/' + category).pipe(map((itemData) => {
      return { items: itemData.items.map((item: Item) => {
        return {
          _id: item._id,
          name: item.name,
          description: item.description,
          price: item.price,
          image: item.image,
          companyName: item.companyName,
          category: item.category
        };
      })};
    }))
    .subscribe(data => {
      this.items = data.items;
      this.itemsUpdated.next({
        items: [...this.items]
      });
    });
  }

  createItem(item: Item): void {
    this.http.post<{ response: string }>(BACKEND_URL, item).subscribe(responseData => {
      return responseData.response;
    });
  }
}
