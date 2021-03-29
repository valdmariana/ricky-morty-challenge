import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../../../shared/global-constants';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(private http: HttpClient) { }

  getCharacters(page: number): Observable<any> {
    const params = new HttpParams().set('page', page.toString())
    return this.http.get(GlobalConstants.apiURL + 'character', { params });
  }

  getCharacter(id: string): Observable<any> {
    return this.http.get(GlobalConstants.apiURL + 'character/' + id);
  }
}
