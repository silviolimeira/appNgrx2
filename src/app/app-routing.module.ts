import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", loadChildren: "./home/home.module#HomePageModule" },
  {
    path: "top-stories",
    loadChildren: "./top-stories/top-stories.module#TopStoriesPageModule"
  }
  // {
  //   path: "top",
  //   loadChildren: "./components/top-stories/top-stories#ComponentsModule"
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
