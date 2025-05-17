import { Injectable, inject } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import {firstValueFrom, Observable, of, switchMap} from 'rxjs';
import {UserData} from '../models/UserData';

@Injectable({
  providedIn: 'root'
})
export class UserprofileService {
  constructor(private auth: Auth, private firestore: Firestore) {
  }

  async getUserData(): Promise<UserData | null> {
    try {
      const authUser = await firstValueFrom(user(this.auth));

      if (!authUser) {
        return null;
      }

      const docRef = doc(this.firestore, `Users/${authUser.uid}`);
      const userData = await firstValueFrom(docData(docRef) as Observable<UserData>);

      return userData;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  }
}
