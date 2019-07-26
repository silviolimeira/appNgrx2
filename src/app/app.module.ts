import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NgZone,
  PLATFORM_ID,
  ErrorHandler
} from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

import { AngularFireModule } from "angularfire2";
import {
  AngularFireDatabaseModule,
  AngularFireDatabase
} from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { environment } from "../environments/environment";
import { ComponentsModule } from "./components/components.module";
import { StoreModule } from "@ngrx/store";

import { reducer } from "./reducers/items";
import { EffectsModule } from "@ngrx/effects";
import { ItemsEffects } from "./effects/items";
import { TopStoriesEffects } from "./modules/top-stories/effect/top-stories";
import { HACKER_NEWS_DB } from "./hackernews-db";

// import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    ComponentsModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,

    StoreModule.forRoot(reducer),
    EffectsModule.forRoot([ItemsEffects])
  ],
  providers: [
    // StatusBar,
    // SplashScreen,
    // { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }

    // {provide: RouterStateSerializer, useClass: CustomRouterStateSerializer},
    {
      provide: HACKER_NEWS_DB,
      useFactory: (platformId: Object, zone: NgZone) =>
        new AngularFireDatabase(
          environment.firebaseConfig,
          "notablenotes-b7bcb",
          null,
          platformId,
          zone
        ),
      deps: [PLATFORM_ID, NgZone]
    },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // { provide: ErrorHandler, useClass: CustomErrorHandler },
    StatusBar,
    SplashScreen,
    InAppBrowser
    // SocialSharing
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
