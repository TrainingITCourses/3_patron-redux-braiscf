import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromLaunch from './launch/launch.reducer';
import * as fromStatus from './status/status.reducer';
import * as fromAgency from './agency/agency.reducer';
import * as fromType from './type/type.reducer';

export interface State {
  launch: fromLaunch.LaunchesState;
  status: fromStatus.StatusesState;
  agency: fromAgency.AgenciesState;
  type: fromType.TypeState;
}

export const reducers: ActionReducerMap<State> = {

  launch: fromLaunch.reducer,
  status: fromStatus.reducer,
  agency: fromAgency.reducer,
  type: fromType.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
