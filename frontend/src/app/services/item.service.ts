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

  getItems(): Observable<Item[]> {
      return this.http.get<{ items: Item[]}>(BACKEND_URL).pipe(
        map((data: any) => data.items.map((item: Item) => this.generateItem(item)))
      );
  }

  getAllItems(): void {
    this.http.get<{ items: any }>(BACKEND_URL).pipe(map((itemData) => {
      return { items: itemData.items.map((item: Item) => {
        return this.generateItem(item);
      })};
    }))
    .subscribe(data => {
      this.items = data.items;
      this.itemsUpdated.next({
        items: [...this.items]
      });
    });
  }

  getTopFiveItem(): Observable<Item[]> {
    return this.http.get<{ items: Item[] }>(`${BACKEND_URL}/pop/pop/`).pipe(
      map((itemData: any) => itemData.items.map((item: Item) => this.generateItem(item)))
    );
  }


  getItemById(id: string): any {
    return this.http.get<{ item: Item }>(BACKEND_URL + '/' + id);
  }

  getItemByCategory(category: string): any {
    return this.http.get<{items: any}>(BACKEND_URL + '/cat/' + category).pipe(map((itemData) => {
      return { items: itemData.items.map((item: Item) => {
        return this.generateItem(item);
      })};
    }))
    .subscribe(data => {
      this.items = data.items;
      this.itemsUpdated.next({
        items: [...this.items]
      });
    });
  }

  updateItem(item: Item): void {
    this.http.post(BACKEND_URL + '/' + item._id, item)
    .subscribe(response => {
      console.log(response);
    });
  }

  createItem(item: Item): void {
    this.http.post<{ response: string }>(BACKEND_URL, item).subscribe(responseData => {
      return responseData.response;
    });
  }

  generateItem(item: Item): Item {
    return {
      _id: item._id,
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
      companyName: item.companyName,
      category: item.category,
      amountInStock: item.amountInStock,
      numberBought: item.numberBought
    };
  }
}
