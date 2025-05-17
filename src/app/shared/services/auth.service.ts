import {inject, Injectable} from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  authState,
  User,
  UserCredential,
  createUserWithEmailAndPassword
} from '@angular/fire/auth';
import {
  Firestore,
  collection,
  doc,
  setDoc
} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {UserData} from '../models/UserData'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: Observable<User |null>;
  private auth : Auth = inject(Auth);
  private firestore : Firestore = inject(Firestore);
  constructor(
    private router: Router,
  ) {
    this.currentUser = authState(this.auth);
  }

  login(email:string, password:string) : Promise<UserCredential>  {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout(): Promise<void> {
    localStorage.setItem('isLoggedIn', 'false');
    return signOut(this.auth);
  }

  isLoggedIn() : Observable<User | null> {
    return this.currentUser;
  }

  updateLoginStatus(isLoggedIn: boolean) : void {
    localStorage.setItem('isLoggedIn', isLoggedIn ? 'true' : 'false');
  }

  async register(email: string, password: string, userData: Partial<UserData>) : Promise<UserCredential>  {
    try{
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);

      await this.createUserData(userCredential.user.uid, {
        ...userData,
        id: userCredential.user.uid,
        email: email,
        paidplan: ''
      });

      return userCredential;
    }catch(error){
      console.log("huh.", error);
      throw error;
    }
  }
  private async createUserData(userId: string, userData: Partial<UserData>): Promise<void> {
    const userRef = doc(collection(this.firestore, 'Users'), userId);
    return setDoc(userRef, userData);
  }
}
