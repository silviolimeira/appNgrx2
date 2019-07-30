import { Injectable, Inject } from "@angular/core";
import { Observable, of } from "rxjs";
import { Action, Store } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { TopStoriesActionTypes } from "../actions/top-stories";
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  take,
  withLatestFrom,
  tap
} from "rxjs/operators";
import { AngularFireDatabase } from "@angular/fire/database";
import * as fromTopStories from "../reducer";
import { pageSize, offset } from "../reducer/pagination";
import * as itemActions from "../../../actions/items";
import * as topStoriesActions from "../actions/top-stories";

import { HACKER_NEWS_DB } from "../../../hackernews-db";

@Injectable()
export class TopStoriesEffects {
  // constructor(
  //   private actions$: Actions,
  //   private store: Store<fromTopStories.State>,
  //   @Inject(HACKER_NEWS_DB) private db: AngularFireDatabase
  // ) {
  //   var data = this.db.list("/item").snapshotChanges();
  //   data.subscribe(data => {
  //     var returnArr = [];
  //     data.forEach(data => {
  //       var item = data.payload.toJSON();
  //       returnArr.push(item);
  //     });
  //     console.log("returnArr: ", returnArr);
  //   });

  //   this.db
  //     .object("/item/-LhAkCZR7_6XwHGQSVmZ")
  //     .snapshotChanges()
  //     .subscribe(data => {
  //       console.log("data1: ", data);
  //     });
  // }

  // @Effect()
  // loadTopStories$: Observable<Action> = this.actions$.pipe(
  //   ofType(TopStoriesActionTypes.Refresh),
  //   switchMap(() =>
  //     this.db
  //       .list("/tops")
  //       .valueChanges()
  //       .pipe(
  //         take(1),
  //         mergeMap((ids: number[]) =>
  //           of<Action>(
  //             new topStoriesActions.LoadSuccess(ids),
  //             new itemActions.Load(ids.slice(0, pageSize))
  //           )
  //         ),
  //         catchError(error => of(new topStoriesActions.LoadFail(error)))
  //       )
  //   )
  // );

  // @Effect()
  // loadMore$: Observable<Action> = this.actions$.pipe(
  //   ofType(TopStoriesActionTypes.LoadMore),
  //   withLatestFrom(this.store),
  //   map(([action, state]) => {
  //     const {
  //       pagination: { offset, limit },
  //       stories: { ids }
  //     } = state.topStories;
  //     return new itemActions.Load(ids.slice(offset, offset + limit));
  //   })
  // );

  constructor(
    private actions$: Actions,
    private store: Store<fromTopStories.State>,
    @Inject(HACKER_NEWS_DB) private db: AngularFireDatabase
  ) {}

  @Effect()
  loadTopStories$: Observable<Action> = this.actions$.pipe(
    ofType(TopStoriesActionTypes.Refresh),
    switchMap(() =>
      this.db
        .list("/tops")
        .valueChanges()
        .pipe(
          take(1),
          mergeMap((ids: number[]) =>
            of<Action>(
              new topStoriesActions.LoadSuccess(ids),
              new itemActions.Load(ids.slice(0, pageSize))
            )
          ),
          catchError(error => of(new topStoriesActions.LoadFail(error)))
        )
    )
  );

  @Effect()
  loadMore$: Observable<Action> = this.actions$.pipe(
    ofType(TopStoriesActionTypes.LoadMore),
    withLatestFrom(this.store),
    map(([action, state]) => {
      const {
        pagination: { offset, limit },
        stories: { ids }
      } = state.topStories;
      return new itemActions.Load(ids.slice(offset, offset + limit));
    })
  );
}
