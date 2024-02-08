import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {  RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, indexedDBLocalPersistence, initializeAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { Capacitor } from '@capacitor/core';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          apiKey: "AIzaSyDV3nISFangdANytzWzyB9xGnYNPfAYcew",
          authDomain: "tracebuy-fd4ef.firebaseapp.com",
          projectId: "tracebuy-fd4ef",
          storageBucket: "tracebuy-fd4ef.appspot.com",
          messagingSenderId: "13258910704",
          appId: "1:13258910704:web:efd6046b650fa3ddb3cb35",
          measurementId: "G-Z9P0B1JB14"
        }))
    ),
    importProvidersFrom(
      provideAuth(() => {
        if (Capacitor.isNativePlatform()) {
          return initializeAuth(getApp(), {
            persistence: indexedDBLocalPersistence,
          });
        } else {
          return getAuth();
        }
      }
      )
    ),
    importProvidersFrom(provideFirestore(()=>getFirestore())),
  ],
});
