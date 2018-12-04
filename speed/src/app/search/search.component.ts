
import { LoadAgencies } from './../reducers/agency/agency.actions';
import { Criterio } from './../store/models/criterio';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../store/api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GlobalSlideTypes, GlobalStore } from '../store/global-store.state';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { LoadStatuses } from '../reducers/status/status.actions';
import { LoadTypes } from '../reducers/type/type.actions';
import { LoadLaunches } from '../reducers/launch/launch.actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public filteredLaunches$: Observable<any>;
  constructor(private api: ApiService, private store: Store<State>) {}

  ngOnInit() {

    this.loadData();

  }

  private loadData() {
    this.store.dispatch(new LoadTypes());
    this.store.dispatch(new LoadAgencies());
    this.store.dispatch(new LoadStatuses());
    this.store.dispatch(new LoadLaunches());
  }

  onSearch = (searchCiteria: Criterio) => {
    console.log('onSearch con criterio', searchCiteria.criterioName, ': ', searchCiteria.criterioValue );
    const searchName = searchCiteria.criterioName.toLowerCase();
    const searchValue = searchCiteria.criterioValue;
    this.filteredLaunches$ = this.store.select('launch')
    .pipe(
      map(
        launchesState =>
        launchesState.launches
            .filter(
              l =>
                (((searchName === 'estado') && (l.status == searchValue) ||
                ((searchName === 'agencia') && (l.lsp != null) && (l.lsp.id == searchValue)) ||
                ((searchName === 'tipo') && (l.missions != null) && (l.missions.filter(m => m.type == searchValue)).length > 0)
                )))
      ));
  }
}

