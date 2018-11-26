import { Launch } from './models/launch';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Status } from './models/status';
import { Agency } from './models/agency';
import { LoadLaunches, LoadStatuses, LoadTypes, LoadAgencies } from './global-store.actions';
import { GlobalStore } from './global-store.state';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public launches: Launch[];
  private key = 'launches';
  constructor(private http: HttpClient, private global: GlobalStore) {

  }

  /** GET Launch List */
  public getLaunchList = () => {
     this.http.get<any[]>('../assets/data/launches.json')
      .pipe(map((res: any) => res.launches), tap(res => (this.launches = res)))
      .subscribe(launches => this.global.dispatch(new LoadLaunches(launches)));
  }


  /** GET Status List */
  public getStatusList = () => {
      this.http.get<Status[]>('../assets/data/launchstatus.json')
      .pipe(map((res: any) => res.types))
      .subscribe(statuses => this.global.dispatch(new LoadStatuses(statuses)));
  }

  /** GET Agency List  */
  public getAgencyList = () => {
    this.http.get<Agency[]>('../assets/data/agencies.json')
      .pipe(map((res: any) => res.agencies))
      .subscribe(agencies => this.global.dispatch(new LoadAgencies(agencies)));
  }

  /** GET Type List  */
  public getTypeList = () => {
    this.http.get<any[]>('../assets/data/missiontypes.json')
      .pipe(map((res: any) => res.types))
      .subscribe(types => this.global.dispatch(new LoadTypes(types)));
  }

}
