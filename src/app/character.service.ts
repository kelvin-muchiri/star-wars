import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { TouchSequence } from 'selenium-webdriver';
import { Character } from './character'

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  apiURL: string = 'https://swapi.co/api/people'
  favourites = []
  page: number = 1

  constructor(private http: HttpClient) {

  }

  public getCharacters() {
    return this.http.get(`${this.apiURL}/?page=${this.page}`)
    .pipe(map(res => res))
  }

  public getCharacter(id: string) {
    return this.http.get(`${this.apiURL}/${id}`);
  }

  public getFavourites() {
    return this.favourites;
  }

  public addFavorite(character: Character) {
    if (!this.isFavourite(character)) {
        if (this.favourites.length >= 5) {
          alert('You have reached your favourite limit')
        } else {
          this.favourites.push(character.name);
          alert(`${character.name} added to favourites`)
        }
    }
  }

  public isFavourite(character: Character) {
    return this.favourites.includes(character.name)
  }

  public removeFavourite(character: Character) {
    const itemIndex = this.favourites.findIndex(el => el === character);
    this.favourites.splice(itemIndex, 1);
    alert(`${character.name} removed from favourites`)
  }

  public setPage(num: number) {
    this.page = num
  }

  public getPage() {
    return this.page
  }

}
