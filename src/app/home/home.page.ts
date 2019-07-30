import { Component, OnInit, OnDestroy } from "@angular/core";
import { TopStoriesEffects } from "../modules/top-stories/effect/top-stories";
import { Observable, Subscription, from, of } from "rxjs";
import { Items } from "../models/items";

import { LoadingController, ToastController } from "@ionic/angular";
import { select, Store } from "@ngrx/store";
import { filter, concatMap, tap, take } from "rxjs/operators";

import * as fromTopStories from "../modules/top-stories/reducer";
import * as topStoriesActions from "../modules/top-stories/actions/top-stories";
import * as fromItems from "../modules/top-stories/reducer";
import { Item } from "../models/item";
import { getItemsState, getLoading } from "../reducers/items";
import { ItemsEffects } from "../effects/items";
import { ItemActions } from "../actions/items";
import { Actions } from "@ngrx/effects";
import { Action } from "@angular/fire/database";

export interface User {}

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit, OnDestroy {
  items$: Observable<Items>;
  private itemsLoading$: Observable<boolean>;
  private idsLoading$: Observable<boolean>;
  private errors$: Observable<any>;

  loggedIn$: Observable<boolean>;
  // user$: Observable<User>;
  private infiniteScrollComponent: any;
  private refresherComponent: any;
  private loading: HTMLIonLoadingElement;
  private subscriptions: Subscription[];

  constructor(
    // private openPageService: OpenPageService,
    // private socialSharingService: SocialSharingService,
    private store: Store<fromTopStories.State>,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private itemsEffect: ItemsEffects
  ) {
    this.items$ = store.pipe(select(fromTopStories.getDisplayItems));
    this.itemsLoading$ = store.pipe(select(fromItems.isItemsLoading));
    this.idsLoading$ = store.pipe(select(fromTopStories.isTopStoriesLoading));

    this.errors$ = store.pipe(
      select(fromTopStories.getError),
      filter(error => error != null)
    );
    // this.loggedIn$ = store.pipe(select(fromAuth.getLoggedIn));
    // this.user$ = store.pipe(select(fromAuth.getUser));
    this.subscriptions = [];
  }

  showItems() {
    // this.store.dispatch(new topStoriesActions.LoadSuccess());
    // console.log("items$: ", this.items$);
    this.doLoad(true);

    // this.items$ = this.store.pipe(select(fromTopStories.getDisplayItems));
    // return this.store.pipe(select(fromTopStories.getDisplayItems));
  }

  ngOnInit() {
    this.subscriptions.push(
      this.itemsLoading$.subscribe(loading => {
        if (!loading) {
          this.notifyScrollComplete();
        }
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
        .subscribe(res => {
          console.log("isLoading$ 222: ", res);
        })
    );
    this.subscriptions.push(
      this.errors$
        .pipe(concatMap(error => from(this.showError(error))))
        .subscribe(res => console.log("error$: ", res))
    );

    this.subscriptions.push(
      this.items$.subscribe(res => {
        console.log("subs items$ 1133333: ", res);
      })
    );

    this.doLoad(true);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  load(event) {
    this.infiniteScrollComponent = event.target;
    this.doLoad(false);
  }

  refresh(event) {
    this.refresherComponent = event.target;
    this.doLoad(true);
  }

  openUrl(url) {
    // this.openPageService.open(url);
  }

  logout() {
    // this.store.dispatch(new Logout());
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
          message: "Loading..."
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
        message: `An error occurred: ${error}`,
        duration: 3000,
        showCloseButton: true
      })
      .then(toast => toast.present());
  }

  getPhotoURL(user: User) {
    // return user && (user.photoURL || gravatar.url(user.email));
  }

  share(item: Item) {
    // this.socialSharingService.share(item.title, item.url);
  }
}
