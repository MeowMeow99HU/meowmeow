import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {PlaninfgetService} from '../shared/services/planinfget.service';
import {PlansService} from '../shared/services/plans.service';
import {Plan} from '../shared/models/Plan';
import { CommonModule } from '@angular/common';
import {TextPipe} from '../shared/pipe/text.pipe';
import {MonetextPipe} from '../shared/pipe/monetext.pipe';

@Component({
  selector: 'app-resplanscontent',
  imports: [MatCardModule, MatButtonModule, CommonModule, TextPipe, MonetextPipe],
  templateUrl: './resplanscontent.component.html',
  styleUrl: './resplanscontent.component.css'
})
export class ResplanscontentComponent implements OnInit {
  residentalPlans: Plan[] | null = null;

  constructor(private planinfgetservice: PlaninfgetService, private planservice : PlansService) {}

  async ngOnInit() {
    await this.loadBusinessPlans();
  }

  async loadBusinessPlans() {
    try {
      this.residentalPlans = await this.planinfgetservice.PlansByPrice("residentalplan");
    } catch (err) {
      console.error('Failed to load plans:', err);
      this.residentalPlans = null;
    }
  }

  async buyPlan(which: string){
    await this.planservice.setPaidPlan(which);
    alert("Sikeresen megvetted :(");
  }
}

