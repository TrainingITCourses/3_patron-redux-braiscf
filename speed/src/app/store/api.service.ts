import { Launch } from './models/launch';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Status } from './models/status';
import { Agency } from './models/agency';
import { LoadLaunches, LoadStatuses, LoadTypes, LoadAgencies } from './global-store.actions';
import { GlobalStore } from './global-store.state';
import { Store } from '@ngrx/store';
import { State } from '../reducers';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public launches: Launch[];
  private key = 'launches';
  constructor(private http: HttpClient, private store: Store<State>) {

  }

  /** GET Launch List */
  public getLaunchList = (): Observable<any[]> =>
     this.http.get<any[]>('../assets/data/launches.json')
      .pipe(map((res: any) => res.launches), tap(res => (this.launches = res)))


  /** GET Status List */
  public getStatusList = (): Observable<any[]> =>
      this.http.get<Status[]>('../assets/data/launchstatus.json')
      .pipe(map((res: any) => res.types))


  /** GET Agency List  */
  public getAgencyList = (): Observable<any[]> =>
    this.http.get<Agency[]>('../assets/data/agencies.json')
      .pipe(map((res: any) => res.agencies))


  /** GET Type List  */
  public getTypeList = (): Observable<any[]> =>
    this.http.get<any[]>('../assets/data/missiontypes.json')
      .pipe(map((res: any) => res.types))
}
