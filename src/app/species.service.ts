import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {
  apiURL: string = 'https://swapi.co/api/species/'

  constructor(private http: HttpClient) {

  }

  public getSingleSpecies(id: string) {
    return this.http.get(`${this.apiURL}/${id}`);
  }

  public getSingleSpeciesByUrl(url: string) {
    return this.http.get(url);
  }
}
