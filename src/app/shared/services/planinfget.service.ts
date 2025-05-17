import { Injectable } from '@angular/core';
import {collection, doc, docData, Firestore, getDocs, limit, orderBy, query, where} from '@angular/fire/firestore';
import {Plan} from '../models/Plan';

@Injectable({
  providedIn: 'root'
})
export class PlaninfgetService {
  constructor(private firestore: Firestore) {}
  async PlansByPrice(typeOfPlan : string): Promise<Plan[] | null> {
    try {
      const plansCollection = collection(this.firestore, 'Plans');
      const q = query(
        plansCollection,
        orderBy('price'),
        where('type', '==', typeOfPlan),
        limit(3)
      );

      const queryres = await getDocs(q);
      return queryres.docs.map(doc => ({
        id: doc.id,
        ...doc.data() as Omit<Plan, 'id'>
      }));
    } catch (error) {
      console.error('Error fetching plans:', error);
      return null;
    }
  }
  async PlansByPriceAll(): Promise<Plan[] | null> {
    try {
      const plansCollection = collection(this.firestore, 'Plans');
      const q = query(
        plansCollection,
        orderBy('price'),
        limit(6)
      );

      const queryres = await getDocs(q);
      return queryres.docs.map(doc => ({
        id: doc.id,
        ...doc.data() as Omit<Plan, 'id'>
      }));
    } catch (error) {
      console.error('Error fetching plans:', error);
      return null;
    }
  }
  async PlansByUnlimitedDataOutsideHome(): Promise<Plan[] | null> {
    try {
      const plansCollection = collection(this.firestore, 'Plans');
      const q = query(
        plansCollection,
        where('unlimiteddataoutsidehome', '==', 'true'),
        limit(6)
      );

      const queryres = await getDocs(q);
      return queryres.docs.map(doc => ({
        id: doc.id,
        ...doc.data() as Omit<Plan, 'id'>
      }));
    } catch (error) {
      console.error('Error fetching plans:', error);
      return null;
    }
  }
  async PlansByUnlimitedDataAtHome(): Promise<Plan[] | null> {
    try {
      const plansCollection = collection(this.firestore, 'Plans');
      const q = query(
        plansCollection,
        where('unlimiteddataathome', '==', 'true'),
        limit(6)
      );

      const queryres = await getDocs(q);
      return queryres.docs.map(doc => ({
        id: doc.id,
        ...doc.data() as Omit<Plan, 'id'>
      }));
    } catch (error) {
      console.error('Error fetching plans:', error);
      return null;
    }
  }
}
