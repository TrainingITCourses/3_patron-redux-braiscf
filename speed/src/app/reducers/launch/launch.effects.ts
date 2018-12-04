import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { LaunchActionTypes, LaunchesLoaded, LoadLaunches } from './launch.actions';
import { ApiService } from 'src/app/store/api.service';
import { map, mergeMap } from 'rxjs/operators';


@Injectable()
export class LaunchEffects {

  @Effect()
  public load$ = this.actions$
    .ofType(LaunchActionTypes.LoadLaunches)
    .pipe(
      mergeMap((action: LoadLaunches) =>
        this.api
          .getLaunchList()
          .pipe(map(statuses => new LaunchesLoaded(statuses)))
      )
    );

  constructor(private actions$: Actions, private api: ApiService) {}
}
