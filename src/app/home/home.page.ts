import { Component } from "@angular/core";
import { ItemsEffects } from "../effects/items";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  constructor(itemsEffects: ItemsEffects) {
    console.log(itemsEffects);
  }
}
