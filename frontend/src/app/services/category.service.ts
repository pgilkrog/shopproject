import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject, pipe } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Category } from '../models/Category';

const BACKEND_URL = environment.apiUrl + 'category';

@Injectable({ providedIn: 'root' })

export class CategoryService {

  constructor(private http: HttpClient) {}

  getAllCategories(): any {
    return this.http.get<Category[]>(BACKEND_URL).pipe(tap(
      data => data,
      error => console.log('error', error)
    ));
  }

  createCategory(category: Category): void {
    this.http.post<{ response: string }>(BACKEND_URL, category).subscribe(responseData => {
      return responseData.response;
    });
  }
}
