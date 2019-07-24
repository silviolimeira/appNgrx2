import {
  TopStoriesActions,
  TopStoriesActionTypes
} from "../actions/top-stories";

export interface State {
  offset: number;
  limit: number;
  total: number;
  payload: any;
}

export const pageSize = 10;
export const offset = 0;

const initialState: State = {
  offset: 0,
  limit: pageSize,
  total: 0,
  payload: []
};

export function reducer(
  state = initialState,
  action: TopStoriesActions
): State {
  switch (action.type) {
    case TopStoriesActionTypes.Refresh:
      return { ...state, offset: 0, limit: pageSize };
    case TopStoriesActionTypes.LoadMore:
      const offset = state.offset + state.limit;
      return { ...state, offset: offset < state.total ? offset : state.offset };
    case TopStoriesActionTypes.LoadSuccess:
      console.log("TopStoriesActionTypes.LoadSuccess: ", action.payload);
      return {
        ...state,
        payload: action.payload,
        total: action.payload.length
      };
    default:
      return state;
  }
}

export class Pagination {}
