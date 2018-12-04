import { LoadTypes } from './../../store/global-store.actions';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { TypeActionTypes, TypesLoaded } from './type.actions';
import { mergeMap, map } from 'rxjs/operators';
import { ApiService } from 'src/app/store/api.service';


@Injectable()
export class TypeEffects {

  @Effect()
  public load$ = this.actions$
    .ofType(TypeActionTypes.LoadTypes)
    .pipe(
      mergeMap((action: LoadTypes) =>
        this.api
          .getTypeList()
          .pipe(map(types => new TypesLoaded(types)))
      )
    );

  constructor(private actions$: Actions, private api: ApiService) {}
}
