import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Category } from '../models/Category';

const BACKEND_URL = environment.apiUrl + 'category';

@Injectable({ providedIn: 'root' })

export class CategoryService {
  categories: Category[] = [];

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(BACKEND_URL).pipe(tap(
      data => data,
      error => console.log('[category error]', error)
    ));
  }

  createCategory(category: Category): void {
    this.http.post<{ response: string }>(BACKEND_URL, category).subscribe({
      next: res => res,
      error: error => console.log(error)
    });
  }
}
