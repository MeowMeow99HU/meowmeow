import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() =>
    initializeApp({ projectId: "mobilcsomagprojekt", appId: "1:114313742555:web:1bcdfc834427f6c960e4fe",
      storageBucket: "mobilcsomagprojekt.firebasestorage.app", apiKey: "AIzaSyD3lfR5ktR8ipr_0JiIjSqSpvQ3_m3oCHw",
      authDomain: "mobilcsomagprojekt.firebaseapp.com", messagingSenderId: "114313742555" })),
        provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
