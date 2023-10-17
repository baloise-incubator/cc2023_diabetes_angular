import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CalculationComponent} from "./calculation/calculation.component";
import {SearchIngredientComponent} from "./search-ingredient/search-ingredient.component";
import {AuthGuard} from "./guard/auth.guard";

const routes: Routes = [
  { path: '', component: SearchIngredientComponent, canActivate: [AuthGuard] },
  { path: 'calculation', component: CalculationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
