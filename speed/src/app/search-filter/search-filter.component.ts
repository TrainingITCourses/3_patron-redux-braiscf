import { Launch } from './../store/models/launch';
import { Agency } from './../store/models/agency';
import { Status } from './../store/models/status';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../store/api.service';
import { GlobalSlideTypes, GlobalStore } from '../store/global-store.state';


@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css']
})
export class SearchFilterComponent implements OnInit {
  @Output() public search = new EventEmitter<string>();
  public statuses: Status[];
  public agencies: Agency[];
  public types: any[];
  public launches: Launch[];
  public arrCriterioBusqueda: any[];
  public elementosCombo: any[];
  public criterioName: string;


  constructor(private global: GlobalStore) {}

  ngOnInit() {
    this.arrCriterioBusqueda = [
      {key: 1, text: 'Estado'},
      {key: 2, text: 'Agencia'},
      {key: 3, text: 'Tipo'}
  ];

   this.global
    .select$(GlobalSlideTypes.statuses)
    .subscribe(statuses => (this.statuses = statuses));

   this.global
      .select$(GlobalSlideTypes.agencies)
      .subscribe(agencies => (this.agencies = agencies));

   this.global
      .select$(GlobalSlideTypes.types)
      .subscribe(types => (this.types = types));

   this.global
      .select$(GlobalSlideTypes.launches)
      .subscribe(launches => (this.launches = launches));
  }


  onRadioButtonChange(entry) {

    const that = this;
    switch (entry.key) {
      case 1:
        this.elementosCombo = this.statuses;
        this.criterioName = this.arrCriterioBusqueda[0].text;
        break;
      case 2:
        this.elementosCombo = this.agencies;
        this.criterioName = this.arrCriterioBusqueda[1].text;
        break;
      case 3:
        this.elementosCombo = this.types;
        this.criterioName = this.arrCriterioBusqueda[2].text;
        break;
      default:

    }
  }



}
