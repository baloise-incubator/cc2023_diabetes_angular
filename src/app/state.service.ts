import { Injectable } from '@angular/core';
import {FoodIngredient} from "./app.component";

@Injectable({
  providedIn: 'root'
})
export class StateService {

  ingredients: FoodIngredient[] = [];
  dialogIngredients: FoodIngredient[] = [];

  constructor() { }

  setIngredients(items: FoodIngredient[]) {
    this.ingredients = items;
  }

  setDialogIngredients(items: FoodIngredient[]) {
    this.dialogIngredients = items;
  }
}
