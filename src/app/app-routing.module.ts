import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CalculationComponent} from "./calculation/calculation.component";
import {AuthGuard} from "./guard/auth.guard";

const routes: Routes = [
  { path: '', component: CalculationComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
