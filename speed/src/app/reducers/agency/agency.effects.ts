import { AgencyActionTypes, LoadAgencies, AgenciesLoaded } from './agency.actions';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { mergeMap, map } from 'rxjs/operators';
import { ApiService } from 'src/app/store/api.service';


@Injectable()
export class AgencyEffects {

  @Effect()
  public load$ = this.actions$
    .ofType(AgencyActionTypes.LoadAgencies)
    .pipe(
      mergeMap((action: LoadAgencies) =>
        this.api
          .getAgencyList()
          .pipe(map(agencies => new AgenciesLoaded(agencies)))
      )
    );

  constructor(private actions$: Actions, private api: ApiService) {}
}
