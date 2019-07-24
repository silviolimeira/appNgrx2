// The action Load means starting the loading of items;
// LoadSuccess means items are loaded successfully;
// LoadFail means items have failed to load.
// Actions must have a property type to specify their types

import { Action } from "@ngrx/store";

export enum ItemActionTypes {
  Load = "[Items] Load",
  LoadSuccess = "[Items] Load Success",
  LoadFail = "[Items] Load Fail"
}

export class Load implements Action {
  readonly type = ItemActionTypes.Load;
  constructor(public payload: any[]) {
    console.log("ItemAction Load wer payloyad**: ", payload);
  }
}

export class LoadSucess implements Action {
  readonly type = ItemActionTypes.LoadSuccess;
  constructor(public payload: any) {
    console.log("LoadSuccess: ", payload);
  }
}

export class LoadFail implements Action {
  readonly type = ItemActionTypes.LoadFail;
  constructor(public payload: any) {}
}

export type ItemActions = Load | LoadSucess | LoadFail;
