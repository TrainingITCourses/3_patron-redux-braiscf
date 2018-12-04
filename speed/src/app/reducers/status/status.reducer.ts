import { StatusActions, StatusActionTypes } from './status.actions';

export interface StatusesState {
  statuses: any[];
}

export const initialState: StatusesState = {
  statuses: []
};

export function reducer(state = initialState, action: StatusActions): StatusesState {
  switch (action.type) {
    case StatusActionTypes.LoadStatuses:
    return { ...state };
  case StatusActionTypes.StatusesLoaded:
    return { statuses: action.payload };
  default:
    return state;
  }
}
