import { Injectable } from '@angular/core';
import {FoodIngredient} from "./app.component";

@Injectable({
  providedIn: 'root'
})
export class StateService {

  items: FoodIngredient[] = [];

  constructor() { }

  setItems(items: FoodIngredient[]) {
    this.items = items;
  }
}
