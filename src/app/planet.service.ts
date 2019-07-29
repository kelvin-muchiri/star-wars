import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {
  apiURL: string = 'https://swapi.co/api/planet'

  constructor(private http: HttpClient) {

  }

  public getPlanet(id: string) {
    return this.http.get(`${this.apiURL}/${id}`);
  }

  public getPlanetByUrl(url: string) {
    return this.http.get(url);
  }
}
