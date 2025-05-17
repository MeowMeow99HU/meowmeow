import {Component, OnInit} from '@angular/core';
import {UserprofileService} from '../shared/services/userprofile.service';
import {PlansService} from '../shared/services/plans.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {UserData} from '../shared/models/UserData';
import {Plan} from '../shared/models/Plan';

@Component({
  selector: 'app-profile',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  constructor(private getuserprofileservice: UserprofileService, private planservice : PlansService) {}
  user!: UserData | null;
  plan!: Plan | null;

  async ngOnInit() {
    await this.loadUserData();
    console.log(this.user?.paidplan)
    console.log(this.plan?.freeminutesathomeandeu)
  }

  async loadUserData() {
    try {
      this.user = await this.getuserprofileservice.getUserData();

      if (this.user?.paidplan) {
        this.plan = await this.planservice.getPlanData(this.user.paidplan);
      }
    } catch (err) {
      console.error('Failed to load user data:', err);
    }
  }

  async cancelPlan(){
    await this.planservice.clearPaidPlan();
    window.location.reload();
  }
}
