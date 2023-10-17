import {Component, OnInit} from '@angular/core';
import {StateService} from "../state.service";
import {FoodIngredient} from "../app.component";

type WeightItem = { item: FoodIngredient, weight: number | undefined };

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.scss']
})
export class CalculationComponent implements OnInit {
  items: FoodIngredient[] = [];
  weightPerItem: WeightItem[] = [];
  insulinSum = 0;

  constructor(private stateService: StateService) {
  }

  ngOnInit(): void {
    this.items = this.stateService.items;
    this.initializeWeightPerItem();
    this.insulinSum = this.calculateInsulinSum(this.weightPerItem)
  }

  private initializeWeightPerItem() {
    this.weightPerItem = this.items.map(it => {
      return {item: it, weight: undefined}
    })
  }

  private calculateInsulinSum(weightperItem: WeightItem[]): number {
    return weightperItem.reduce((accumulator, currentValue) => {
      const weight = currentValue.weight;
      return accumulator + (weight ? weight/ 100 : 0);
    }, 0);
  }

  deleteItem(id: number) {
    this.items = this.items.filter(it => it.id !== id);
    this.initializeWeightPerItem();
    this.insulinSum = this.calculateInsulinSum(this.weightPerItem)
    this.stateService.setItems(this.items);
  }

  updateItemWeight(id: number, event: Event) {
    let foundItem = this.weightPerItem.find(it => it.item.id === id);
    if (foundItem) {
      foundItem.weight = parseInt((event.target as HTMLInputElement).value);
    }
    this.insulinSum = this.calculateInsulinSum(this.weightPerItem)
  }
}
