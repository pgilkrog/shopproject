import { Injectable } from '@angular/core';
import { Item } from '../models/Item';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

const BACKEND_URL = environment.apiUrl + 'item';

@Injectable({ providedIn: 'root' })

export class ItemService {
  private items: Item[] = [];
  private itemsUpdated = new Subject<{ items: Item[] }>();

  constructor(private http: HttpClient) {}

  saveToSessionstorage(): void {
    this.http.get<{ items: any }>(BACKEND_URL).pipe(map((itemData) => {
      return { items: itemData.items.map((item: Item) => {
        return this.generateItem(item);
      })};
    }))
    .subscribe(data => {
      this.putDataIntoArrays(data.items),
      sessionStorage.setItem('products', JSON.stringify(data.items))
    });
  }

  getItemsListener(): Observable<{items: Item[]}> {
    return this.itemsUpdated.asObservable();
  }

  getItems(): Observable<Item[]> {
    return this.http.get<{ items: Item[]}>(BACKEND_URL).pipe(
      map((data: any) => data.items.map((item: Item) => this.generateItem(item)))
    );
  }

  getAllItems(): void {
    this.putDataIntoArrays(this.productsFromSessionStorage);
  }

  getItemsOnSale(): any {
    const onSale = true;
    return this.http.get<{items: Item[]}>(BACKEND_URL + '/onSale/' + onSale).pipe(map((itemData) => {
      return { items: itemData.items.map((item: Item) => {
        return this.generateItem(item);
      })};
    }))
    .subscribe(data => this.putDataIntoArrays(data.items));
  }

  getTopFiveItem(): Observable<Item[]> {
    return this.http.get<{ items: Item[] }>(`${BACKEND_URL}/pop/pop/`).pipe(
      map((itemData: any) => itemData.items.map((item: Item) => this.generateItem(item)))
    );
  }

  autoSearchItems(search: string): any {
    if (search.trim() !== ''){
      return this.http.get<{ items: Item[] }>(BACKEND_URL + '/autosearch/complete/' + search).pipe(
        map((itemData: any) => itemData.items.map((item: Item) => this.generateItem(item)))
      );
    } else {
      return [{}];
    }
  }

  getItemById(id: string): any {
    return this.http.get<{ item: Item }>(BACKEND_URL + '/' + id);
  }

  searchItems(search: string): any {
    return this.http.get<{items: any}>(BACKEND_URL + '/search/' + search).pipe(map((itemData) => {
      return { items: itemData.items.map((item: Item) => {
        return this.generateItem(item);
      })};
    }))
    .subscribe(data => this.putDataIntoArrays(data.items))
  }

  getItemByCategory(category: string): void {
    this.putDataIntoArrays(this.productsFromSessionStorage.filter(item => item.category === category));
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

  putDataIntoArrays(data: any): void {
    this.items = data;
    this.itemsUpdated.next({
      items: [...this.items]
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
      numberBought: item.numberBought,
      saleAmount: item.saleAmount,
      onSale: item.onSale
    };
  }

  get itemsList(): Item[] {
    return this.items;
  }

  get productsFromSessionStorage(): Item[] {
    return (sessionStorage.getItem('products') as string) ? JSON.parse(sessionStorage.getItem('products') as string) as Item[] : []
  }
}
