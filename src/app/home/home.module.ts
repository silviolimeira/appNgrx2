import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { HomePage } from "./home.page";
import { ComponentsModule } from "../components/components.module";
import { TopStoriesEffects } from "../modules/top-stories/effect/top-stories";
import { TopStoriesComponent } from "../components/top-stories/top-stories.component";

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
    ])
  ],
  // providers: [TopStoriesEffects],
  declarations: [HomePage]
})
export class HomePageModule {}
