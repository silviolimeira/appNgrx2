import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Action, Store } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { TopStoriesActionTypes } from "../action/top-stories";
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  take,
  withLatestFrom
} from "rxjs/operators";
import { AngularFireDatabase } from "@angular/fire/database";
import * as fromTopStories from "../reducer/top-stories";
import { pageSize } from "../reducer/pagination";
import * as itemActions from "../../../actions/items";
import * as topStoriesActions from "../action/top-stories";

@Injectable()
export class TopStories {
  constructor(
    private actions$,
    private store: Store<fromTopStories.State>,
    private db: AngularFireDatabase
  ) {}

  @Effect()
  loadTopStories$: Observable<Action> = this.actions$.pipe(
    ofType(TopStoriesActionTypes.Refresh),
    switchMap(() =>
      this.db
        .list("/v0/topstories")
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
