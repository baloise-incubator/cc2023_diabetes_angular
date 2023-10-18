import {Component, OnDestroy, OnInit} from '@angular/core';
import {StateService} from "../state.service";
import {FoodIngredient, UserProfile} from "../app.component";
import { UserProfileService } from 'src/api/user-profile.service';
import { Subscription, from } from 'rxjs';

type WeightItem = { item: FoodIngredient, weight: number | undefined, carbSum: number };

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.scss']
})
export class CalculationComponent implements OnInit, OnDestroy {
  items: FoodIngredient[] = [];
  weightPerItem: WeightItem[] = [];
  insulinSum = 0;
  keSum = 0;

  userProfile: UserProfile = {sensitivityMorning: 0.0, sensitivityNoon: 0.0, sensitivityEvening: 0.0};
  subscription: Subscription;
  selectedSensitivity: number = 0
  showIngredientDialog = false;


  constructor(private stateService: StateService, private userProfileService: UserProfileService) {
    this.subscription = from(this.userProfileService.loadProfile()).subscribe((p: UserProfile) => {
      if (p) {
        this.userProfile = {sensitivityMorning: p.sensitivityMorning,
          sensitivityNoon: p.sensitivityNoon,
          sensitivityEvening: p.sensitivityEvening}
        this.selectedSensitivity = p.sensitivityMorning;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.initializeView();
  }

  private initializeView() {
    this.items = this.stateService.ingredients;
    this.initializeWeightPerItem();
    this.insulinSum = this.calculateInsulinSum(this.weightPerItem)
  }

  private initializeWeightPerItem() {
    this.weightPerItem = this.items.map(it => {
      return {item: it, weight: undefined, carbSum: 0}
    })
  }

  private calculateInsulinSum(weightperItem: WeightItem[]): number {
    return weightperItem.reduce((accumulator, currentValue) => {
      const weight = currentValue.weight;
      return accumulator + (weight ? weight/ 100 : 0);
    }, 0) / this.selectedSensitivity;
  }

  private calculateKeSum(weightperItem: WeightItem[]): number {
    return weightperItem.reduce((accumulator, currentValue) => {
      return accumulator + ((currentValue.weight ?? 0) * currentValue.item.carbohydrateUnits) ?? 0;
    }, 0);
  }

  onSensitivityChanged(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.selectedSensitivity = parseFloat(value);
  }

  deleteItem(id: number) {
    this.items = this.items.filter(it => it.id !== id);
    this.initializeWeightPerItem();
    this.insulinSum = this.calculateInsulinSum(this.weightPerItem)
    this.stateService.setIngredients(this.items);
  }

  updateItemWeight(id: number, event: Event) {
    let foundItem = this.weightPerItem.find(it => it.item.id === id);
    if (foundItem) {
      foundItem.weight = parseInt((event.target as HTMLInputElement).value);
      foundItem.carbSum = foundItem.item.carbohydrateAvailable * foundItem.weight; // TODO-MZ use field instead of 1
    }
    this.keSum = this.calculateKeSum(this.weightPerItem);
    this.insulinSum = this.calculateInsulinSum(this.weightPerItem)
  }

  getWeightedValue(carbohydrateAvailable: number, weight: number|undefined) {
    return weight ? carbohydrateAvailable * weight : 0
  }

  closeDialog() {
    this.toggleIngredientDialog();
    this.initializeView();
  }

  toggleIngredientDialog() {
    this.showIngredientDialog = !this.showIngredientDialog;
    this.stateService.dialogIngredients = [];
  }

  saveIngredients() {
    this.stateService.ingredients = [...this.stateService.ingredients, ...this.stateService.dialogIngredients];
    this.initializeView();
    this.toggleIngredientDialog();
  }
}
