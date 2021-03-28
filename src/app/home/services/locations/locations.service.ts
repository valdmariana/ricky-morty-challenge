import { HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../../../shared/global-constants';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  constructor(private http: HttpClient) { }

  getLocations(page: number): Observable<any> {
    const params = new HttpParams().set('page', page.toString())
    return this.http.get(GlobalConstants.apiURL + 'location', { params });
  }

}
