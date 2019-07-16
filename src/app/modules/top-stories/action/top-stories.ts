import { Action } from "@ngrx/store";

export enum TopStoriesActionTypes {
  Refresh = "[Top Stories] Refresh",
  LoadMore = "[Top Stories] Load More",
  LoadSuccess = "[Top Stories] Load Success",
  LoadFail = "[Top Stories] Load Fail"
}

export class Refresh implements Action {
  readonly type = TopStoriesActionTypes.Refresh;
}

export class LoadMore implements Action {
  readonly type = TopStoriesActionTypes.LoadSuccess;
}

export class LoadSuccess implements Action {
  readonly type = TopStoriesActionTypes.LoadSuccess;
  constructor(public payload: number[]) {}
}

export class LoadFail implements Action {
  readonly type = TopStoriesActionTypes.LoadFail;
  constructor(public payload: any) {}
}

export type TopStoriesAction = Refresh | LoadMore | LoadSuccess | LoadFail;
