import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Rating } from '../models/Rating';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class RatingService {
  BACKEND_URL = environment.apiUrl + 'rating';

  constructor(private http: HttpClient){}

  createRating(rating: Rating): void {
    console.log("createRating", rating);
    this.http.post<{ response: string }>(this.BACKEND_URL, rating).subscribe(responseData => {
      return responseData.response;
    });
  }

  getRatingsByItemId(itemId: string): any {
    console.log("getRatingsByItemId", itemId);
    return this.http.get<{ ratings: any }>(this.BACKEND_URL + '/' + itemId).pipe(map((data) => {
      return { ratings: data.ratings };
    }));
  }

  getRatingsByUserId(userId: string): any {
    return this.http.get<{ ratings: Rating }>(this.BACKEND_URL + '/userratings/' + userId).pipe(map((data) => {
      return { ratings: data.ratings };
    }));
  }
}
