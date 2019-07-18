import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { HomePage } from "./home.page";
import { ItemsEffects } from "../effects/items";
import { ActionsSubject } from "@ngrx/store";
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
    ])
  ],
  declarations: [HomePage],
  providers: [ItemsEffects, ActionsSubject]
})
export class HomePageModule {}
