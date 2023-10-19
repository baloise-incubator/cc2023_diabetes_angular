import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {FoodIngredient} from "../app/app.component";

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private baseUrl = 'api/json/food'; // Adjust the URL if needed

  constructor(private http: HttpClient) {}

  searchFood(search: string): Observable<FoodIngredient[]> {
    return this.http.get<FoodIngredient[]>(this.baseUrl + `?search=${search}`);
  }
}
