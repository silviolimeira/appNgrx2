import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { HomePage } from "./home.page";
// import { ComponentsModule } from "../components/components.module";
import { TopStoriesEffects } from "../modules/top-stories/effect/top-stories";
import { TopStoriesComponent } from "../components/top-stories/top-stories.component";
import { StoreModule } from "@ngrx/store";

import { reducers as topStoriesReducer } from "../modules/top-stories/reducer";
import { reducer } from "../reducers/items";
import { EffectsModule } from "@ngrx/effects";
import { ItemsEffects } from "../effects/items";
import { ComponentsModule } from "../components/components.module";

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: "",
        component: HomePage
      }
    ]),
    StoreModule.forFeature("tops", topStoriesReducer),
    EffectsModule.forFeature([TopStoriesEffects]),

    StoreModule.forFeature("item", reducer),
    EffectsModule.forFeature([ItemsEffects])

    // EffectsModule.forFeature([ItemsEffects])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // providers: [TopStoriesEffects],
  declarations: [HomePage]
})
export class HomePageModule {}
