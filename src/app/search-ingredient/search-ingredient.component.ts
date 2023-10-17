import {Component, OnInit} from '@angular/core';
import {FoodIngredient} from "../app.component";
import {FoodService} from "../../api/food.service";
import {StateService} from "../state.service";

@Component({
  selector: 'app-search-ingredient',
  templateUrl: './search-ingredient.component.html',
  styleUrls: ['./search-ingredient.component.scss']
})
export class SearchIngredientComponent implements OnInit {
  selectedItems: FoodIngredient[] = [];
  foundItems: FoodIngredient[] = [];
  filterName = '';

  constructor(private foodService: FoodService, private stateService: StateService) {
  }

  search(event: any) {
    const value = (event.target as HTMLInputElement).value;
    if (value) {
      this.foodService.searchFood(value).subscribe((data: FoodIngredient[]) => {
        this.foundItems = data;
      });
    }
  }

  selectItem(it: FoodIngredient) {
    this.selectedItems = [...this.selectedItems, it]
    this.stateService.setItems(this.selectedItems);
    this.filterName = '';
    this.clearResult();
  }

  removeIngredient(id: number) {
    this.selectedItems = this.selectedItems.filter(it => it.id !== id);
    this.stateService.setItems(this.selectedItems);
  }

  clearResult() {
    this.foundItems = [];
  }

  ngOnInit(): void {
    this.selectedItems = this.stateService.items;
  }
}
