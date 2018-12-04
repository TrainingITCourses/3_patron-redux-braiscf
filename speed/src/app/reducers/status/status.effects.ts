import { ApiService } from './../../store/api.service';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { StatusActionTypes, StatusesLoaded, LoadStatuses } from './status.actions';
import { mergeMap, map } from 'rxjs/operators';


@Injectable()
export class StatusEffects {

  @Effect()
  public load$ = this.actions$
    .ofType(StatusActionTypes.LoadStatuses)
    .pipe(
      mergeMap((action: LoadStatuses) =>
        this.api
          .getStatusList()
          .pipe(map(statuses => new StatusesLoaded(statuses)))
      )
    );

  constructor(private actions$: Actions, private api: ApiService) {}
}
