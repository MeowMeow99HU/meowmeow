import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {Plan} from '../shared/models/Plan';
import {PlaninfgetService} from '../shared/services/planinfget.service';
import { CommonModule } from '@angular/common';
import {PlansService} from '../shared/services/plans.service';
import {TextPipe} from '../shared/pipe/text.pipe';
import {MonetextPipe} from '../shared/pipe/monetext.pipe';

@Component({
  selector: 'app-busplanscontent',
  imports: [MatCardModule, MatButtonModule, CommonModule, TextPipe, MonetextPipe],
  templateUrl: './busplanscontent.component.html',
  styleUrl: './busplanscontent.component.css'
})
export class BusplanscontentComponent {
  businessPlans: Plan[] | null = null;

  constructor(private planinfgetservice: PlaninfgetService, private planservice : PlansService) {}

  async ngOnInit() {
    await this.loadBusinessPlans();
  }

  async loadBusinessPlans() {
    try {
      this.businessPlans = await this.planinfgetservice.PlansByPrice("businessplan");
    } catch (err) {
      console.error('Failed to load plans:', err);
      this.businessPlans = null;
    }
  }
  async buyPlan(which: string){
    await this.planservice.setPaidPlan(which);
    alert("Sikeresen megvetted :(");
  }
}
