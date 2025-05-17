import {Component, OnDestroy, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { HomecontentComponent } from './homecontent/homecontent.component';
import { FooterComponent } from './shared/footer/footer.component';
import {Subscription} from 'rxjs';
import {AuthService} from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, HomecontentComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit , OnDestroy{
  title = 'mobilcsomagprojekt';
  isLoggedIn = false;

  private authSubscription?: Subscription;
  constructor(private authService : AuthService){}

  ngOnInit() : void{
    this.authSubscription = this.authService.currentUser.subscribe(user => {
      this.isLoggedIn = !!user;
      localStorage.setItem('isLoggedIn', this.isLoggedIn ? 'true' : 'false');
    });
    console.log('Is logged in: ', localStorage.getItem('isLoggedIn'));
  }

  ngOnDestroy() : void{
    this.authSubscription?.unsubscribe();
  }

  logout() : void{
    this.authService.logout();
  }
}
