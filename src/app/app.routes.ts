import { RouterModule, Routes } from '@angular/router';
import { HomecontentComponent } from './homecontent/homecontent.component';
import { ResplanscontentComponent } from './resplanscontent/resplanscontent.component';
import { BusplanscontentComponent } from './busplanscontent/busplanscontent.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
  { path: '', component: HomecontentComponent },
  { path: 'residental', component: ResplanscontentComponent },
  { path: 'business', component: BusplanscontentComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '' } // Wildcard route for 404
];
