import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Items } from "src/app/models/items";
import { Item } from "src/app/models/item";

@Component({
  selector: "app-items",
  templateUrl: "./items.component.html",
  styleUrls: ["./items.component.scss"]
})
export class ItemsComponent {
  @Input() items: Items;
  @Output() toOpen = new EventEmitter<string>();
  @Output() toShare = new EventEmitter<Item>();

  openPage(url) {
    this.toOpen.emit(url);
  }

  share(item) {
    this.toShare.emit(item);
  }
}
