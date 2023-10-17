import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {}

export interface FoodIngredient { id: number; title: string, unit: string, carbohydrateAvailable: number, sugar: number, KE: number }
