import { AgencyActions, AgencyActionTypes } from './agency.actions';



export interface AgenciesState {
  agencies: any[];
}

export const initialState: AgenciesState = {
  agencies: []
};

export function reducer(state = initialState, action: AgencyActions): AgenciesState {
  switch (action.type) {
    case AgencyActionTypes.LoadAgencies:
      return state;
    case AgencyActionTypes.AgenciesLoaded:
      return { agencies: action.payload};
    default:
      return state;
  }
}
