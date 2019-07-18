import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TopStoriesComponent } from "./top-stories/top-stories.component";

@NgModule({
  declarations: [TopStoriesComponent],
  exports: [TopStoriesComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule]
})
export class ComponentsModule {}
