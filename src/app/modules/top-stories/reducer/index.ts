import * as fromRoot from "../../../reducers/items";
import * as fromTopStories from "../reducer/top-stories";
import * as fromPagination from "./pagination";
import * as fromItems from "../../../reducers/items";

import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from "@ngrx/store";

export interface TopStoriesState {
  stories: fromTopStories.State;
  pagination: fromPagination.State;
}

export interface State extends fromRoot.State {
  topStories: TopStoriesState;
}

export const reducers: ActionReducerMap<TopStoriesState> = {
  stories: fromTopStories.reducer,
  pagination: fromPagination.reducer
};

//Selectors for components

