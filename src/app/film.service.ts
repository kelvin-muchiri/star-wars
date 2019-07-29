import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  apiURL: string = 'https://swapi.co/api/films'

  constructor(private http: HttpClient) {

  }

  public getFilm(id: string) {
    return this.http.get(`${this.apiURL}/${id}`);
  }

  public getFilmByUrl(url: string) {
    return this.http.get(url);
  }
}
