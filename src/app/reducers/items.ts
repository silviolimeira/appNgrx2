import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { Item } from "../models/item";
import { ItemActions, ItemActionTypes } from "../actions/items";
import { createFeatureSelector } from "@ngrx/store";

export interface State extends EntityState<Item> {
  loading: boolean;
  error: any;
}

export const adapter: EntityAdapter<Item> = createEntityAdapter<Item>({
  selectId: (item: Item) => item.id,
  sortComparer: false
});

export const inititalState: State = adapter.getInitialState({
  loading: false,
  error: null
});

export function reducer(state = inititalState, action: ItemActions): State {
  switch (action.type) {
    case ItemActionTypes.Load: {
      console.log("ItemActionTypes.Load: ", action.payload);
      return { ...state, loading: true };
    }
    case ItemActionTypes.LoadSuccess: {
      console.log("ItemActionTypes.LoadSuccess: ", action.payload);
      return adapter.upsertMany(action.payload, {
        ...state,
        loading: false,
        error: null
      });
    }
    case ItemActionTypes.LoadFail: {
      return { ...state, loading: false, error: action.payload };
    }
    default: {
      console.log("default: ", state);
      return state;
    }
  }
}
// Selectors of the feature items
export const getItemsState = createFeatureSelector<State>("infos");

export const { selectEntities: getItemEntities } = adapter.getSelectors(
  getItemsState
);

export const getLoading = (state: State) => state.loading;

export const getError = (state: State) => state.error;
