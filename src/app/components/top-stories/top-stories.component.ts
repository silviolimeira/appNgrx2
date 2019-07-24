import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from "@angular/core";
import { from, Observable, Subscription } from "rxjs";
import { select, Store } from "@ngrx/store";
import { Items } from "../../models/items";
import { LoadingController, ToastController } from "@ionic/angular";

import * as fromTopStories from "../../modules/top-stories/reducer";
import * as topStoriesActions from "../../modules/top-stories/actions/top-stories";
import * as fromItems from "../../modules/top-stories/reducer";

import { filter, concatMap } from "rxjs/operators";
import { TopStoriesEffects } from "src/app/modules/top-stories/effect/top-stories";

@Component({
  selector: "app-top-stories",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./top-stories.component.html",
  styleUrls: ["./top-stories.component.scss"]
})
export class TopStoriesComponent implements OnInit, OnDestroy {
  items$: Observable<any>;

  private itemsLoading$: Observable<boolean>;
  private idsLoading$: Observable<boolean>;
  private errors$: Observable<any>;
  private infiniteScrollComponent: any;
  private refresherComponent: any;
  private loading: HTMLIonLoadingElement;
  private subscriptions: Subscription[];

  constructor(
    private store: Store<fromTopStories.State>,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    this.items$ = store.pipe(select(fromTopStories.getDisplayItems));
    this.itemsLoading$ = store.pipe(select(fromItems.isItemsLoading));
    this.idsLoading$ = store.pipe(select(fromTopStories.isTopStoriesLoading));
    this.errors$ = store.pipe(
      select(fromTopStories.getError),
      filter(error => error != null)
    );

    this.subscriptions = [];
  }

  ngOnInit() {
    this.subscriptions.push(
      this.itemsLoading$.subscribe(loding => {
        if (!this.loading) {
          this.notifyScrollComplete();
        }
        console.log("this.notifyScrollComplete():", this.items$);
      })
    );

    this.subscriptions.push(
      this.idsLoading$
        .pipe(
          concatMap(loading => {
            return loading
              ? from(this.showLoading())
              : from(this.hideLoading());
          })
        )
        .subscribe()
    );
    this.doLoad(true);
    this.items$ = this.store.pipe(select(fromTopStories.getDisplayItems));
    console.log("items$ as: ", this.items$);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  load(event) {
    console.log("load");
    this.infiniteScrollComponent = event.target;
    this.doLoad(false);
  }

  refresh(event) {
    console.log("refresh");
    this.refresherComponent = event.target;
    this.doLoad(true);
  }

  doLoad(refresh: boolean) {
    console.log("doLoad, refresh: ", refresh);
    if (refresh) {
      this.store.dispatch(new topStoriesActions.Refresh());
    } else {
      this.store.dispatch(new topStoriesActions.LoadMore());
    }
  }

  private notifyScrollComplete(): void {
    if (this.infiniteScrollComponent) {
      this.infiniteScrollComponent.complete();
    }
  }

  private notifyRefreshComplete(): void {
    if (this.refresherComponent) {
      this.refresherComponent.complete();
    }
  }

  private showLoading(): Promise<void> {
    return this.hideLoading().then(() => {
      return this.loadingCtrl
        .create({
          message: "Loading",
          spinner: "crescent",
          duration: 2000
        })
        .then(loading => {
          this.loading = loading;
          return this.loading.present();
        });
    });
  }

  private hideLoading(): Promise<void> {
    if (this.loading) {
      this.notifyRefreshComplete();
      return this.loading.dismiss().then(() => null);
    }
    return Promise.resolve();
  }

  private showError(error: any): Promise<void> {
    return this.toastCtrl
      .create({
        message: `An error ocurred: ${error}`,
        duration: 3000,
        showCloseButton: true
      })
      .then(toast => toast.present());
  }
}
