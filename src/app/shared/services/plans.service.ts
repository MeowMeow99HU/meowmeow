import { Injectable } from '@angular/core';
import {Auth, user} from '@angular/fire/auth';
import {doc, docData, Firestore, updateDoc} from '@angular/fire/firestore';
import {firstValueFrom, Observable, of, switchMap} from 'rxjs';
import {UserData} from '../models/UserData';
import {Plan} from '../models/Plan';

@Injectable({
  providedIn: 'root'
})
export class PlansService {
  constructor(private auth: Auth, private firestore: Firestore) {}
  async getPlanData(plan: String): Promise<Plan | null> {
    try {
      const authUser = await firstValueFrom(user(this.auth));

      if (!authUser) return null;
      if (plan == null && plan  == "" && plan  == undefined) return null;

      const docRef = doc(this.firestore, `Plans/${plan}`);
      const planData = await firstValueFrom(docData(docRef) as Observable<Plan>);

      return planData;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  }
  async clearPaidPlan(): Promise<void> {
    try {
      const authUser = await firstValueFrom(user(this.auth));
      if (!authUser) return;

      const userRef = doc(this.firestore, `Users/${authUser.uid}`);
      await updateDoc(userRef, {
        paidplan: ""
      });
      console.log('Successfully cleared paid plan');
    } catch (error) {
      console.error('Error clearing paid plan:', error);
      throw error;
    }
  }

  async setPaidPlan(newpaidplan: string): Promise<void> {
    try {
      const authUser = await firstValueFrom(user(this.auth));
      if (!authUser) return;

      const userRef = doc(this.firestore, `Users/${authUser.uid}`);
      await updateDoc(userRef, {
        paidplan: newpaidplan
      });
    } catch (error) {
      console.error('Error clearing paid plan:', error);
      throw error;
    }
  }
}

