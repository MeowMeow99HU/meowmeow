import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {Plan} from '../shared/models/Plan';
import {PlaninfgetService} from '../shared/services/planinfget.service';
import {PlansService} from '../shared/services/plans.service';
import { CommonModule } from '@angular/common';
import {TextPipe} from '../shared/pipe/text.pipe';
import {MonetextPipe} from '../shared/pipe/monetext.pipe';

@Component({
  selector: 'app-allplansearch',
  imports: [MatCardModule, MatButtonModule, CommonModule, TextPipe, MonetextPipe],
  templateUrl: './allplansearch.component.html',
  styleUrl: './allplansearch.component.css'
})
export class AllplansearchComponent {
  searchedPlans: Plan[] | null = null;

  constructor(private planinfgetservice: PlaninfgetService, private planservice : PlansService) {}

  async loadPlansByPrice() {
    try {
      this.searchedPlans = await this.planinfgetservice.PlansByPriceAll();
    } catch (err) {
      console.error('Failed to load plans:', err);
      this.searchedPlans = null;
    }
  }
  async loadPlansByUnlimitedDataOutsideHome() {
    try {
      this.searchedPlans = await this.planinfgetservice.PlansByUnlimitedDataOutsideHome();
    } catch (err) {
      console.error('Failed to load plans:', err);
      this.searchedPlans = null;
    }
  }
  async loadPlansByUnlimitedDataAtHome() {
    try {
      this.searchedPlans = await this.planinfgetservice.PlansByUnlimitedDataAtHome();
    } catch (err) {
      console.error('Failed to load plans:', err);
      this.searchedPlans = null;
    }
  }
  async buyPlan(which: string){
    await this.planservice.setPaidPlan(which);
    alert("Sikeresen megvetted :(");
  }
}
