import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";

import { reducers as topStoriesReducer } from "../modules/top-stories/reducer";
import { StoreModule } from "@ngrx/store";
import { TopStoriesEffects } from "../modules/top-stories/effect/top-stories";
import { EffectsModule } from "@ngrx/effects";
import { TopStoriesComponent } from "./top-stories/top-stories.component";
import { ItemsComponent } from "./items/items.component";
import { ItemComponent } from "./item/item.component";

@NgModule({
  declarations: [ItemsComponent, ItemComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule],
  exports: [ItemsComponent, ItemComponent]
})
export class ComponentsModule {}
