import { Injectable } from "@angular/core";
import { ActionsSubject, Action } from "@ngrx/store";
import { AngularFireDatabase } from "angularfire2/database";

import { Effect, ofType } from "@ngrx/effects";
import { Observable, combineLatest, of } from "rxjs";
import { map, mergeMap, take, catchError, tap } from "rxjs/operators";
import { ItemActionTypes, LoadSucess, LoadFail, Load } from "../actions/items";
import { Item } from "../models/item";

@Injectable()
export class ItemsEffects {
  constructor(
    private actions$: ActionsSubject,
    private db: AngularFireDatabase
  ) {}

  @Effect() loadItems$: Observable<Action> = this.actions$.pipe(
    ofType(ItemActionTypes.Load),
    map((action: Load) => action.payload),
    tap(res => {
      console.log("res: ", res);
    }),
    tap(res => {
      console.log("effect-res: ", res);
    }),
    mergeMap((ids: any[]) =>
      combineLatest(
        ids.map(id =>
          this.db
            // .object("/v0/item" + id)
            .object("/infos/" + id)
            .valueChanges()
            .pipe(take(1))
        )
      ).pipe(
        map((items: Item[]) => new LoadSucess(items)),
        catchError(error => of(new LoadFail(error)))
      )
    )
  );
}
