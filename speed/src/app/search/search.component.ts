import { Criterio } from './../store/models/criterio';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../store/api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GlobalSlideTypes, GlobalStore } from '../store/global-store.state';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public filteredLaunches$: Observable<any>;
  constructor(private api: ApiService, private global: GlobalStore) {}

  ngOnInit() {

    this.loadData();

  }

  private loadData() {
    this.api.getTypeList();
    this.api.getAgencyList();
    this.api.getStatusList();
    this.api.getLaunchList();
  }

  onSearch = (searchCiteria: Criterio) => {
    console.log('onSearch con criterio', searchCiteria.criterioName, ': ', searchCiteria.criterioValue );
    const searchName = searchCiteria.criterioName.toLowerCase();
    const searchValue = searchCiteria.criterioValue;
    this.filteredLaunches$ = this.global.select$(GlobalSlideTypes.launches).pipe(
      map(
        launches =>
          launches
            .filter(
              l =>
                (((searchName === 'estado') && (l.status == searchValue) ||
                ((searchName === 'agencia') && (l.lsp != null) && (l.lsp.id == searchValue)) ||
                ((searchName === 'tipo') && (l.missions != null) && (l.missions.filter(m => m.type == searchValue)).length > 0)
                )))
      ));
  }
}

