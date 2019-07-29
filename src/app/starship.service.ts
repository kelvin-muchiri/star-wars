import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StarshipService {
  apiURL: string = 'https://swapi.co/api/startships';

  constructor(private http: HttpClient) {

  }

  public getStartShip(id: string) {
    return this.http.get(`${this.apiURL}/${id}`);
  }

  public getStarShipByUrl(url: string) {
    return this.http.get(url);
  }
}
