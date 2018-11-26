import { Criterio } from './../store/models/criterio';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../store/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public launches: any[];
  public filteredLaunches: any[] = [];
  constructor(private api: ApiService) {}

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
    const filteredLaunches = this.api.launches.filter(
      l =>
        (((searchName === 'estado') && (l.status == searchValue) ||
        ((searchName === 'agencia') && (l.lsp != null) && (l.lsp.id == searchValue)) ||
        ((searchName === 'tipo') && (l.missions != null) && (l.missions.filter(m => m.type == searchValue)).length > 0)
        )));
     this.filteredLaunches = filteredLaunches;
  }
}

